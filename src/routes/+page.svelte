<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fetchProducts, fetchCategories, fetchProductsByCategory } from '$lib/api';
	import { cart } from '$lib/store';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { toast } from 'svelte-sonner';
	import { Grid, List } from 'lucide-svelte';

	const isBrowser = typeof window !== 'undefined';
	let products: any[] = [];
	let displayedProducts: any[] = [];
	let categories: string[] = [];
	let selectedCategory = 'all';
	let displayMode: 'grid' | 'list' = 'grid';
	let loading = true;
	let error: string | null = null;
	let minPrice = 0;
	let maxPrice = 1000;
	let currentMinPrice = 0;
	let currentMaxPrice = 1000;
	let itemsPerLoad = 6;
	let loadedItemsCount = 0;
	let searchQuery = '';

	onMount(async () => {
		try {
			categories = await fetchCategories();
			products = await fetchProducts();
			const prices = products.map((product) => product.price);
			minPrice = Math.min(...prices);
			maxPrice = Math.max(...prices);
			currentMinPrice = minPrice;
			currentMaxPrice = maxPrice;
			loadMoreItems();
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	});

	async function filterByCategory(category: string) {
		selectedCategory = category;
		loading = true;
		try {
			products =
				category === 'all' ? await fetchProducts() : await fetchProductsByCategory(category);
			const prices = products.map((product) => product.price);
			minPrice = Math.min(...prices);
			maxPrice = Math.max(...prices);
			currentMinPrice = minPrice;
			currentMaxPrice = maxPrice;
			displayedProducts = [];
			loadedItemsCount = 0;
			loadMoreItems();
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	}

	function addToCart(product: any) {
		cart.update((items) => [...items, product]);
		toast.success('Product added to cart');
	}

	function handleCategoryChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		filterByCategory(target.value);
	}

	function loadMoreItems() {
		const start = loadedItemsCount;
		const end = loadedItemsCount + itemsPerLoad;
		const newItems = products
			.slice(start, end)
			.filter((product) => product.price >= currentMinPrice && product.price <= currentMaxPrice)
			.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
		displayedProducts = [...displayedProducts, ...newItems];
		loadedItemsCount += itemsPerLoad;
	}

	function onScroll() {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			loadMoreItems();
		}
	}

	function onMinPriceChange(event: Event) {
		currentMinPrice = +(event.target as HTMLInputElement).value;
		filterProductsByPrice();
	}

	function onMaxPriceChange(event: Event) {
		currentMaxPrice = +(event.target as HTMLInputElement).value;
		filterProductsByPrice();
	}

	function filterProductsByPrice() {
		displayedProducts = [];
		loadedItemsCount = 0;
		loadMoreItems();
	}

	if (isBrowser) {
		window.addEventListener('scroll', onScroll);

		onDestroy(() => {
			window.removeEventListener('scroll', onScroll);
		});
	}

	function toSentenceCase(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}

	function handleSearch(event: Event) {
		searchQuery = (event.target as HTMLInputElement).value;
		displayedProducts = [];
		loadedItemsCount = 0;
		loadMoreItems();
	}
</script>

<svelte:head>
	<title>My Store</title>
</svelte:head>

{#if error}
	<p class="text-red-500">{error}</p>
{:else if loading}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
		<SkeletonLoader count={8} />
	</div>
{:else}
	<div class="p-4">
		<div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
			<input
				type="text"
				placeholder="Search products..."
				class="mb-4 w-full rounded border p-2 md:mb-0 md:mr-4 md:w-1/3"
				on:input={handleSearch}
			/>
			<select
				bind:value={selectedCategory}
				on:change={handleCategoryChange}
				class="mb-4 w-full rounded border p-2 md:mb-0 md:w-1/4"
			>
				<option value="all">All Categories</option>
				{#each categories as category}
					<option value={category}>{toSentenceCase(category)}</option>
				{/each}
			</select>
			<div class="flex items-center space-x-2">
				<button class="rounded border p-2" on:click={() => (displayMode = 'grid')}>
					<Grid class="h-6 w-6" />
				</button>
				<button class="rounded border p-2" on:click={() => (displayMode = 'list')}>
					<List class="h-6 w-6" />
				</button>
			</div>
		</div>
		<div class="mb-4 flex flex-col md:flex-row md:justify-between">
			<div class="mr-2 flex-1">
				<label for="minPrice" class="block">Min Price: ${currentMinPrice}</label>
				<input
					type="range"
					id="minPrice"
					min={minPrice}
					max={maxPrice}
					value={currentMinPrice}
					on:input={onMinPriceChange}
					class="w-full"
				/>
			</div>
			<div class="ml-2 flex-1">
				<label for="maxPrice" class="block">Max Price: ${currentMaxPrice}</label>
				<input
					type="range"
					id="maxPrice"
					min={minPrice}
					max={maxPrice}
					value={currentMaxPrice}
					on:input={onMaxPriceChange}
					class="w-full"
				/>
			</div>
		</div>
		<div
			class={displayMode === 'grid'
				? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
				: 'list'}
		>
			{#each displayedProducts as product}
				<div class="rounded border bg-white p-4 shadow">
					<img
						src={product.image}
						alt={product.title}
						class="mb-4 h-48 w-full rounded object-cover"
					/>
					<a class="mb-2 block text-lg font-bold" href={`/product/${product.id}`}>{product.title}</a
					>
					<p class="mb-4 text-gray-700">${product.price}</p>
					<button
						class="mt-2 rounded bg-blue-500 p-2 text-white"
						on:click={() => addToCart(product)}>Add to Cart</button
					>
				</div>
			{/each}
		</div>
		{#if loading}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				<SkeletonLoader count={6} />
			</div>
		{/if}
	</div>
{/if}

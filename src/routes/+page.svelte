<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fetchProducts, fetchCategories, fetchProductsByCategory } from '$lib/api';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { Grid, List } from 'lucide-svelte';
	import { AllProducts } from '$lib/components/AllProducts';

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
	<div class="loadingElem grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
		<SkeletonLoader count={3} />
	</div>
{:else}
	<div class="p-4">
		<div class="filtersWrapper rounded-md bg-white dark:bg-gray-800 p-4 shadow-md mb-8">
			<div
				class="mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
			>
				<input
					type="text"
					placeholder="Search products..."
					class="searchInput w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-1/3"
					on:input={handleSearch}
				/>
				<select
					bind:value={selectedCategory}
					on:change={handleCategoryChange}
					class="filterCategories w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-1/4"
				>
					<option value="all">All Categories</option>
					{#each categories as category}
						<option value={category}>{toSentenceCase(category)}</option>
					{/each}
				</select>
				<div class="viewWrapper flex items-center space-x-2">
					<button
						class={`gridView rounded p-2 ${displayMode === 'grid' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'}`}
						on:click={() => (displayMode = 'grid')}
					>
						<Grid class="h-6 w-6" />
					</button>
					<button
						class={`listView rounded p-2 ${displayMode === 'list' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'}`}
						on:click={() => (displayMode = 'list')}
					>
						<List class="h-6 w-6" />
					</button>
				</div>
			</div>
			<div class="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
				<div class="flex-1 md:mr-4">
					<label for="minPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Min Price: ${currentMinPrice}</label
					>
					<input
						type="range"
						id="minPrice"
						min={minPrice}
						max={maxPrice}
						value={currentMinPrice}
						on:input={onMinPriceChange}
						class="minPriceRange mx-auto mt-1 block w-3/4"
					/>
				</div>
				<div class="flex-1 md:ml-4">
					<label for="maxPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Max Price: ${currentMaxPrice}</label
					>
					<input
						type="range"
						id="maxPrice"
						min={minPrice}
						max={maxPrice}
						value={currentMaxPrice}
						on:input={onMaxPriceChange}
						class="maxPriceRange mx-auto mt-1 block w-3/4"
					/>
				</div>
			</div>
		</div>

		<AllProducts {displayMode} {displayedProducts} />
	</div>
{/if}

<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchProducts, fetchCategories, fetchProductsByCategory } from '$lib/api';
	import { cart } from '$lib/store';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { toast } from 'svelte-sonner';

	let products: any = [];
	let categories: any = [];
	let selectedCategory = 'all';
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			categories = await fetchCategories();
			products = await fetchProducts();
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
</script>

<Navbar />

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
	<div>
		<div class="mb-4">
			<select on:change={handleCategoryChange} class="border p-2">
				<option value="all">All Categories</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each products as product}
				<div class="border p-4">
					<img src={product.image} alt={product.title} class="h-48 w-full object-cover" />
					<h2 class="text-lg font-bold">{product.title}</h2>
					<p class="text-gray-700">${product.price}</p>
					<button class="mt-2 bg-blue-500 p-2 text-white" on:click={() => addToCart(product)}
						>Add to Cart</button
					>
				</div>
			{/each}
		</div>
	</div>
{/if}

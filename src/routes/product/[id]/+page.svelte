<!-- src/routes/product/[id]/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchProductById } from '$lib/api';
	import { page } from '$app/stores';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';

	let product: any = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		const { id } = $page.params;
		try {
			product = await fetchProductById(parseInt(id));
			console.log('product : ', product);
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Product Info</title>
</svelte:head>

{#if error}
	<p class="text-red-500">{error}</p>
{:else if loading}
	<SkeletonLoader count={1} />
{:else if product}
	<main class="flex flex-col p-8 md:flex-row">
		<div class="product-image p-4 md:w-1/3">
			<img src={product.image} alt={product.title} class="w-full" />
		</div>
		<div class="product-details p-4 md:w-2/3">
			<h1 class="mb-2 text-2xl font-bold">
				{product.title}
			</h1>
			<div class="rating mb-4 flex items-center">
				<span class="stars mr-2 text-yellow-400">
					{'⭐'.repeat(Math.floor(product.rating.rate))}{product.rating.rate % 1 ? '⭐' : ''}
				</span>
				<span class="rating-score mr-2 text-gray-700">{product.rating.rate.toFixed(1)}</span>
				<span class="reviews mr-2 text-gray-500">({product.rating.count} reviews)</span>
			</div>

			<p class="mb-4 text-green-600">In stock</p>
			<h3>{product.description}</h3>
			<ul class="mb-4 text-gray-600">
				<li>Material: Leather</li>
				<li>Color: Brown</li>
				<li>Size: 23 inch x 31 inch</li>
				<li>Weight: 1200 grams</li>
			</ul>
			<div class="price mb-4">
				<span class="text-2xl font-bold">${product.price}</span>
				<span class="ml-2 text-gray-500 line-through">${(1.3 * product.price).toFixed(2)}</span>
				<span class="ml-2 text-sm text-gray-500">Price per kg, Includes VAT</span>
			</div>
			<div class="flex space-x-2">
				<button class="rounded bg-blue-600 px-4 py-2 text-white">Add to cart</button>
				<button class="rounded bg-blue-500 px-4 py-2 text-white">Buy now</button>
				<button class="rounded bg-gray-200 px-4 py-2 text-gray-700">Add to wishlist</button>
			</div>
			<div class="mt-4">
				<p class="text-gray-500"><i class="fas fa-truck"></i> Worldwide shipping</p>
				<p class="text-gray-500"><i class="fas fa-lock"></i> Secure payment</p>
				<p class="text-gray-500"><i class="fas fa-shield-alt"></i> 2 years full warranty</p>
			</div>
		</div>
	</main>
{/if}

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>

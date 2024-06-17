<!-- src/routes/product/[id]/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchProducts } from '$lib/api';
	import { page } from '$app/stores';

	let product: any = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		const { id } = $page.params;
		try {
			const products = await fetchProducts();
			product = products.find((p: any) => p.id === +id);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

{#if error}
	<p class="text-red-500">{error}</p>
{:else if loading}
	<SkeletonLoader count={1} />
{:else if product}
	<div class="mx-auto max-w-lg p-4">
		<img src={product.image} alt={product.title} class="h-96 w-full object-cover" />
		<h1 class="text-2xl font-bold">{product.title}</h1>
		<p class="text-gray-700">${product.price}</p>
		<p>{product.description}</p>
	</div>
{/if}

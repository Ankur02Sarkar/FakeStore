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
		} catch (err) {
			error = (err as Error).message;
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
	<div class="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
		<img src={product.image} alt={product.title} class="h-96 w-full rounded-t-lg object-cover" />
		<h1 class="mt-4 text-2xl font-bold text-gray-900">{product.title}</h1>
		<p class="mt-2 text-xl text-green-600">${product.price}</p>
		<p class="text-md mt-4 text-gray-700">{product.description}</p>
		<a href="/" class="text-blue-500 transition duration-200 hover:text-blue-700">Back to home</a>
	</div>
{/if}

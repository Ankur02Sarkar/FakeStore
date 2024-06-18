<script lang="ts">
	import { cart } from '$lib/store';
	import type { DisplayedProducts } from '$lib/types';
	import { toast } from 'svelte-sonner';

	export let displayMode: string = 'grid';
	export let displayedProducts: DisplayedProducts;

	function addToCart(product: any) {
		cart.update((items) => [...items, product]);
		toast.success('Product added to cart');
	}
</script>

<div
	class={displayMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4' : 'list'}
>
	{#each displayedProducts as product}
		<div class="flex flex-col rounded border bg-white p-4 shadow">
			<img src={product.image} alt={product.title} class="mb-4 h-48 w-full rounded object-cover" />
			<a class="mb-2 block text-lg font-bold" href={`/product/${product.id}`}>{product.title}</a>
			<p class="mb-4 text-gray-700">${product.price}</p>
			<button class="mt-2 rounded bg-blue-500 p-2 text-white" on:click={() => addToCart(product)}
				>Add to Cart</button
			>
		</div>
	{/each}
</div>

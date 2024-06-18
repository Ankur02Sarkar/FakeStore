<script lang="ts">
	import { cart } from '$lib/store';
	import type { DisplayedProducts } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
	import { DirectionAwareHover } from './ui/DirectionAwareHover';
	import { CirclePlus } from 'lucide-svelte';

	export let displayMode: string = 'list';
	export let displayedProducts: DisplayedProducts;

	function addToCart(product: any) {
		cart.update((items) => [...items, product]);
		toast.success('Product added to cart');
	}
</script>

{#if displayMode === 'grid'}
	<BentoGrid className="max-w-4xl mx-auto">
		{#each displayedProducts as item, i (i)}
			<BentoGridItem title={item.title} description={item.description} itemId={item.id}>
				<div slot="header" class="flex h-full min-h-[6rem] w-full flex-1 justify-center rounded-xl">
					<img src={item.image} alt={item.title} class="" />
				</div>
				<button slot="cart" class="relative left-full m-0 w-fit" on:click={() => addToCart(item)}>
					<CirclePlus />
				</button>
			</BentoGridItem>
		{/each}
	</BentoGrid>
{:else}
	<div class="list">
		{#each displayedProducts as product}
			<div class="relative flex items-center justify-center">
				<DirectionAwareHover imageUrl={product.image} altText={product.title}>
					<p class="text-xl font-bold">{product.title}</p>
					<p class="text-sm font-normal">${product.price}</p>
				</DirectionAwareHover>
			</div>
			<!-- <div class="flex flex-col rounded border bg-white p-4 shadow">
				<img
					src={product.image}
					alt={product.title}
					class="mb-4 h-48 w-full rounded object-cover"
				/>
				<a class="mb-2 block text-lg font-bold" href={`/product/${product.id}`}>{product.title}</a>
				<p class="mb-4 text-gray-700">${product.price}</p>
				<button class="mt-2 rounded bg-blue-500 p-2 text-white" on:click={() => addToCart(product)}
					>Add to Cart</button
				>
			</div> -->
		{/each}
	</div>
{/if}

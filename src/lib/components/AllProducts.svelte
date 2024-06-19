<script lang="ts">
	import { cart } from '$lib/store';
	import type { DisplayedProducts } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
	import { DirectionAwareHover } from './ui/DirectionAwareHover';
	import { CirclePlus } from 'lucide-svelte';

	export let displayMode: string = 'grid';
	export let displayedProducts: DisplayedProducts;

	function addToCart(product: any) {
		cart.update((items) => [...items, product]);
		toast.success('Product added to cart');
	}
</script>

{#if displayMode === 'grid'}
	<BentoGrid className="max-w-4xl mx-auto">
		{#each displayedProducts as item, i (i)}
			<BentoGridItem
				title={item.title}
				description={item.description}
				itemId={item.id}
				className="bg-gray-100"
			>
				<div slot="header" class="flex h-full min-h-[6rem] w-full flex-1 justify-center rounded-xl" style="margin-top: 0;">
					<img src={item.image} alt={item.title} class="mix-blend-darken dark:mix-blend-lighten" />
				</div>
				<button slot="cart" class="relative left-[90%] m-0 w-fit" on:click={() => addToCart(item)}>
					<CirclePlus />
				</button>
			</BentoGridItem>
		{/each}
	</BentoGrid>
{:else}
	<div class="list">
		{#each displayedProducts as product}
			<div class="relative flex items-center justify-center">
				<DirectionAwareHover imageUrl={product.image} altText={product.title} className="border-[1px] border-gray-200 mb-4 dark:border-gray-400">
					<p class="text-xl font-bold">{product.title}</p>
					<p class="text-sm font-normal">${product.price}</p>
					<button slot="cart" class="relative left-[90%] m-0 w-fit z-[99]" on:click={() => addToCart(product)}>
						<CirclePlus />
					</button>
				</DirectionAwareHover>
			</div>
		{/each}
	</div>
{/if}

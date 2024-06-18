<script lang="ts">
	import { cart } from '$lib/store';
	import { get, writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let cartItems = writable(get(cart));

	function removeItem(index: number) {
		cart.update((items) => {
			const newItems = [...items];
			newItems.splice(index, 1);
			return newItems;
		});
		toast.success('Product removed from cart');
	}

	function increaseQuantity(index: number) {
		cart.update((items) => {
			const newItems = [...items];
			newItems[index].quantity = (newItems[index].quantity || 1) + 1;
			return newItems;
		});
	}

	function decreaseQuantity(index: number) {
		cart.update((items) => {
			const newItems = [...items];
			if (newItems[index].quantity > 1) {
				newItems[index].quantity -= 1;
			}
			return newItems;
		});
	}
</script>

<div class="p-4">
	{#if $cart.length === 0}
		<p>Your cart is empty.</p>
	{:else}
		<ul>
			{#each $cart as item, index}
				<li class="flex items-center justify-between border-b p-2">
					<div>
						<p>{item.title}</p>
						<p>${item.price}</p>
					</div>
					<div class="flex items-center">
						<button on:click={() => decreaseQuantity(index)} class="bg-gray-300 px-2">-</button>
						<span class="px-2">{item.quantity || 1}</span>
						<button on:click={() => increaseQuantity(index)} class="bg-gray-300 px-2">+</button>
						<button on:click={() => removeItem(index)} class="ml-2 bg-red-500 px-2 text-white"
							>Remove</button
						>
					</div>
				</li>
			{/each}
		</ul>
		<button class="mt-4 bg-green-500 px-4 py-2 text-white">Proceed to Checkout</button>
	{/if}
</div>

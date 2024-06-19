<script lang="ts">
	import { cart } from '$lib/store';
	import { toast } from 'svelte-sonner';

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

<div class="p-4 dark:bg-gray-900 dark:text-white">
	{#if $cart.length === 0}
		<p>Your cart is empty.</p>
	{:else}
		<ul>
			{#each $cart as item, index}
				<li class="flex items-center justify-between border-b p-2 dark:border-gray-700">
					<img src={item.image} alt={item.title} class="mr-4 h-16 w-16 rounded-md object-cover" />
					<div class="flex-1">
						<p class="text-left font-semibold">{item.title}</p>
						<p class="text-left text-gray-500 dark:text-gray-400">${item.price}</p>
					</div>
					<div class="flex items-center">
						<button
							on:click={() => decreaseQuantity(index)}
							class="flex h-8 w-8 items-center justify-center rounded-l-md bg-gray-300 dark:bg-gray-700"
							>-</button
						>
						<span class="px-2">{item.quantity || 1}</span>
						<button
							on:click={() => increaseQuantity(index)}
							class="flex h-8 w-8 items-center justify-center rounded-r-md bg-gray-300 dark:bg-gray-700"
							>+</button
						>
						<button
							on:click={() => removeItem(index)}
							class="ml-2 rounded-md bg-red-500 px-2 text-white dark:bg-red-700"
						>
							Remove
						</button>
					</div>
				</li>
			{/each}
		</ul>
		<button class="mt-4 rounded-md bg-green-500 px-4 py-2 text-white dark:bg-green-700">
			Proceed to Checkout
		</button>
	{/if}
</div>

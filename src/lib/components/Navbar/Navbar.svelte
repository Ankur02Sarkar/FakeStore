<script lang="ts">
	import { cart } from '$lib/store';
	import { ShoppingCart } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { DarkModeToggle } from '../DarkModeToggle';

	let cartCount = 0;

	// Subscribe to cart updates
	const unsubscribe = cart.subscribe((items) => {
		cartCount = items.length;
	});

	// Ensure we unsubscribe when the component is destroyed
	onMount(() => {
		return () => {
			unsubscribe();
		};
	});

	function openCart() {
		goto('/cart');
	}
</script>

<nav
	class=" z-10 flex w-full items-center justify-between bg-gray-500 p-4 text-white dark:bg-gray-800"
>
	<div class="text-xl font-bold">
		<button on:click={() => goto('/')}>My Store</button>
	</div>
	<div class="flex gap-2">
		<DarkModeToggle />
		<button class="ShoppingCart relative" on:click={openCart}>
			<ShoppingCart class="h-6 w-6 cursor-pointer" />
			{#if cartCount > 0}
				<span
					class="cartBadge absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-red-500 px-2 py-1 text-xs leading-none text-white"
				>
					{cartCount}
				</span>
			{/if}
		</button>
	</div>
</nav>

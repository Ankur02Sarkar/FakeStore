<script lang="ts">
	import { cart } from '$lib/store';
	import { ShoppingCart } from 'lucide-svelte';
	import { get } from 'svelte/store';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let cartCount = 0;

	$: cartCount = get(cart).length;

	function openCart() {
		goto("/cart");
	}
</script>

<nav class="flex items-center justify-between bg-gray-800 p-4 text-white">
	<div class="text-xl font-bold">My Store</div>
	<button class="relative" on:click={openCart}>
		<ShoppingCart class="h-6 w-6 cursor-pointer" />
		{#if cartCount > 0}
			<span class="absolute right-0 top-0 rounded-full bg-red-500 px-2 text-xs">
				{cartCount}
			</span>
		{/if}
	</button>
</nav>

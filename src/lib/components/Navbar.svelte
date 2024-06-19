<script lang="ts">
	import { cart } from '$lib/store';
	import { ShoppingCart } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

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

<nav class="flex items-center justify-between bg-gray-800 p-4 text-white">
	<div class="text-xl font-bold">
		<button on:click={() => goto('/')}>My Store</button>
	</div>
	<div class="">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-900"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<button class="relative" on:click={openCart}>
			<ShoppingCart class="ShoppingCart h-6 w-6 cursor-pointer" />
			{#if cartCount > 0}
				<span
					class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-red-500 px-2 py-1 text-xs leading-none text-white"
				>
					{cartCount}
				</span>
			{/if}
		</button>
	</div>
</nav>

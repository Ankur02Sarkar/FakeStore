<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	const isDarkMode = writable<boolean>(false);

	// Function to toggle dark mode
	const toggleDarkMode = () => {
		isDarkMode.update((mode) => {
			const newMode = !mode;
			const htmlElement = document.documentElement;
			if (newMode) {
				htmlElement.classList.add('dark');
				htmlElement.setAttribute('style', 'color-scheme: dark;');
				localStorage.setItem('darkMode', 'true');
			} else {
				htmlElement.classList.remove('dark');
				htmlElement.setAttribute('style', 'color-scheme: light;');
				localStorage.setItem('darkMode', 'false');
			}
			return newMode;
		});
	};

	onMount(() => {
		const savedMode = localStorage.getItem('darkMode');
		const htmlElement = document.documentElement;
		if (savedMode === 'true') {
			htmlElement.classList.add('dark');
			htmlElement.setAttribute('style', 'color-scheme: dark;');
			isDarkMode.set(true);
		} else {
			htmlElement.classList.remove('dark');
			htmlElement.setAttribute('style', 'color-scheme: light;');
			isDarkMode.set(false);
		}
	});
</script>

<button
	class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
	on:click={toggleDarkMode}
>
	{#if $isDarkMode}
		<Sun class="h-6 w-6 text-yellow-500" />
	{:else}
		<Moon class="h-6 w-6 text-blue-500" />
	{/if}
</button>

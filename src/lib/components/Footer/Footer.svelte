<script lang="ts">
	import { onMount } from 'svelte';

	let currentYear: number;

	onMount(() => {
		currentYear = new Date().getFullYear();
	});
</script>

<footer class="bg-gray-900 p-4 text-center text-white absolute w-full bottom-0">
	<p>
		&copy; {currentYear}
		<a
			href="https://github.com/Ankur02Sarkar"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-400 hover:underline">Ankur02Sarkar</a
		>
		|
		<a
			href="https://github.com/Ankur02Sarkar/FakeStore"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-400 hover:underline">Repo Link</a
		>
	</p>
</footer>

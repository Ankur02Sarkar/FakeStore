<!-- src/lib/components/SkeletonLoader.svelte -->
<script lang="ts">
	export let count: number = 1;
</script>

{#each Array(count) as _}
	<div class="animate-pulse border p-4">
		<div class="mb-4 h-48 bg-gray-300"></div>
		<div class="mb-2 h-6 bg-gray-300"></div>
		<div class="h-6 w-1/2 bg-gray-300"></div>
	</div>
{/each}

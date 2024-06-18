<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let title: string = '';
	export let description: string = '';
	export let itemId: number = 0;

	function truncateText(text: string, maxLength: number): string {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	}
</script>

<div
	class={cn(
		'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
		className
	)}
>
	<slot name="header" />
	<div class="transition duration-200 group-hover/bento:translate-x-2">
		<a
			href={`/product/${itemId}`}
			class="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200"
		>
			{title}
		</a>
		<div class="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
			{truncateText(description, 50)}
		</div>
	</div>
</div>

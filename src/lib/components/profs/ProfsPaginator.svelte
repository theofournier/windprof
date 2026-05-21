<script lang="ts">
	let {
		currentPage = $bindable(1),
		totalPages
	}: {
		currentPage?: number;
		totalPages: number;
	} = $props();

	function getPageNumbers(current: number, total: number): (number | '...')[] {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
		const pages: (number | '...')[] = [1];
		if (current > 3) pages.push('...');
		const start = Math.max(2, current - 1);
		const end = Math.min(total - 1, current + 1);
		for (let i = start; i <= end; i++) pages.push(i);
		if (current < total - 2) pages.push('...');
		pages.push(total);
		return pages;
	}

	let pageNumbers = $derived(getPageNumbers(currentPage, totalPages));
</script>

{#snippet navButton(icon: string, onclick: () => void, disabled: boolean)}
	<button
		{onclick}
		{disabled}
		class="flex size-10 cursor-pointer items-center justify-center rounded-md border border-line bg-white text-ink hover:bg-bg-dark disabled:cursor-default disabled:opacity-40"
		>{icon}</button
	>
{/snippet}

{#if totalPages > 1}
	<div class="mt-10 flex items-center justify-center gap-2">
		{@render navButton('←', () => (currentPage -= 1), currentPage === 1)}

		{#each pageNumbers as page}
			{#if page === '...'}
				<span
					class="mono flex size-10 items-center justify-center rounded-md text-body-sm font-bold tracking-wide text-muted"
					>…</span
				>
			{:else if page === currentPage}
				<span
					class="mono flex size-10 items-center justify-center rounded-md bg-ink text-body-sm font-bold tracking-wide text-white"
					>{page}</span
				>
			{:else}
				<button
					onclick={() => (currentPage = page as number)}
					class="mono flex size-10 cursor-pointer items-center justify-center rounded-md text-body-sm font-bold tracking-wide text-ink hover:bg-bg-dark"
					>{page}</button
				>
			{/if}
		{/each}

		{@render navButton('→', () => (currentPage += 1), currentPage === totalPages)}
	</div>
{/if}

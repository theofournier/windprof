<script lang="ts">
	import kitesurfIcon from '$lib/assets/kitesurf.svg';
	import wingfoilIcon from '$lib/assets/wingfoil.svg';
	import windsurfIcon from '$lib/assets/windsurf.svg';
	import type { Sport } from './types.js';

	let { kind }: { kind: Sport['icon'] } = $props();
</script>

{#if kind === 'kite'}
	<img src={kitesurfIcon} alt="Kitesurf silhouette" width="100%" height="100%" />
{:else if kind === 'wing'}
	<img src={wingfoilIcon} alt="Wingfoil silhouette" width="100%" height="100%" />
{:else}
	<img src={windsurfIcon} alt="Windsurf silhouette" width="100%" height="100%" />
{/if}

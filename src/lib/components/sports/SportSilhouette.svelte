<script lang="ts">
	let {
		kind,
		color = '#fff',
		accent = '#E8724C'
	}: { kind: 'kite' | 'wing' | 'wind'; color?: string; accent?: string } = $props();
</script>

{#if kind === 'kite'}
	<svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
		<path d="M30 50 Q 100 20, 170 50" stroke={accent} stroke-width="3" stroke-linecap="round" />
		<path
			d="M30 50 Q 100 35, 170 50"
			stroke={accent}
			stroke-width="1.5"
			stroke-linecap="round"
			opacity=".5"
		/>
		<line x1="55" y1="55" x2="100" y2="140" stroke={color} stroke-width=".8" opacity=".6" />
		<line x1="100" y1="50" x2="100" y2="140" stroke={color} stroke-width=".8" opacity=".6" />
		<line x1="145" y1="55" x2="100" y2="140" stroke={color} stroke-width=".8" opacity=".6" />
		<circle cx="100" cy="138" r="4" fill={color} />
		<line x1="100" y1="142" x2="100" y2="162" stroke={color} stroke-width="2.5" stroke-linecap="round" />
		<line x1="70" y1="170" x2="130" y2="170" stroke={color} stroke-width="3" stroke-linecap="round" />
		<line
			x1="20"
			y1="180"
			x2="180"
			y2="180"
			stroke={color}
			stroke-width=".6"
			opacity=".4"
			stroke-dasharray="2 4"
		/>
	</svg>
{:else if kind === 'wing'}
	<svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
		<path
			d="M55 55 Q 100 30, 145 55 Q 130 75, 100 78 Q 70 75, 55 55 Z"
			stroke={accent}
			stroke-width="2.5"
			fill="none"
			stroke-linejoin="round"
		/>
		<line x1="100" y1="33" x2="100" y2="77" stroke={accent} stroke-width="1" opacity=".5" />
		<circle cx="100" cy="105" r="4" fill={color} />
		<line
			x1="100"
			y1="78"
			x2="100"
			y2="135"
			stroke={color}
			stroke-width="2.5"
			stroke-linecap="round"
		/>
		<line x1="100" y1="115" x2="78" y2="60" stroke={color} stroke-width="1.5" stroke-linecap="round" />
		<line x1="65" y1="148" x2="135" y2="148" stroke={color} stroke-width="3" stroke-linecap="round" />
		<line x1="100" y1="148" x2="100" y2="172" stroke={color} stroke-width="1.5" />
		<line
			x1="84"
			y1="172"
			x2="116"
			y2="172"
			stroke={accent}
			stroke-width="2"
			stroke-linecap="round"
		/>
		<line
			x1="92"
			y1="178"
			x2="108"
			y2="178"
			stroke={accent}
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<line
			x1="20"
			y1="190"
			x2="180"
			y2="190"
			stroke={color}
			stroke-width=".6"
			opacity=".4"
			stroke-dasharray="2 4"
		/>
	</svg>
{:else}
	<svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
		<line x1="100" y1="30" x2="100" y2="160" stroke={color} stroke-width="2" />
		<path
			d="M100 30 Q 150 65, 145 130 L 100 130 Z"
			stroke={accent}
			stroke-width="2.5"
			fill="none"
			stroke-linejoin="round"
		/>
		<path d="M100 95 Q 130 100, 142 110" stroke={color} stroke-width="1.5" />
		<circle cx="92" cy="142" r="4" fill={color} />
		<line
			x1="92"
			y1="146"
			x2="92"
			y2="168"
			stroke={color}
			stroke-width="2.5"
			stroke-linecap="round"
		/>
		<line x1="60" y1="175" x2="140" y2="175" stroke={color} stroke-width="3" stroke-linecap="round" />
		<line
			x1="20"
			y1="185"
			x2="180"
			y2="185"
			stroke={color}
			stroke-width=".6"
			opacity=".4"
			stroke-dasharray="2 4"
		/>
	</svg>
{/if}

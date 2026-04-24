<script>
	import SportItem from './SportItem.svelte';
</script>

<section>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<SportItem
			name="Kitesurf"
			profsCount={10}
			spotCount={5}
			windMin={12}
			windMax={30}
			url="/sports/kitesurf"
		/>
		<SportItem
			name="Wingfoil"
			profsCount={10}
			spotCount={5}
			windMin={12}
			windMax={30}
			url="/sports/wingfoil"
		/>
		<SportItem
			name="Windsurf"
			profsCount={10}
			spotCount={5}
			windMin={12}
			windMax={30}
			url="/sports/windsurf"
		/>
	</div>
</section>

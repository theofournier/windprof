<script lang="ts">
	let {
		name,
		phone,
		email
	}: {
		name: string;
		phone: string;
		email: string;
	} = $props();
</script>

<div class="relative overflow-hidden rounded-2.5 bg-ink px-6 py-5.5 text-white">
	<div class="relative">
		<div class="mb-3.5 font-mono text-micro tracking-label text-white/50 uppercase">
			↳ CONTACT DIRECT · ZÉRO COMMISSION
		</div>

		<div class="mb-4 mt-3.5 grid grid-cols-2 gap-2.5">
			<div class="rounded-md border border-white/10 bg-white/6 px-3.5 py-3">
				<div class="font-mono text-micro tracking-label text-white/55">TÉLÉPHONE</div>
				<div class="mt-1 font-display text-[15px] font-bold">{phone}</div>
			</div>
			<div class="rounded-md border border-white/10 bg-white/6 px-3.5 py-3">
				<div class="font-mono text-micro tracking-label text-white/55">EMAIL</div>
				<div class="mt-1 font-display text-[15px] font-bold">{email}</div>
			</div>
		</div>

		<div class="flex gap-2.5">
			<button
				class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-4 py-3.5 font-display text-[15px] font-bold text-white"
			>
				📞 Appeler {name}
			</button>
			<button
				class="cursor-pointer rounded-md border border-white/20 bg-white/8 px-4.5 py-3.5 text-[15px] text-white"
				>✉</button
			>
			<button
				class="cursor-pointer rounded-md border border-white/20 bg-white/8 px-4.5 py-3.5 text-[15px] text-white"
				>♡</button
			>
		</div>

		<div
			class="mt-3 text-center font-mono text-[10.5px] tracking-loose text-white/50 uppercase"
		>
			Le moniteur gère ses tarifs et son planning
		</div>
	</div>
</div>

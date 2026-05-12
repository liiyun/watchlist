<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
		background:
			radial-gradient(circle at top left, rgba(148, 163, 184, 0.2), transparent 32rem),
			linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
		color: #172033;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		line-height: 1.5;
	}

	:global(button),
	:global(input) {
		font: inherit;
	}

	:global(button) {
		border: 0;
		border-radius: 999px;
		background: #172033;
		color: #ffffff;
		cursor: pointer;
		font-weight: 650;
		padding: 0.75rem 1rem;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	:global(button:hover) {
		background: #263248;
		transform: translateY(-1px);
	}

	:global(button:focus-visible),
	:global(input:focus-visible) {
		outline: 3px solid rgba(37, 99, 235, 0.25);
		outline-offset: 2px;
	}

	:global(input) {
		width: 100%;
		border: 1px solid #d4dbe8;
		border-radius: 0.85rem;
		background: #ffffff;
		color: inherit;
		padding: 0.75rem 0.85rem;
	}

	:global(label) {
		display: grid;
		gap: 0.4rem;
		color: #364153;
		font-weight: 650;
	}

	:global(main) {
		width: min(100%, 46rem);
		margin: 0 auto;
		padding: clamp(2rem, 7vw, 4.5rem) 1rem;
	}

	:global(h1) {
		margin: 0;
		font-size: clamp(2.35rem, 8vw, 4rem);
		letter-spacing: -0.055em;
		line-height: 0.95;
	}

	:global(p) {
		margin: 0;
		color: #5f6b7d;
	}
</style>

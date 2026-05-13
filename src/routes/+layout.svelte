<script lang="ts">
	import type { Snippet } from 'svelte';
	import { enhance } from '$app/forms';
	import favicon from '$lib/assets/favicon.svg';
	import LogOut from '@lucide/svelte/icons/log-out';
	import UserRound from '@lucide/svelte/icons/user-round';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	const displayName = $derived(data.user ? data.user.name?.trim() || data.user.email : '');
	const secondaryAccount = $derived(
		data.user &&
			data.user.name?.trim() &&
			data.user.email &&
			data.user.name.trim() !== data.user.email
			? data.user.email
			: ''
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="color-scheme" content="light dark" />
</svelte:head>

<div class="app">
	{#if data.user}
		<header class="topbar">
			<div class="account">
				<span class="account-icon" aria-hidden="true">
					<UserRound size={18} strokeWidth={2} />
				</span>
				<div class="account-text">
					<span class="account-name">{displayName}</span>
					{#if secondaryAccount}
						<span class="account-email">{secondaryAccount}</span>
					{/if}
				</div>
			</div>
			<form class="sign-out-form" method="post" action="/?/signOut" use:enhance>
				<button type="submit" class="sign-out-btn">
					<LogOut size={18} strokeWidth={2} aria-hidden="true" />
					Sign out
				</button>
			</form>
		</header>
	{/if}

	{@render children()}
</div>

<style>
	:global(:root) {
		color-scheme: light;
		--bg-page: #f8fafc;
		--bg-page-2: #eef2f7;
		--bg-radial: rgba(148, 163, 184, 0.2);
		--text: #172033;
		--text-muted: #5f6b7d;
		--text-label: #364153;
		--accent: #2563eb;
		--border-subtle: rgba(148, 163, 184, 0.26);
		--border-muted: rgba(148, 163, 184, 0.24);
		--surface: rgba(255, 255, 255, 0.86);
		--surface-elevated: rgba(255, 255, 255, 0.9);
		--surface-input: #ffffff;
		--shadow-card: rgba(15, 23, 42, 0.08);
		--shadow-soft: rgba(15, 23, 42, 0.07);
		--btn-primary: #172033;
		--btn-primary-hover: #263248;
		--btn-on-primary: #ffffff;
		--btn-secondary-bg: #e7ecf4;
		--btn-secondary-hover: #dbe2ee;
		--btn-secondary-text: #172033;
		--focus-ring: rgba(37, 99, 235, 0.25);
		--topbar-bg: rgba(255, 255, 255, 0.72);
		--topbar-border: rgba(148, 163, 184, 0.22);
		--divider: #e7ebf2;
		--notice-border: #bfdbfe;
		--notice-bg: #eff6ff;
		--notice-text: #1d4ed8;
		--danger: #b91c1c;
		--danger-bg: #fef2f2;
		--danger-border: #fecaca;
		--danger-hover: #fee2e2;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			color-scheme: dark;
			--bg-page: #0c0f14;
			--bg-page-2: #121824;
			--bg-radial: rgba(96, 165, 250, 0.08);
			--text: #e8edf7;
			--text-muted: #9aa4b8;
			--text-label: #b8c0d4;
			--accent: #60a5fa;
			--border-subtle: rgba(148, 163, 184, 0.18);
			--border-muted: rgba(148, 163, 184, 0.16);
			--surface: rgba(22, 27, 38, 0.88);
			--surface-elevated: rgba(22, 27, 38, 0.94);
			--surface-input: #161b26;
			--shadow-card: rgba(0, 0, 0, 0.45);
			--shadow-soft: rgba(0, 0, 0, 0.4);
			--btn-primary: #e8edf7;
			--btn-primary-hover: #ffffff;
			--btn-on-primary: #0c0f14;
			--btn-secondary-bg: #252d3d;
			--btn-secondary-hover: #2f3849;
			--btn-secondary-text: #e8edf7;
			--focus-ring: rgba(96, 165, 250, 0.35);
			--topbar-bg: rgba(12, 15, 20, 0.75);
			--topbar-border: rgba(148, 163, 184, 0.14);
			--divider: rgba(148, 163, 184, 0.14);
			--notice-border: rgba(96, 165, 250, 0.45);
			--notice-bg: rgba(30, 58, 138, 0.35);
			--notice-text: #93c5fd;
			--danger: #fca5a5;
			--danger-bg: rgba(127, 29, 29, 0.25);
			--danger-border: rgba(248, 113, 113, 0.35);
			--danger-hover: rgba(127, 29, 29, 0.38);
		}
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
		background:
			radial-gradient(circle at top left, var(--bg-radial), transparent 32rem),
			linear-gradient(180deg, var(--bg-page) 0%, var(--bg-page-2) 100%);
		color: var(--text);
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
		background: var(--btn-primary);
		color: var(--btn-on-primary);
		cursor: pointer;
		font-weight: 650;
		padding: 0.75rem 1rem;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	:global(button:hover) {
		background: var(--btn-primary-hover);
		transform: translateY(-1px);
	}

	:global(button:focus-visible),
	:global(input:focus-visible) {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	:global(button.secondary) {
		background: var(--btn-secondary-bg);
		color: var(--btn-secondary-text);
	}

	:global(button.secondary:hover) {
		background: var(--btn-secondary-hover);
	}

	:global(input) {
		width: 100%;
		border: 1px solid var(--border-subtle);
		border-radius: 0.85rem;
		background: var(--surface-input);
		color: inherit;
		padding: 0.75rem 0.85rem;
	}

	:global(label) {
		display: grid;
		gap: 0.4rem;
		color: var(--text-label);
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
		color: var(--text-muted);
	}

	.app {
		min-height: 100vh;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding: 0.65rem clamp(1rem, 4vw, 2rem);
		border-bottom: 1px solid var(--topbar-border);
		background: var(--topbar-bg);
		backdrop-filter: blur(10px);
	}

	.account {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		min-width: 0;
	}

	.account-icon {
		display: flex;
		color: var(--text-muted);
		flex-shrink: 0;
	}

	.account-text {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
	}

	.account-name {
		font-weight: 650;
		font-size: 0.95rem;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.account-email {
		font-size: 0.8rem;
		color: var(--text-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sign-out-form {
		margin: 0;
		flex-shrink: 0;
	}

	.sign-out-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.95rem;
		font-size: 0.9rem;
	}

	.sign-out-btn :global(svg) {
		flex-shrink: 0;
	}
</style>

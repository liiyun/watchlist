<script lang="ts">
	import { enhance } from '$app/forms';
	import Clapperboard from '@lucide/svelte/icons/clapperboard';
	import LogIn from '@lucide/svelte/icons/log-in';
	import UserPlus from '@lucide/svelte/icons/user-plus';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Log in | Watchlist</title>
</svelte:head>

<main class="login-page">
	<section class="intro" aria-labelledby="login-heading">
		<p class="eyebrow">Movie night, organized</p>
		<div class="title-row">
			<span class="title-icon" aria-hidden="true">
				<Clapperboard size={40} strokeWidth={1.75} />
			</span>
			<h1 id="login-heading">Watchlist</h1>
		</div>
		<p>Log in or register to start saving movies you want to watch.</p>
	</section>

	<form class="auth-card" method="post" action="?/signInEmail" use:enhance>
		<label>
			Email
			<input type="email" name="email" autocomplete="email" required />
		</label>

		<label>
			Password
			<input type="password" name="password" autocomplete="current-password" required />
		</label>

		<label>
			Name
			<input name="name" autocomplete="name" />
		</label>

		<div class="actions">
			<button type="submit" class="primary-with-icon">
				<LogIn size={20} strokeWidth={2} aria-hidden="true" />
				Log in
			</button>
			<button class="secondary with-icon" type="submit" formaction="?/signUpEmail">
				<UserPlus size={20} strokeWidth={2} aria-hidden="true" />
				Register
			</button>
		</div>
	</form>

	{#if form?.message}
		<p class="notice" role="alert">{form.message}</p>
	{/if}
</main>

<style>
	.login-page {
		display: grid;
		gap: 1.5rem;
	}

	.intro {
		display: grid;
		gap: 0.75rem;
		max-width: 34rem;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.title-row h1 {
		line-height: 1;
	}

	.title-icon {
		display: flex;
		color: var(--accent, #2563eb);
		flex-shrink: 0;
	}

	.eyebrow {
		color: var(--accent, #2563eb);
		font-size: 0.8rem;
		font-weight: 750;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.auth-card {
		display: grid;
		gap: 1rem;
		border: 1px solid var(--border-subtle, rgba(148, 163, 184, 0.26));
		border-radius: 1.35rem;
		background: var(--surface, rgba(255, 255, 255, 0.86));
		padding: clamp(1rem, 4vw, 1.5rem);
		box-shadow: 0 1rem 2.75rem var(--shadow-card, rgba(15, 23, 42, 0.08));
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding-top: 0.25rem;
	}

	.primary-with-icon,
	.with-icon {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.primary-with-icon :global(svg),
	.with-icon :global(svg) {
		flex-shrink: 0;
	}

	.notice {
		border: 1px solid var(--notice-border, #bfdbfe);
		border-radius: 0.9rem;
		background: var(--notice-bg, #eff6ff);
		color: var(--notice-text, #1d4ed8);
		padding: 0.85rem 1rem;
	}

	@media (max-width: 32rem) {
		.actions,
		.actions button {
			width: 100%;
		}

		.primary-with-icon,
		.with-icon {
			justify-content: center;
		}
	}
</style>

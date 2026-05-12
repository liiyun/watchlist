<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Log in | Watchlist</title>
</svelte:head>

<main class="login-page">
	<section class="intro" aria-labelledby="login-heading">
		<p class="eyebrow">Movie night, organized</p>
		<h1 id="login-heading">Watchlist</h1>
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
			<button>Log in</button>
			<button class="secondary" formaction="?/signUpEmail">Register</button>
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

	.eyebrow {
		color: #2563eb;
		font-size: 0.8rem;
		font-weight: 750;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.auth-card {
		display: grid;
		gap: 1rem;
		border: 1px solid rgba(148, 163, 184, 0.26);
		border-radius: 1.35rem;
		background: rgba(255, 255, 255, 0.86);
		padding: clamp(1rem, 4vw, 1.5rem);
		box-shadow: 0 1rem 2.75rem rgba(15, 23, 42, 0.08);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding-top: 0.25rem;
	}

	.secondary {
		background: #e7ecf4;
		color: #172033;
	}

	.secondary:hover {
		background: #dbe2ee;
	}

	.notice {
		border: 1px solid #bfdbfe;
		border-radius: 0.9rem;
		background: #eff6ff;
		color: #1d4ed8;
		padding: 0.85rem 1rem;
	}

	@media (max-width: 32rem) {
		.actions,
		.actions button {
			width: 100%;
		}
	}
</style>

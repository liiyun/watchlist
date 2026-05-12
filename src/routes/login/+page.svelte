<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Log in | Watchlist</title>
</svelte:head>

<main>
	<h1>Watchlist</h1>
	<p>Log in or register to start saving movies you want to watch.</p>

	<form method="post" action="?/signInEmail" use:enhance>
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

		<div>
			<button>Log in</button>
			<button formaction="?/signUpEmail">Register</button>
		</div>
	</form>

	{#if form?.message}
		<p role="alert">{form.message}</p>
	{/if}
</main>

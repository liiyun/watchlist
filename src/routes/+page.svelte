<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Watchlist</title>
</svelte:head>

<main>
	<header>
		<h1>Watchlist</h1>
		<p>Signed in as {data.user.email}</p>
		<form method="post" action="?/signOut" use:enhance>
			<button>Sign out</button>
		</form>
	</header>

	<form method="post" action="?/addMovie" use:enhance>
		<label>
			Movie title
			<input name="title" autocomplete="off" required />
		</label>
		<button>Add movie</button>
	</form>

	{#if form?.message}
		<p role="alert">{form.message}</p>
	{/if}

	{#if data.movies.length > 0}
		<ul>
			{#each data.movies as movie (movie.id)}
				<li>{movie.title}</li>
			{/each}
		</ul>
	{:else}
		<p>No movies yet.</p>
	{/if}
</main>

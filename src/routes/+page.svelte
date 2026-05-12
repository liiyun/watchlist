<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData, PageServerData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	const clearAfterAdd: SubmitFunction = () => {
		return async ({ formElement, result, update }) => {
			if (result.type === 'redirect') {
				HTMLFormElement.prototype.reset.call(formElement);
			}

			await update();
		};
	};
</script>

<svelte:head>
	<title>Watchlist</title>
</svelte:head>

<main class="watchlist-page">
	<header class="hero">
		<div>
			<p class="eyebrow">Your movie queue</p>
			<h1>Watchlist</h1>
			<p>Signed in as {data.user.email}</p>
		</div>
		<form method="post" action="?/signOut" use:enhance>
			<button>Sign out</button>
		</form>
	</header>

	<form class="add-movie" method="post" action="?/addMovie" use:enhance={clearAfterAdd}>
		<label>
			Movie title
			<input name="title" autocomplete="off" required />
		</label>
		<button>Add movie</button>
	</form>

	{#if form?.message}
		<p class="notice" role="alert">{form.message}</p>
	{/if}

	<section class="movie-card" aria-label="Saved movies">
		{#if data.movies.length > 0}
			<ul>
				{#each data.movies as movie (movie.id)}
					<li>{movie.title}</li>
				{/each}
			</ul>
		{:else}
			<p class="empty-state">No movies yet. Add one to get started.</p>
		{/if}
	</section>
</main>

<style>
	.watchlist-page {
		display: grid;
		gap: 1.5rem;
	}

	.hero {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.eyebrow {
		margin-bottom: 0.4rem;
		color: #2563eb;
		font-size: 0.8rem;
		font-weight: 750;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.add-movie {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: 0.75rem;
		border: 1px solid rgba(148, 163, 184, 0.26);
		border-radius: 1.25rem;
		background: rgba(255, 255, 255, 0.82);
		padding: 1rem;
		box-shadow: 0 1rem 2.75rem rgba(15, 23, 42, 0.08);
	}

	.notice {
		border: 1px solid #bfdbfe;
		border-radius: 0.9rem;
		background: #eff6ff;
		color: #1d4ed8;
		padding: 0.85rem 1rem;
	}

	.movie-card {
		overflow: hidden;
		border: 1px solid rgba(148, 163, 184, 0.24);
		border-radius: 1.35rem;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 1rem 2.5rem rgba(15, 23, 42, 0.07);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		padding: 1rem 1.15rem;
		font-size: 1.05rem;
		font-weight: 650;
	}

	li + li {
		border-top: 1px solid #e7ebf2;
	}

	.empty-state {
		padding: 1.25rem;
	}

	@media (max-width: 42rem) {
		.hero,
		.add-movie {
			grid-template-columns: 1fr;
		}

		.hero {
			display: grid;
		}

		.hero button,
		.add-movie button {
			width: 100%;
		}
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Film from '@lucide/svelte/icons/film';
	import ListPlus from '@lucide/svelte/icons/list-plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

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
		<div class="hero-copy">
			<p class="eyebrow">Your movie queue</p>
			<div class="title-row">
				<span class="title-icon" aria-hidden="true">
					<Film size={40} strokeWidth={1.75} />
				</span>
				<h1>Watchlist</h1>
			</div>
			<p class="tagline">Track films you want to watch.</p>
		</div>
	</header>

	<form class="add-movie" method="post" action="?/addMovie" use:enhance={clearAfterAdd}>
		<label>
			Movie title
			<input name="title" autocomplete="off" required />
		</label>
		<button type="submit" class="add-btn">
			<ListPlus size={20} strokeWidth={2} aria-hidden="true" />
			Add movie
		</button>
	</form>

	{#if form?.message}
		<p class="notice" role="alert">{form.message}</p>
	{/if}

	<section class="movie-card" aria-label="Saved movies">
		{#if data.movies.length > 0}
			<ul>
				{#each data.movies as movie (movie.id)}
					<li>
						<span class="movie-title">{movie.title}</span>
						<form method="post" action="?/deleteMovie" use:enhance>
							<input type="hidden" name="movieId" value={movie.id} />
							<button type="submit" class="delete-btn" aria-label="Delete {movie.title}">
								<Trash2 size={18} strokeWidth={2} aria-hidden="true" />
							</button>
						</form>
					</li>
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
		justify-content: flex-start;
		gap: 1rem;
	}

	.hero-copy {
		min-width: 0;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		margin-top: 0.15rem;
	}

	.title-row h1 {
		line-height: 1;
	}

	.title-icon {
		display: flex;
		color: var(--accent, #2563eb);
		flex-shrink: 0;
	}

	.tagline {
		margin-top: 0.5rem;
	}

	.eyebrow {
		margin-bottom: 0.4rem;
		color: var(--accent, #2563eb);
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
		border: 1px solid var(--border-subtle, rgba(148, 163, 184, 0.26));
		border-radius: 1.25rem;
		background: var(--surface, rgba(255, 255, 255, 0.82));
		padding: 1rem;
		box-shadow: 0 1rem 2.75rem var(--shadow-card, rgba(15, 23, 42, 0.08));
	}

	.add-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.add-btn :global(svg) {
		flex-shrink: 0;
	}

	.notice {
		border: 1px solid var(--notice-border, #bfdbfe);
		border-radius: 0.9rem;
		background: var(--notice-bg, #eff6ff);
		color: var(--notice-text, #1d4ed8);
		padding: 0.85rem 1rem;
	}

	.movie-card {
		overflow: hidden;
		border: 1px solid var(--border-muted, rgba(148, 163, 184, 0.24));
		border-radius: 1.35rem;
		background: var(--surface-elevated, rgba(255, 255, 255, 0.9));
		box-shadow: 0 1rem 2.5rem var(--shadow-soft, rgba(15, 23, 42, 0.07));
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 1rem 1.15rem;
		font-size: 1.05rem;
		font-weight: 650;
	}

	.movie-title {
		min-width: 0;
		flex: 1;
	}

	li form {
		margin: 0;
		flex-shrink: 0;
	}

	.delete-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.45rem;
		min-width: 2.25rem;
		min-height: 2.25rem;
		border-radius: 0.65rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--danger, #b91c1c);
		background: var(--danger-bg, #fef2f2);
		border: 1px solid var(--danger-border, #fecaca);
		cursor: pointer;
		transform: none;
	}

	.delete-btn:hover {
		background: var(--danger-hover, #fee2e2);
		transform: none;
	}

	li + li {
		border-top: 1px solid var(--divider, #e7ebf2);
	}

	.empty-state {
		padding: 1.25rem;
	}

	@media (max-width: 42rem) {
		.add-movie {
			grid-template-columns: 1fr;
		}

		.add-movie .add-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>

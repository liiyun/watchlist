import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { and, desc, eq } from 'drizzle-orm';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { movie } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const movies = await db
		.select({
			id: movie.id,
			title: movie.title
		})
		.from(movie)
		.where(eq(movie.userId, event.locals.user.id))
		.orderBy(desc(movie.createdAt));

	return {
		user: event.locals.user,
		movies
	};
};

export const actions: Actions = {
	addMovie: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/login');
		}

		const formData = await event.request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';

		if (!title) {
			return fail(400, { message: 'Enter a movie title.' });
		}

		await db.insert(movie).values({
			title,
			userId: event.locals.user.id
		});

		return redirect(303, '/');
	},
	deleteMovie: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/login');
		}

		const formData = await event.request.formData();
		const idRaw = formData.get('movieId')?.toString() ?? '';
		const movieId = Number.parseInt(idRaw, 10);

		if (!Number.isFinite(movieId) || movieId <= 0) {
			return fail(400, { message: 'Invalid movie.' });
		}

		await db
			.delete(movie)
			.where(and(eq(movie.id, movieId), eq(movie.userId, event.locals.user.id)));

		return redirect(303, '/');
	},
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});

		return redirect(302, '/login');
	}
};

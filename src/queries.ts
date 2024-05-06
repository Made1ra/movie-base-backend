import { and, eq } from 'drizzle-orm';
import { db } from './db';
import { users, watchlist, ratings } from './db/schema';

export async function postUser(id: string, name: string, email: string, image: string) {
    const user = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.email, email),
    });
    if (user) {
        await db.insert(users).values({ id, name, email, image });
    }
}

export async function getUser(id: string) {
    const user = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, id),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return user;
}

export async function postWatchlist(id: string, userID: string, movieID: string) {
    await db.insert(watchlist).values({ id, userID, movieID });
}

export async function postRatings(id: string, userID: string, movieID: string, rating: number) {
    await db.insert(ratings).values({ id, userID, movieID, rating });
}

export async function getRatings(id: string) {
    const ratings = await db.query.ratings.findMany({
        where: (model, { eq }) => eq(model.userID, id),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return ratings;
}

export async function getWatchlist(id: string) {
    const watchlist = await db.query.watchlist.findMany({
        where: (model, { eq }) => eq(model.userID, id),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return watchlist;
}

export async function patchRatings(id: string, rating: number) {
    const patchedRatings = await db.update(ratings)
        .set({ rating: rating })
        .where(and(eq(ratings.movieID, id), eq(ratings.userID, users.id)));

    return patchedRatings;
}

export async function deleteMovieFromRatings(id: string) {
    await db
        .delete(ratings)
        .where(and(eq(ratings.id, id), eq(ratings.userID, users.id)));
}

export async function deleteMovieFromWatchlist(id: string) {
    await db
        .delete(watchlist)
        .where(and(eq(watchlist.id, id), eq(watchlist.userID, users.id)));
}

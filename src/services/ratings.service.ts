import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { ratings, users } from '../db/schema';

export async function postRatings(id: string, userID: string, movieID: string, rating: number) {
    const r = await db.query.ratings.findFirst({
        where: (model, { eq }) => eq(model.userID, userID) && eq(model.movieID, movieID),
    });
    if (!r) {
        await db.insert(ratings).values({ id, userID, movieID, rating });
    }
}

export async function getRating(userID: string, movieID: string) {
    const rating = await db.query.ratings.findFirst({
        where: (model, { eq }) => eq(model.userID, userID) && eq(model.movieID, movieID),
    });

    return rating;
}

export async function getRatings(id: string) {
    const ratings = await db.query.ratings.findMany({
        where: (model, { eq }) => eq(model.userID, id),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return ratings;
}

export async function getMovieFromWatchlist(userID: string, movieID: string) {
    const watchlist = await db.query.watchlist.findFirst({
        where: (model, { eq }) => eq(model.userID, userID) && eq(model.movieID, movieID),
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

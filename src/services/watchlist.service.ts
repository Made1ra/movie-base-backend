import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { users, watchlist } from '../db/schema';

export async function postWatchlist(id: string, userID: string, movieID: string) {
    const w = await db.query.watchlist.findFirst({
        where: (model, { eq }) => eq(model.userID, userID) && eq(model.movieID, movieID),
    });
    if (!w) {
        await db.insert(watchlist).values({ id, userID, movieID });
    }
}

export async function getMovieFromWatchlist(userID: string, movieID: string) {
    const watchlist = await db.query.watchlist.findFirst({
        where: (model, { eq }) => eq(model.userID, userID) && eq(model.movieID, movieID),
    });

    return watchlist;
}

export async function getWatchlist(id: string) {
    const watchlist = await db.query.watchlist.findMany({
        where: (model, { eq }) => eq(model.userID, id),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return watchlist;
}

export async function deleteMovieFromWatchlist(id: string, userID: string) {
    await db
        .delete(watchlist)
        .where(and(eq(watchlist.id, id), eq(watchlist.userID, userID)));
}

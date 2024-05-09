import express from 'express';
import { getRating, getMovieFromWatchlist } from '../queries';

const router = express.Router();

router.get('/title/:id', async (request, response) => {
    const id = request.params.id;
    const userID = request.query.toString();
    try {
        const rating = await getRating(userID, id);
        const watchlist = await getMovieFromWatchlist(userID, id);
        response.status(200).json(rating).json(watchlist);
    } catch (error) {
        console.error('Error getting the ratings:', error);
        response.status(500).json({ error: 'An error occurred while getting the ratings' });
    }
});

export default router;

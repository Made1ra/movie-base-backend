import express from 'express';
import { postWatchlist, getWatchlist, deleteMovieFromWatchlist } from '../services/watchlist.service';

const router = express.Router();

router.post('/user/:id/watchlist', async (request, response) => {
    const userID = request.params.id.toString();
    const { id, movieID } = request.body;
    try {
        await postWatchlist(id, userID, movieID);
        response.status(200).json({ message: 'Watchlist added successfully' });
    } catch (error) {
        console.error('Error adding watchlist:', error);
        response.status(500).json({ error: 'An error occurred while adding the watchlist' });
    }
});

router.get('/user/:id/watchlist', async (request, response) => {
    const id = request.params.id;
    try {
        const watchlist = await getWatchlist(id);
        response.status(200).json(watchlist);
    } catch (error) {
        console.error('Error getting the watchlist:', error);
        response.status(500).json({ error: 'An error occurred while getting the watchlist' });
    }
});

router.delete('/user/:id/watchlist', async (request, response) => {
    const userID = request.params.id;
    const { id } = request.body;
    try {
        await deleteMovieFromWatchlist(id, userID);
        response.status(200).json({ message: 'Watchlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting the watchlist:', error);
        response.status(500).json({ error: 'An error occurred while deleting the watchlist' });
    }
});

export default router;

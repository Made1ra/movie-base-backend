import express from 'express';
import { postWatchlist, getWatchlist, deleteMovieFromWatchlist } from '../queries';

const router = express.Router();

router.post('/user/:id/watchlist', async (request, response) => {
    const { userID, movieID } = request.body;
    try {
        await postWatchlist(userID, movieID);
        response.status(200).json({ message: 'Watchlist added successfully' });
    } catch (error) {
        console.error('Error adding watchlist:', error);
        response.status(500).json({ error: 'An error occurred while adding the watchlist' });
    }
});

router.get('/user/:id/watchlist', async (request, response) => {
    const id = request.params.id;
    try {
        await getWatchlist(id);
        response.status(200).json({ message: 'Watchlist get successfully' });
    } catch (error) {
        console.error('Error getting the watchlist:', error);
        response.status(500).json({ error: 'An error occurred while getting the watchlist' });
    }
});

router.delete('/user/:id/watchlist', async (request, response) => {
    const id = request.params.id;
    try {
        await deleteMovieFromWatchlist(+id);
        response.status(200).json({ message: 'Watchlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting the watchlist:', error);
        response.status(500).json({ error: 'An error occurred while deleting the watchlist' });
    }
});

export default router;
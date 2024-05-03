import express from 'express';
import { postRatings, getRatings, patchRatings, deleteMovieFromRatings } from '../queries';

const router = express.Router();

router.post('/user/:id/ratings', async (request, response) => {
    const { userID, movieID, rating } = request.body;
    try {
        await postRatings(userID, movieID, rating);
        response.status(200).json({ message: 'Rating added successfully' });
    } catch (error) {
        console.error('Error adding rating:', error);
        response.status(500).json({ error: 'An error occurred while adding the rating' });
    }
});

router.get('/user/:id/ratings', async (request, response) => {
    const id = request.params.id;
    try {
        await getRatings(id);
        response.status(200).json({ message: 'Rating get successfully' });
    } catch (error) {
        console.error('Error getting the ratings:', error);
        response.status(500).json({ error: 'An error occurred while getting the ratings' });
    }
});

router.patch('/user/:id/ratings', async (request, response) => {
    const id = request.params.id;
    const { rating } = request.body;
    try {
        await patchRatings(id, rating);
        response.status(200).json({ message: 'Rating edited successfully' });
    } catch (error) {
        console.error('Error editing the ratings:', error);
        response.status(500).json({ error: 'An error occurred while editing the ratings' });
    }
});

router.delete('/user/:id/ratings', async (request, response) => {
    const id = request.params.id;
    try {
        await deleteMovieFromRatings(+id);
        response.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting the ratings:', error);
        response.status(500).json({ error: 'An error occurred while deleting the ratings' });
    }
});

export default router;

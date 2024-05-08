import express from 'express';
import { postUser, getUser } from '../queries';

const router = express.Router();

router.post('/', async (request, response) => {
    const { id, name, email, image } = request.body;
    try {
        await postUser(id, name, email, image);
        response.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

router.get('/', async (request, response) => {
    const email = request.query.email?.toString();
    try {
        if (email) {
            const user = await getUser(email);
            response.status(200).json(user);
        }
    } catch (error) {
        console.error('Error getting the user:', error);
        response.status(500).json({ error: 'An error occurred while getting the user' });
    }
});

export default router;

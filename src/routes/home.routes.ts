import express from 'express';
import { postUser } from '../queries';

const router = express.Router();

router.post('/', async (request, response) => {
    const { name, email, image } = request.body;
    try {
        await postUser(name, email, image);
        response.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

export default router;

import express from 'express';
import { initRoutes } from './routes/routes';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.listen(port);

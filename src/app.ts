import express from 'express';
import homeRoutes from './routes/home.routes';
import ratingsRoutes from './routes/ratings.routes';
import watchlistRoutes from './routes/watchlist.routes';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/', homeRoutes);
app.use('/', ratingsRoutes);
app.use('/', watchlistRoutes);

app.listen(port);

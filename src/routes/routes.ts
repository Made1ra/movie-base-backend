import { Application } from 'express';
import homeRoutes from './home.routes';
import titleRoutes from './title.routes';
import ratingsRoutes from './ratings.routes';
import watchlistRoutes from './watchlist.routes';

export const initRoutes = (app: Application) => {
    app.use('/', homeRoutes);
    app.use('/', titleRoutes);
    app.use('/', ratingsRoutes);
    app.use('/', watchlistRoutes);
};

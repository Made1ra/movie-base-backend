import {
    pgTable,
    text,
    integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique(),
    image: text('image').notNull(),
});

export const ratings = pgTable('ratings', {
    id: text('id').primaryKey(),
    userID: text('user_id').references(() => users.id).notNull(),
    movieID: text('movie_id').notNull(),
    rating: integer('rating').notNull(),
});

export const watchlist = pgTable('watchlist', {
    id: text('id').primaryKey(),
    userID: text('user_id').references(() => users.id).notNull(),
    movieID: text('movie_id').notNull(),
});

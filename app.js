import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_, response) => {
    response.send('Hello, World!');
});

app.listen(port);

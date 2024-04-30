import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (_, response) => {
    response.send('Hello, World!');
});

app.listen(port);

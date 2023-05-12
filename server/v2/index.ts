import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { InProcGameControl, store } from './api';
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT;

const SANITIZE_REGEX = /[^\w\u{20a0}-\u{32ff}\u{1f000}-\u{1ffff}\u{fe4e5}-\u{fe4ee}]/gu;
const sanitize = (submission?: string) => 
    submission?.replace(SANITIZE_REGEX, '').toUpperCase();

const api = new InProcGameControl();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.get('/', (request, response) => {
    response.send('Game Control Server');
});

app.get('/event', (request, response) => {
    response.contentType('application/json');
    response.send(JSON.stringify(store));
});

app.get('/progress', (request, response) => {

});

app.put('/submit', (request, response) => {
    if (!request.is('application/json')) {
        response.send(400);
    }
    const sanitizedSubmission = sanitize(request.body?.answer);

    if (!sanitizedSubmission) {
        response.send(400);
        return;
    }

    try {
        const result = api.submitAnswer(sanitizedSubmission, "team-red", "puzzle-1");
        response.contentType('application/json');
        response.send(JSON.stringify(result));
    }
    catch (err) {
        response.send(400);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
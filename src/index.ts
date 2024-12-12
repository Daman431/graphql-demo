import express from 'express';
import { createHandler } from "graphql-http/lib/use/express";
import schema from './schemas/root.schema';

const app = express();
app.all('/graphql', createHandler({ schema:schema }));
app.get('/', (req, res) => { res.send('Hello World!'); });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
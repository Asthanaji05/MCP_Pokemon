
import express from 'express';
import bodyParser from 'body-parser';
import { tools } from './tools';
import apiRouter from './api';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Asthanaji\'s Pokemon MCP Server is running!');
});

app.get('/tools', (req, res) => {
  res.json(tools);
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});

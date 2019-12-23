const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const SqmResearch = require('./src/SqmResearch');
const pino = require('express-pino-logger')();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// initialize app
const app = express();

// https://github.com/pinojs/pino/blob/HEAD/docs/web.md#express
app.use(pino);
app.use(cors());

// TODO: hack to remove CORS, will need to remove this later
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routes
app.get('/', (req, res) => res.send('Hello world'));

app.get('/api/vacancy-rates/:postcode', (req, res, next) => {
  const { postcode } = req.params;

  const sqmResearch = new SqmResearch();
  sqmResearch.getVacancyRate(postcode)
    .then((data) => res.status(200).json({ vacancyRate: data }))
    .catch((err) => next(err));
});

app.get('/api/constants', (req, res) =>
  res.status(200).json({
    googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
  }));

app.listen(process.env.API_PORT, () => console.log(`Example app listening on port ${process.env.API_PORT}!`));

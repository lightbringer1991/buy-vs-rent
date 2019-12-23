require('dotenv').config();
const express = require('express');
const SqmResearch = require('./src/SqmResearch');
const pino = require('express-pino-logger')();

// initialize app
const app = express();

// https://github.com/pinojs/pino/blob/HEAD/docs/web.md#express
app.use(pino);

// routes
app.get('/', (req, res) => res.send('Hello world'));

app.get('/api/vacancy-rates/:postcode', (req, res, next) => {
  const { postcode } = req.params;

  const sqmResearch = new SqmResearch();
  sqmResearch.getVacancyRate(postcode)
    .then((data) => res.status(200).json({ vacancyRate: data }))
    .catch((err) => next(err));
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

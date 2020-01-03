const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const queryParser = require('express-query-parser');
const Walkscore = require('./src/Walkscore');
const GovernmentFee = require('./src/GovernmentFee');
const pino = require('express-pino-logger')();
const config = require('./src/dotenv');

// initialize app
const app = express();

// https://github.com/pinojs/pino/blob/HEAD/docs/web.md#express
app.use(pino);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(queryParser({
  parseNull: true,
  parseBoolean: true,
}));

// TODO: hack to remove CORS, will need to remove this later
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routes
app.get('/', (req, res) => res.send('Hello world'));

app.get('/api/constants', (req, res) =>
  res.status(200).json({
    googleMapApiKey: config.GOOGLE_MAP_API_KEY,
  }));

app.get('/api/walkscore', (req, res, next) => {
  const { lat, lng } = req.query;
  if (!lat || !lng)
    return res.status(400).json({ message: 'Missing coordinate, please provide `lat` and `lng` in parameters' });

  const walkscore = new Walkscore({
    apiKey: config.WALKSCORE_API_KEY,
  });
  walkscore.get(lat, lng)
    .then((data) => res.status(200).json({ walkscore: data }))
    .catch((err) => next(err));
});

app.use('/api/realestate', require('./src/routes/realestate'));

app.use('/api/suburbs', require('./src/routes/suburbs'));

// GET /api/government-fee?price=100000&state=VIC&isInvestment=true&isFirstHomeBuyer=false
app.get('/api/government-fee', (req, res, next) => {
  const options = _.pick(req.query, ['price', 'state', 'isInvestment', 'isFirstHomeBuyer']);
  GovernmentFee.getGovernmentFee(options)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

app.listen(config.API_PORT, () => console.log(`Example app listening on port ${config.API_PORT}!`));

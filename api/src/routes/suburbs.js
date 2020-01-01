const _ = require('lodash');
const assert = require('assert');
const { Router } = require('express');
const Cache = require('../Cache');
const SqmResearch = require('../SqmResearch');

const router = Router();

// e.g. 'suburb.3000'
const SUBURB_KEY_PREFIX = 'suburb';

const getSuburbDataFromCacheMw = (req, res, next) => {
  const { postcode } = req.params;
  assert(postcode, 'req.params.postcode is required');
  const cachedValue = Cache.get(`${SUBURB_KEY_PREFIX}.${postcode}`);

  if (cachedValue) {
    req.suburb = cachedValue;
  } else {
    // initiate the suburb object
    req.suburb = { postcode };
  }

  // flag further middlewares that this object needs to be cached
  req.shouldCacheData = _.isNil(cachedValue);

  return next();
};

const getSuburbVacancyRatesMw = (req, res, next) => {
  const sqmResearch = new SqmResearch();
  sqmResearch.getVacancyRate(req.suburb.postcode)
    .then((data) => {
      req.suburb.vacancyRate = data;
      next();
    })
    .catch((err) => next(err));
};

const setSuburbDataToCacheMw = (req, res, next) => {
  if (!req.shouldCacheData) return next();

  const { suburb } = req;
  assert(suburb, 'req.suburb is required');
  Cache.set(`${SUBURB_KEY_PREFIX}.${suburb.postcode}`, suburb);
  return next();
};

const returnSuburbMw = (req, res) => res.status(200).json(req.suburb);

// GET /api/suburbs/:postcode
router.get(
  '/:postcode',
  getSuburbDataFromCacheMw,
  getSuburbVacancyRatesMw,
  setSuburbDataToCacheMw,
  returnSuburbMw,
);

module.exports = router;

const assert = require('assert');
const { Router } = require('express');
const RealEstate = require('../RealEstate');

const router = Router();

// GET /api/realestate/search
router.get('/search', (req, res, next) => {
  const { location } = req.query;
  assert(location, 'Please supply location');
  const sold = req.query.sold === 'true';

  RealEstate.getPropertiesAtLocation(location, sold)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// GET /api/realestate/:listingId
router.get('/:listingId', (req, res, next) => {
  const { listingId } = req.params;
  RealEstate.getListingData(listingId)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;

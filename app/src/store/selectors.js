import forEach from 'lodash/forEach';
import get from 'lodash/get';
import size from 'lodash/size';
import { createSelector } from 'reselect';
import { computeDistanceBetween } from 'spherical-geometry-js';

const LAND_SIZE_REGEX = /(\d+)\s*(sqm|m2)/g;

export const getProperty = (state, { listingId }) => state.resources.properties[listingId];

export const getProperties = (state) => state.resources.properties;

export const getPropertyById = createSelector(
  getProperty,
  (property) => {
    if (!property) {
      return property;
    }

    // attempt to find the landSize in description
    if (!get(property, 'landSize')) {
      const { description } = property;

      const match = LAND_SIZE_REGEX.exec(description);
      if (size(match) >= 3) {
        property.landSize = {
          display: `${match[1]} ${match[2]}`,
        };
      }
    }

    return property;
  }
);

/**
 * get all properties that are within the specified radius from a specific listingId
 * getNearbySoldProperties(state, { listingId, radius })
 */
export const getNearbySoldProperties = createSelector(
  getProperty,
  getProperties,
  (state, { radius }) => radius,
  (property, allProperties, radius) => {
    const nearbyProperties = {};
    forEach(allProperties, (prop) => {
      if (prop.listingId !== property.listingId) {
        if (radius > computeDistanceBetween(property.address.location, prop.address.location)) {
          nearbyProperties[prop.listingId] = prop;
        }
      }
    });

    return nearbyProperties;
  }
);

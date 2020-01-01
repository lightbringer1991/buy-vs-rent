import forEach from 'lodash/forEach';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import size from 'lodash/size';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import values from 'lodash/values';
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
 * if maxPropertyCount is defined, return the nearest properties, up to maxPropertyCount
 * getNearbySoldProperties(state, { listingId, radius, maxPropertyCount })
 */
export const getNearbySoldProperties = createSelector(
  getProperty,
  getProperties,
  (state, settings) => settings,
  (property, allProperties, settings) => {
    if (!property) return {};

    const { radius, maxPropertyCount } = settings;
    const nearbyProperties = {};
    forEach(allProperties, (prop) => {
      if (prop.listingId !== property.listingId) {
        const distance = computeDistanceBetween(property.address.location, prop.address.location);

        if (radius > distance) {
          nearbyProperties[prop.listingId] = { ...prop, distance };
        }
      }
    });

    if (!maxPropertyCount) return nearbyProperties;

    const orderedProperties = sortBy(values(nearbyProperties), 'distance');
    return keyBy(take(orderedProperties, maxPropertyCount), 'listingId');
  }
);

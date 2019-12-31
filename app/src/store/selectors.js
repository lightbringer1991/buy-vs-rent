import get from 'lodash/get';
import size from 'lodash/size';

const LAND_SIZE_REGEX = /(\d+)\s*(sqm|m2)/g;

export const getPropertyById = (state, id) => {
  const property = state.resources.properties[id];
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
};

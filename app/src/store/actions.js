import defaults from 'lodash/defaults';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import merge from 'lodash/merge';
import axios from 'axios';
import { UPDATE_RESOURCES } from './reducers';
import { getPropertyById } from './selectors';

export const updateResource = (name, value) => (dispatch) => dispatch({ type: UPDATE_RESOURCES, name, value });

export const obtainPropertyById = (id, skipExtraData = false) => async (dispatch, getState) => {
  const state = getState();
  const existingData = getPropertyById(state, { listingId: id });
  if (get(existingData, 'title')) return existingData;

  // get property data
  const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/realestate/${id}`);
  let walkScore = {};
  let vacancyRate = {};
  const propertyList = {};

  if (!skipExtraData) {
    // get walkScore data
    if (!isEmpty(get(data, 'address.location'))) {
      const { latitude, longitude } = data.address.location;
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/walkscore?lat=${latitude}&lng=${longitude}`);
      walkScore = response.data.walkscore;
    }

    // get vacancy rate data
    if (!isEmpty(get(data, 'address.postcode'))) {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/vacancy-rates/${data.address.postcode}`);
      vacancyRate = response.data.vacancyRate;
    }

    // get nearby sold properties
    const { postcode, suburb, state: geoState } = data.address;
    const location = `${suburb}, ${geoState} ${postcode}`;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/realestate/search?location=${location}&sold=true`);

    response.data.tieredResults.forEach((tierData) => {
      tierData.results.forEach((prop) => {
        propertyList[prop.listingId] = merge({
          listingId: prop.listingId,
          address: { location: { latitude: prop.latitude, longitude: prop.longitude } },
        }, propertyList[prop.listingId]);
      });
    });
  }

  dispatch({
    type: UPDATE_RESOURCES,
    name: 'properties',
    value: defaults(
      { [id]: { ...data, walkScore, vacancyRate } },
      state.resources.properties,
      propertyList,
    ),
  });

  return data;
};

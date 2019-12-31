import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import axios from 'axios';
import { UPDATE_RESOURCES } from './reducers';
import { getPropertyById } from './selectors';

export const updateResource = (name, value) => (dispatch) => dispatch({ type: UPDATE_RESOURCES, name, value });

export const obtainPropertyById = (id) => async (dispatch, getState) => {
  const state = getState();
  const existingData = getPropertyById(state, id);
  if (existingData) return existingData;

  // get property data
  const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/realestate/${id}`);

  // get walkScore data
  let walkScore = {};
  if (!isEmpty(get(data, 'address.location'))) {
    const { latitude, longitude } = data.address.location;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/walkscore?lat=${latitude}&lng=${longitude}`);
    walkScore = response.data.walkscore;
  }

  // get vacancy rate data
  let vacancyRate = {};
  if (!isEmpty(get(data, 'address.postcode'))) {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/vacancy-rates/${data.address.postcode}`);
    vacancyRate = response.data.vacancyRate;
  }

  dispatch({ type: UPDATE_RESOURCES, name: 'properties', value: { ...state.resources.properties, [id]: { ...data, walkScore, vacancyRate } } });

  // get nearby sold properties


  return data;
};

import { UPDATE_RESOURCES } from './reducers';

export const updateResource = (name, value) => (dispatch) => dispatch({ type: UPDATE_RESOURCES, name, value });

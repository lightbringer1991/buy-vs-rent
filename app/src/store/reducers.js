export const UPDATE_RESOURCES = 'resources.update';
export const UPDATE_PROPERTIES = 'resources.properties.update';
export const UPDATE_SUBURBS = 'resources.suburbs.update';

const initialState = {
  resources: {
    constants: {},
    properties: {},
    suburbs: {}, // key by postcode
  },
};

const updateResource = (state, resourceName, action) => ({
  resources: {
    ...state.resources,
    [resourceName]: {
      ...state[resourceName],
      [action.id]: action.value,
    },
  },
});

export default (prevState = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESOURCES: {
      return {
        resources: { ...prevState.resources, [action.name]: action.value },
      };
    }

    case UPDATE_PROPERTIES: return updateResource(prevState, 'properties', action);

    case UPDATE_SUBURBS: return updateResource(prevState, 'suburbs', action);

    default:
      return prevState;
  }
};

export const UPDATE_RESOURCES = 'resources.update';

const initialState = {
  resources: {
    constants: {},
    properties: {},

  },
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESOURCES: {
      return {
        resources: { ...prevState.resources, [action.name]: action.value },
      };
    }

    default:
      return prevState;
  }
};

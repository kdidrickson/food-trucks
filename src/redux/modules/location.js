const SET = 'food-trucks/location/SET';

const initialState = {
  locationValue: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      const {locationValue} = action;

      return {
        ...state,
        locationValue
      };
    default:
      return state;
  }
}

// Action creators

export function set(locationValue) {
  return {
    type: SET,
    locationValue
  };
}

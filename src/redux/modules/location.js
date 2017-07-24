const SET = 'food-trucks/location/SET';
const FETCH_COORDINATES_DATA = 'food-trucks/location/FETCH_COORDINATES_DATA';

const initialState = {
  locationValue: null,
  isFetchingCoordinatesData: false,
  coordinatesError: null,
  coordinates: null
};

export default function reducer(state = initialState, action = {}) {
  const { coordinatesError, status, coordinates } = action;

  switch (action.type) {
    case SET:
      const {locationValue} = action;

      return {
        ...state,
        locationValue
      };
    case FETCH_COORDINATES_DATA :
      switch (status) {
        case 'error' :
          return {
            ...state,
            isFetchingCoordinatesData: false,
            coordinatesError
          };
        case 'success' :
          return {
            ...state,
            isFetchingCoordinatesData: false,
            coordinatesError: null,
            coordinates
          };
        default :
          return {
            ...state,
            isFetchingCoordinatesData: true
          };
      }
      break;
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

export function fetchCoordinatesData({ coordinatesDataError, status, coordinates } = {}) {
  return {
    type: FETCH_COORDINATES_DATA,
    coordinatesDataError,
    status,
    coordinates
  };
}

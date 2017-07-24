// Tracks the state of fetching the food truck data as well as the data itself

const FETCH_FOOD_TRUCK_DATA = 'food-trucks/food-trucks/FETCH_FOOD_TRUCK_DATA';

const initialState = {
  isFetchingFoodTruckData: false,
  foodTruckDataError: null
};

export default function reducer(state = initialState, action = {}) {
  const {type, status, foodTruckDataError, data} = action;

  switch (type) {
    case FETCH_FOOD_TRUCK_DATA :
      switch (status) {
        case 'error' :
          return {
            ...state,
            isFetchingFoodTruckData: false,
            foodTruckDataError
          };
        case 'success' :
          return {
            ...state,
            isFetchingFoodTruckData: false,
            foodTruckDataError: null,
            data
          };
        default :
          return {
            ...state,
            isFetchingFoodTruckData: true
          };
      }
      break;
    default :
      return state;
  }
}

// Action creators

export function fetchFoodTruckData({ isFetchingFoodTruckData, foodTruckDataError, status, data } = {}) {
  return {
    type: FETCH_FOOD_TRUCK_DATA,
    isFetchingFoodTruckData,
    foodTruckDataError,
    status,
    data
  };
}

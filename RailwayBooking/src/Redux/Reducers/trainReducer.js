
import { SEARCH_TRAINS_REQUEST, SEARCH_TRAINS_SUCCESS, SEARCH_TRAINS_FAILURE } from '../Action/TActionTypes';

const initialState = {
  loading: false,
  trains: [],
  error: null,
};

const trainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TRAINS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_TRAINS_SUCCESS:
      return {
        ...state,
        loading: false,
        trains: action.payload,
        error: null,
      };
    case SEARCH_TRAINS_FAILURE:
      return {
        ...state,
        loading: false,
        trains: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default trainReducer;

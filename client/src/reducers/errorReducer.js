import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: {}, 
  status: null,
  id: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {                                       // all the info comes from the server
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:                              // We don't want old errors hanging out so we clear the state
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
import uuid from 'react-uuid';
import { GET_MENU_ITEMS , ADD_MENU_ITEM, DELETE_MENU_ITEM, MENU_ITEMS_LOADING } from '../actions/types';

const initialState = {
  menuItems: [],
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
        loading: false
      };
    case DELETE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter(item => item._id !== action.payload)
      };
    case ADD_MENU_ITEM:
      return {
        ...state,                                         // make a copy of the state
        menuItems: [action.payload, ...state.menuItems]   // take that copy and add to it the item in the payload
      };
    case MENU_ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
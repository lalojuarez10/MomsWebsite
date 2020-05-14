import { GET_MENU_ITEMS , ADD_MENU_ITEM, DELETE_MENU_ITEM, MENU_ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMenuItems = () => dispatch => {
  dispatch(setMenuItemsLoading());
  axios
    .get('/api/menuItems')
    .then(res =>
      dispatch({
        type: GET_MENU_ITEMS,
        payload: res.data
    }))
    .catch(err => 
      dispatch(
        returnErrors(err.response.data, err.response.status)
    ));
};

export const addMenuItem = (menuItem) => (dispatch, getState) => {
  axios
    .post('/api/menuItems', menuItem, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_MENU_ITEM,
        payload: res.data
      }))
    .catch(err => 
      dispatch(
        returnErrors(err.response.data, err.response.status)
      ));  
};

export const deleteMenuItem = (id) => (dispatch, getState) => {
  axios
  .delete(`/api/menuItems/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({
      type: DELETE_MENU_ITEM,
      payload: id
    }))
  .catch(err => 
    dispatch(
      returnErrors(err.response.data, err.response.status)
  ));
};


export const setMenuItemsLoading = () => {
  return {
    type: MENU_ITEMS_LOADING
  }
}
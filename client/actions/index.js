export const SET_SEARCH = 'SET_SEARCH';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SET_RECIPE = 'SET_RECIPE';
export const SET_ADV = 'SET_ADV';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';
import axios from 'axios';
import { browserHistory } from 'react-router';

// Normally you always want to return an object from action creator
  //Redux-thunk allows you to return a function, allowing you direct access to dispatch to:
    // 1) Deplay a dispatch
    // 2) Send dispatch, only if a condition is met
export function signinUser({username, password}) {
  return function(dispatch) {
    axios.post('/user/signin', {username: username, password: password})
      /*If request is good
        1) Update state to show user is auth'd
        2) Save JWT
        3) Allow access to db route
      */
      .then(response => {
        dispatch({type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Please enter a valid Username/Password'));
      });
  }
}

export function signupUser({username, password}) {
  return function(dispatch) {
    axios.post('/user/signup', {username: username, password: password})
      .then(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Sorry! That username is already in use.'))
      });
  }
}

export function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  browserHistory.push('/');
  return {
    type: UNAUTH_USER
  }
}

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search
  }
}

export function fetchRecipes(recipes) {
  return {
    type: FETCH_RECIPES,
    payload: recipes
  }
}

export function setRecipe(object) {
  console.log("setRecipe called", object);
  return {
    type: SET_RECIPE,
    payload: object
  }
}

export function setAdvSearch(advSearch) {
  console.log('advancedSearch', advSearch)
  return {
    type: SET_ADV,
    payload:advSearch
  }
}



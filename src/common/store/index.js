import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AuthJs from './Auth.js';
import hidden from './hidden';
const reducer = combineReducers({
  hidden,
  AuthJs

});
const store = configureStore({
  reducer,
});
export default store;

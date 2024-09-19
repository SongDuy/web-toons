import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Account from './Account/index.js';
import AuthJs from './Auth.js';
import comic from './comic/index.js';
import Comment from './Comment/index.js';
import hidden from './hidden';
import Video from './Video/index.js';
const reducer = combineReducers({
  hidden,
  AuthJs,
  comic,
  Account,
  Comment,
  Video

});
const store = configureStore({
  reducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
export default store;

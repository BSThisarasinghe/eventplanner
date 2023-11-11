import { combineReducers } from 'redux';
import authStore from './auth.reducer';
import eventStore from './event.reducer';
import firebaseStore from './firebase.reducer';
import errorStore from './error.reducer';

export default combineReducers({
  auth: authStore.reducer,
  event: eventStore.reducer,
  firebase: firebaseStore.reducer,
  error: errorStore.reducer
});
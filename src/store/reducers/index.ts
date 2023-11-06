import { combineReducers } from 'redux';
import authStore from './auth.reducer';

export default combineReducers({
  auth: authStore.reducer
});
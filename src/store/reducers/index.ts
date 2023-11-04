import { combineReducers } from 'redux';
import orderStore from './order.reducer';

export default combineReducers({
  order: orderStore.reducer
});
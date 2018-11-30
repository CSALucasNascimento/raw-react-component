import { combineReducers } from 'redux';

import { SWITCH_USER } from './actions';

function user(state={}, action) {
  switch(action.type) {
    case SWITCH_USER:
      return action.user;
    default:
      return state;
  }
}

const BookingSystem = combineReducers({
  user
});

export default BookingSystem;
import { createStore } from 'redux';

import BookingSystem from './reducers';

const store = createStore(BookingSystem, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

export { default as AmplifyBridge } from './AmplifyBridge';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import product from './product';
import checkout from './checkout';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
	product,
	checkout,
});


export default createRootReducer;
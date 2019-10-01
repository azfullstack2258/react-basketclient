import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory} from 'history';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createRootReducer from './reducer';
import rootSaga from './reducer/saga';

export const history = createBrowserHistory();
const navMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

const config = {
	key: 'root',
	storage,
};

const appReducer = persistReducer(config, rootReducer)

const store = createStore(
  appReducer,
	composeWithDevTools(
		applyMiddleware(
		navMiddleware,
		sagaMiddleware,
	))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
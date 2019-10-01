import { all } from 'redux-saga/effects';

import watchProductSaga from './product';
import watchCheckoutSaga from './checkout';

export default function* rootSaga() {
	yield all([
		watchProductSaga(),
		watchCheckoutSaga(),
	]);
}

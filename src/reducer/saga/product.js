import { call, put, takeEvery } from 'redux-saga/effects';

import { actions as productActions } from '../product';
import { loadProducts } from '../../services/product';

export function* loadProductsSaga(action) {
  yield put({ type: productActions.setLoadingStatus, payload: true });

  const response = yield call(loadProducts);
  if (response.ok) {
    const products = yield response.json();
    yield put({ type: productActions.setProducts, payload: products });
  }

  yield put({ type: productActions.setLoadingStatus, payload: false });
}

export default function* watchProductSaga() {
  yield takeEvery(productActions.loadProducts, loadProductsSaga);
}
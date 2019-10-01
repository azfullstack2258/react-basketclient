import { call, put, takeLatest, select } from 'redux-saga/effects';

import { actions as checkoutActions } from '../checkout';
import { applyPromoCode, proceedCheckout } from '../../services/checkout';
import { basketItemsSelector } from '../../selectors';

export function* applyPromoCodeSaga(action) {
  yield put({ type: checkoutActions.setProceedingStatus, payload: true });
  const response = yield call(applyPromoCode, { promoCode: action.payload });

  if (response.ok) {
    const data = yield response.json();
    yield put({ type: checkoutActions.setDiscount, payload: data.amount });
  } else {
    console.log(response)
  }

  yield put({ type: checkoutActions.setProceedingStatus, payload: false });
}

export function* proceedCheckoutSaga(action) {
  yield put({ type: checkoutActions.setProceedingStatus, payload: true });

  const items = yield select(basketItemsSelector);
  const response = yield call(proceedCheckout, {
    basket: items.map(i => ({ sku: i.sku, quantity: i.quantity })),
    cardNumber: action.payload
  });

  if (response.ok) {
    // Remove all basket items
    // ...

    yield put({ type: checkoutActions.initiate });
  }

  yield put({ type: checkoutActions.setProceedingStatus, payload: false });
}

export default function* watchCheckoutSaga() {
  yield takeLatest(checkoutActions.applyPromoCode, applyPromoCodeSaga);
  yield takeLatest(checkoutActions.proceedCheckout, proceedCheckoutSaga);
}
import { createSelector } from 'reselect';

export const basketItemsSelector = state => state.checkout.basketItems;
export const promoCodeSelector = state => state.checkout.promoCode;
export const discountSelector = state => state.checkout.discount;

export const basketItemCountSelector = createSelector(
  basketItemsSelector,
  items => parseInt((items && items.reduce((prevVal, curItem) => prevVal + curItem.quantity, 0)) || 0)
);

export const basketTotalPriceSelector = createSelector(
  basketItemsSelector,
  items => (items && items.reduce((prevVal, curItem) => prevVal + curItem.price * curItem.quantity, 0)) || 0
);

import { createAction, handleActions } from 'redux-actions'

export const actions = {
  addProductItem: 'checkout/ADD_PRODUCT_ITEM',
  removeBasketItem: 'checkout/REMOVE_BASKET_ITEM',
  changeItemQuantity: 'checkout/CHANGE_ITEM_COUNT',
  applyPromoCode: 'checkout/APPLY_PROMOCODE',
  proceedCheckout: 'checkout/PROCEED_CHECKOUT',
  setProceedingStatus: 'checkout/SET_PROCEEDING_STATUS',
  setDiscount: 'checkout/SET_DISCOUNT',
  initiate: 'checkout/INITIATE'
};

export const addProductItem = createAction(actions.addProductItem);
export const removeBasketItem = createAction(actions.removeBasketItem);
export const changeItemQuantity = createAction(actions.changeItemQuantity);
export const applyPromoCode = createAction(actions.applyPromoCode);
export const proceedCheckout = createAction(actions.proceedCheckout);
export const setProceedingStatus = createAction(actions.setProceedingStatus);
export const setDiscount = createAction(actions.setDiscount);

const defaultState = {
  basketItems: [],
  proceeding: false,
  discount: 0,
  promoCode: ''
};

export default handleActions({
  [actions.initiate]: () => defaultState,
  [actions.addProductItem]: (state, action) => {
    let items;
    if (!state.basketItems) {
      items = [{ ...action.payload, quantity: 1 }];
    } else {
      items = state.basketItems.slice();
      const item = items.find(c => c.sku === action.payload.sku);
      if (item) {
        item.quantity < 10 && item.quantity ++;
      } else {
        items.push({ ...action.payload, quantity: 1 });
      }
    }

    return ({ ...state, basketItems: items });
  },
  [actions.setDiscount]: (state, action) => ({ ...state, discount: action.payload }),
  [actions.removeBasketItem]: (state, action) => ({ ...state, basketItems: state.basketItems.filter(bi => bi.sku !== action.payload )}),
  [actions.changeItemQuantity]: (state, action) => {
    const { sku, count } = action.payload;
    const items = state.basketItems.slice();
    const item = items.find(c => c.sku === sku);
    item.quantity = count;
    return ({ ...state, basketItems: items });
  },
  [actions.setProceedingStatus]: (state, action) => ({ ...state, proceeding: action.payload }),
}, defaultState);

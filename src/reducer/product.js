import { createAction, handleActions } from 'redux-actions'

export const actions = {
  loadProducts: 'product/LOAD_PRODUCTS',
  setLoadingStatus: 'product/SET_LOADING_STATUS',
  setProducts: 'product/SET_PRODUCTS'
};

export const loadProducts = createAction(actions.loadProducts);
export const setLoadingStatus = createAction(actions.setLoadingStatus);
export const setProducts = createAction(actions.setProducts);

const defaultState = {
  products: [],
  loading: false
};

export default handleActions({
  [actions.setLoadingStatus]: (state, action) => ({ ...state, loading: action.payload }),
  [actions.setProducts]: (state, action) => ({ ...state, products: action.payload })
}, defaultState);

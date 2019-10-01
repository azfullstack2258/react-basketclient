import { API_URL } from '../config';

export function applyPromoCode(promoCode) {
  return fetch(API_URL + '/promocodesending', {
    method: 'POST',
    body: JSON.stringify({ promoCode })
  });
}

export function proceedCheckout(data) {
  return fetch(API_URL + '/checkoutendpoint', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

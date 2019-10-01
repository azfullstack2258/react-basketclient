import { API_URL } from '../config';

export function loadProducts() {
  return fetch(API_URL + '/products', {
    method: 'GET',
    mode: 'no-cors'
  });
}

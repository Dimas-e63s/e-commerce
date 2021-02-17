export function setCartToLS(state) {
  localStorage.setItem('cart', JSON.stringify(state.cart))
}
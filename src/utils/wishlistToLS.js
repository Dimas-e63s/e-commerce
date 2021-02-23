const name = 'wishlist';
function stringify(arr) {
  return JSON.stringify(arr);
}

export function setWishlistToLS(wishlist) {
  localStorage.setItem(name, stringify(wishlist));
}

export function removeWishlistFromLS() {
  localStorage.removeItem(name);
}

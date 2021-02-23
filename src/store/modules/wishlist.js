import { setWishlistToLS, removeWishlistFromLS } from '@/utils/wishlistToLS.js';
export default {
  namespaced: true,
  state: {
    wishlist: JSON.parse(localStorage.getItem('wishlist')) ?? []
  },
  mutations: {
    ADD_ITEM(state, id) {
      state.wishlist.push(id);
      setWishlistToLS(state.wishlist);
    },
    DELETE_ITEM(state, id) {
      state.wishlist = state.wishlist.filter(item => item.id !== id);
      removeWishlistFromLS();
      setWishlistToLS(state.wishlist);
    }
  },
  getters: {
    wishlist: state => state.wishlist,
    isItemInWishlist: state => id =>
      !!Object.keys(state.wishlist).find(key => state.wishlist[key].id === id)
  }
};

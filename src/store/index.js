import { createStore, createLogger } from 'vuex';
import productsModule from './modules/products/index';
import authModule from './modules/auth';
import categoriesModule from './modules/categories';
import cartModule from './modules/cart';
import orderModule from './modules/order';
import wishlistModule from './modules/wishlist';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state: {
    hasFocus: null
  },
  getters: {
    hasFocus: state => state.hasFocus
  },
  mutations: {
    focus(state) {
      state.hasFocus = true;
    },
    blur(state) {
      state.hasFocus = false;
    }
  },
  actions: {},
  modules: {
    products: productsModule,
    auth: authModule,
    categories: categoriesModule,
    cart: cartModule,
    order: orderModule,
    wishlist: wishlistModule
  }
});

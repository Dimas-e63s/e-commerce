import ProductService from '@/services/ProductService'
import {setCartToLS} from '@/utils/setCartToLS.js'

export default {
  namespaced: true,
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) ?? {}
  },
  mutations: {
    ADD_PRODUCT_TO_CART(state, {id, ...product}) {
      state.cart[id] = product
      setCartToLS(state)
    },
    INCREASE_QUANTITY(state, id) {
      state.cart[id].quantity++
      setCartToLS(state)
    },
    DELETE_PRODUCT_FROM_CART(state, id) {
      delete state.cart[id]
      setCartToLS(state)
    },
    DECREASE_QUANTITY(state, id) {
      state.cart[id].quantity--
      setCartToLS(state)
    }
  },
  getters: {
    productsCart: (state) => state.cart,
    getProductInCart: (state) => (id) => state.cart[id],
    getProductIdxByIdFromCart: (state) => (id) => state.productsCart.findIndex(pr => pr.id == id)
  },
  actions: {
    async loadProductsFromCart({commit}, payload) {
      try {
        const query = Object.keys(payload).map(r => `id=${r}`).join('&')
        const {data} = await ProductService.getProducts(query)
        const result = data.map(product => ({
          quantaty: payload[product.id],
          ...product
        }))
        commit('SET_PRODUCTS_CART', result)
      } catch (e) {
        console.log(e.message);
      }
    },
    updateProductInCart({commit, getters}, {id, quantaty}) {
      const idx = getters.getProductIdxByIdFromCart(id)
      commit('UPDATE_PRODUCT_QUANTATY', {idx, quantaty})
    },
    async update({commit, getters}, payload) {
      try {
        const {data} = await ProductService.updateProduct(payload)
        console.log(data);
        const idx = getters.getProductIdxByIdFromCart(payload.id)
        commit('UPDATE_PRODUCT', {payload, idx})
      } catch (e) {
        console.log(e.message);
      }
    },
  }
}
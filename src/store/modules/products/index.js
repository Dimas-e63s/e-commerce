import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state() {
    return {
      productsCart: [],
      products: [],
    }
  },
  getters: {
    products: (state) => state.products,
    isAnyProducts: (state) => state.products.length > 0,
    productsCart: (state) => state.productsCart,
    getProductById: (state) => (id) => state.products.find(pr => pr.id == id),
    getProductIdxById: (state) => (id) => state.products.findIndex(pr => pr.id == id),
    getProductIdxByIdFromCart: (state) => (id) => state.productsCart.findIndex(pr => pr.id == id)
  },
  mutations,
  actions
}

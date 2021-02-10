import ProductService from '@/services/ProductService'

export default {
  namespaced: true,
  state() {
    return {
      productsCart: [],
      products: [],
      categories: []
    }
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_PRODUCT(state, product) {
      state.products.push(product)
    },
    SET_PRODUCTS_CART(state, products) {
      state.productsCart = products
    },
    SET_PRODUCT_CART(state, product) {
      state.productsCart.push(product)
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    DELETE_PRODUCT(state, productIdx) {
      state.productsCart.splice(productIdx, 1)
    },
    UPDATE_PRODUCT_QUANTATY(state, {idx, quantaty}) {
      state.productsCart[idx].quantaty = quantaty
    }
  },
  getters: {
    products: (state) => state.products,
    isAnyProducts: (state) => state.products.length > 0,
    productsCart: (state) => state.productsCart,
    categories: (state) => state.categories,
    getProductById: (state) => (id) => state.products.find(pr => pr.id == id),
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
    async loadAllProducts({commit}) {
      try {
        const {data} = await ProductService.getProducts()
        commit('SET_PRODUCTS', data)
      } catch (e) {
        console.log(e.message);
      }
    },
    async loadProductsPerPage({ commit }, page) {
      try {
        const { data, headers } = await ProductService.getProductsByPage({
          page,
          limit: 5
        })
        console.log(headers['x-total-count']);
        commit('SET_PRODUCTS', data)
        return Math.ceil(+headers['x-total-count'] / 5)
      } catch (e) {
        
      }
    },
    update({commit, getters}, {id, quantaty}) {
      const idx = getters.getProductIdxByIdFromCart(id)
      commit('UPDATE_PRODUCT_QUANTATY', {idx, quantaty})
    },
    delete({commit, getters}, id) {
      const idx = getters.getProductIdxById(id)
      commit('DELETE_PRODUCT', idx)
    },
    async loadCategories({commit}) {
      try {
        const { data } = await ProductService.getCategories()
        commit('SET_CATEGORIES', data)
      } catch (error) {
        
      }
    },
    async addProduct({commit}, product) {
      commit('SET_PRODUCT', product)
    }
  }
}

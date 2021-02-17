import ProductService from '@/services/ProductService'
import {format} from '@/utils/formatter.js'

export default {
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
        commit('SET_PRODUCTS', format(data))
      } catch (e) {
        console.log(e.message);
      }
    },
    async loadProductById({ commit }, id) {
      try {
        const { data } = await ProductService.getProduct(id)
        commit('SET_PRODUCT', {...data, id})
      } catch (e) {
        
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
    async delete({commit, getters}, id) {
      try {
        await ProductService.deleteProduct(id)
        const idx = getters.getProductIdxById(id)
        commit('DELETE_PRODUCT', idx)
      } catch (e) {
        console.log(e.message);
      }
    },
    async addProduct({commit}, product) {
      try {
        const { data } = await ProductService.createProduct(product)
        commit('SET_PRODUCT', format(data))
      } catch (e) {
        console.log(e.message);
      }
      // commit('SET_PRODUCT', product)
    },
  }
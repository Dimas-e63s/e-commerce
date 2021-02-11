import { createStore, createLogger } from 'vuex'
import productsModule from './modules/products/index'
import authModule from './modules/auth'

const plugins = []

if(process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products: productsModule,
    auth: authModule
  }
})

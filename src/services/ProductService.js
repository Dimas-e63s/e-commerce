import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'

export const apiClient = axios.create({
  baseURL: 'https://e-commerce-f32e0-default-rtdb.firebaseio.com/',
})

apiClient.defaults.params = {}

apiClient.interceptors.request.use(async config => {
  console.log(store.getters['auth/isAuthenticated']);
  if (!store.getters['auth/isAuthenticated']) {
    console.log('get called');
    return config
  }
  if(store.getters['auth/isExpired']) {
    console.log(store.getters['auth/isExpired']);
    await store.dispatch('auth/refresh')
  }

  config.params['auth'] = store.getters['auth/token']
  console.log(config);
  
  return config
})

apiClient.interceptors.response.use(null, error => {
  if(error.response.status === 401) {
    store.commit('auth/LOGOUT')
    router.push({name: 'auth'})
  }

  return Promise.reject(error)
})

export default {
  getProducts() {
    return apiClient.get('/products.json')
  },
  getProductsByPage({page, limit}) {
    return apiClient.get(`/products?_page=${page}&_limit=${limit}`)
  },
  getProduct(id) {
    return apiClient.get(`/products/${id}.json`)
  },
  updateProduct({id, ...count}) {
    return apiClient.patch(`/products/${id}.json`, count)
  },
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`)
  },
  getCategories() {
    return apiClient.get('/categories.json')
  },
  createCategory(category) {
    return apiClient.post('/categories.json', category)
  },
  createProduct(category) {
    return apiClient.post('/products.json', category)
  },
  deleteCategory(id) {
    return apiClient.delete(`/categories/${id}.json`)
  },
  createUser(id, body) {
    return apiClient.put(`users/${id}.json`, body)
  },
  getUser(id) {
    return apiClient.get(`users/${id}.json`)
  },
  createOrder(order) {
    debugger
    return apiClient.post('/orders.json', order)
  },
  createOrderToUser({id, ...order}) {
    debugger
    return apiClient.post(`/users/${id}/orders.json`, order)
  }
}
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://e-commerce-f32e0-default-rtdb.firebaseio.com/',
  headers: {
    "Content-Type": "application/json"
  }
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
  updateProduct(payload) {
    return apiClient.put(`/products/${payload.id}`, payload)
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
  }
}
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3004/',
  headers: {
    "Content-Type": "application/json"
  }
})

export default {
  getProducts(ids = '') {
    return apiClient.get('/products?' + ids)
  },
  getProductsByPage({page, limit}) {
    return apiClient.get(`/products?_page=${page}&_limit=${limit}`)
  },
  updateProduct(payload) {
    return apiClient.put(`/products/${payload.id}`, payload)
  },
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`)
  },
  getCategories() {
    return apiClient.get('/categories')
  },
  createCategory(category) {
    return apiClient.post('/categories', category)
  },
  deleteCategory(id) {
    return apiClient.delete(`/categories/${id}`)
  },
}
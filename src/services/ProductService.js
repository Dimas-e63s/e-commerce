import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/'
})

export default {
  getProducts(ids = '') {
    return apiClient.get('/products?' + ids)
  },
  getCategories() {
    return apiClient.get('/categories')
  }
}
export default {
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
  SET_CATEGORY(state, category) {
    state.categories.push(category)
  },
  DELETE_PRODUCT(state, productIdx) {
    state.productsCart.splice(productIdx, 1)
  },
  DELETE_CATEGORY(state, idx) {
    state.categories.splice(idx, 1)
  },
  UPDATE_PRODUCT_QUANTATY(state, {idx, quantaty}) {
    state.productsCart[idx].quantaty = quantaty
  },
  UPDATE_PRODUCT(state, {idx, payload}) {
    state.products[idx] = payload
  }
}
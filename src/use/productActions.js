import { useStore } from 'vuex'
import { computed } from 'vue'

export function useProductActions( id ) {
  const store = useStore()
  const product = computed(() => store.getters['products/getProductById'](id))

  const productQuantityInCart = computed(() => {
    const productInCart = computed(() => store.getters['cart/getProductInCart'](id))
    return productInCart.value ? productInCart.value.quantity : 0
  })


  const addToCart = () => {
    if(!productQuantityInCart.value) {
      const payload = {
        img: product.value.img,
        title: product.value.title,
        price: product.value.price,
        quantity: 1
      }
      store.commit('cart/ADD_PRODUCT_TO_CART', {...payload, id})
    } else if(productQuantityInCart.value < product.value.count) {
      store.commit('cart/INCREASE_QUANTITY', id) 
    }
  }
  
  const decreaseAmount = () => {
    if(productQuantityInCart.value === 1) {
      return store.commit('cart/DELETE_PRODUCT_FROM_CART', id)
    } else if(productQuantityInCart.value) {
      store.commit('cart/DECREASE_QUANTITY', id) 
    }
  }

  const deleteFromCart = () => store.commit('cart/DELETE_PRODUCT_FROM_CART', id)

  return {
    decreaseAmount,
    addToCart,
    productQuantityInCart,
    deleteFromCart
  }
}
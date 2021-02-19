import {useStore} from 'vuex'
import {currency} from '@/utils/currency.js'
import {computed} from 'vue'

export function useCartTotal() {
  const store = useStore()
  const products = computed(() => store.getters['cart/productsCart'])
  
  const total = computed(() => 
  Object.keys(products.value)
    .reduce((acc, key) => 
      acc += products.value[key].quantity *  products.value[key].price, 0)
  )

  const totalPrice = currency(total.value)

  return {
    totalPrice,
    products,
    total
  }
}
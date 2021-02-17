<template>
  <div class="container">
    <h3 
      v-if="isCartEmpty"
      class="text-center"
    >В корзине пока ничего нет</h3>
    <CartTable v-else/>
  </div>
</template>

<script>
import CartTable from '@/components/cart/CartTable.vue';
import {useStore} from 'vuex'
import { computed, onMounted } from 'vue';

const CART_MODEL = {
  '2': 3,
  '5': 1
}

export default {
  components: {
    CartTable
  },
  setup() {
    const store = useStore()

    // onMounted(async() => {
    //   await store.dispatch('products/loadProductsFromCart', CART_MODEL)
    // })

    const products = computed(() => store.getters['cart/productsCart'])
    const isCartEmpty = computed(() => Object.keys(products.value).length === 0)

    return {
      products,
      isCartEmpty
    }
  }
}
</script>

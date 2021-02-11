<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 
      v-if="products.length === 0"
      class="text-center"
    >В корзине пока ничего нет</h3>
    <CartTable 
      v-else
      :products="products" 
    />
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

    onMounted(async() => {
      await store.dispatch('products/loadProductsFromCart', CART_MODEL)
    })

    const products = computed(() => store.getters['products/productsCart'])

    return {
      products,
    }
  }
}
</script>

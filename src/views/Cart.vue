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
import { computed } from 'vue';

export default {
  components: {
    CartTable
  },
  setup() {
    const store = useStore()

    const products = computed(() => store.getters['cart/productsCart'])
    const isCartEmpty = computed(() => Object.keys(products.value).length === 0)

    return {
      products,
      isCartEmpty
    }
  }
}
</script>

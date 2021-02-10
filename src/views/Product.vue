<template>
  <div 
    v-if="product"
    class="card" 
  >
    <h1 class="card-title">{{ product.title }}</h1>
    <img :src="product.img" />
    <p>Категория: <strong>Название категории</strong></p>
    <button class="btn">
      {{ currency(product.price) }}
    </button>
    <!-- <div class="product-controls in-card">
      <button class="btn danger">-</button>
      <strong>12</strong>
      <button class="btn primary">+</button>
    </div> -->
  </div>
  <h3 
    v-else
    class="text-center text-white" 
  >
    Товара не найден.
  </h3>
</template>

<script>
import {currency} from '@/utils/currency.js';
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const id = route.params.id

    const product = computed(() => store.getters['products/getProductById'](id))

    return {
      product,
      currency
    }
  }
}
</script>

<style scoped>

</style>
<template>
    <div class="products-table">
      <div class="product-card"
        v-for="product in allProducts"
        :key="product.id"
      >
        <div class="product-img"  @click="$router.push(`/product/${product.id}`)">
          <img :src="product.img" :alt="product.title">
        </div>
        <h4 class="product-title">{{ product.title }}</h4>
        <div class="text-center">
          <div v-if="product.count === 0">Нет в наличии</div>
          <template v-else>
            <button 
              v-if="!CART_MODEL[product.id]"
              class="btn"
              @click="addProduct(product)"
            >{{ currency(product.price) }}</button>
            <div 
              v-else
              class="product-controls">
              <button 
                class="btn danger"
                @click="deleteProduct(product)"
              >-</button>
              <strong>{{CART_MODEL[product.id]}}</strong>
              <button 
                class="btn primary"
                @click="addProduct(product)"
                :disabled="CART_MODEL[product.id] === product.count"
              >+</button>
            </div>

          </template>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import {currency} from '@/utils/currency.js';
export default {
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  setup(props) {
      const store = useStore()
      const CART_MODEL = reactive({})
      onMounted(async () => {
        await store.dispatch('products/loadAllProducts')
      })

      const allProducts = computed(() => 
        store.getters['products/products']
          .filter(prod => {
            if(props.filters.search) {
              return prod.title.includes(props.filters.search.toLowerCase())
            }
            return prod
          })
          .filter(prod => {
            if(props.filters.category) {
              return prod.category === props.filters.category
            }
            return prod
          })
          .sort((el, nextEl) => nextEl.count - el.count)
      )

      const addProduct = (product) => {
        CART_MODEL[product.id] ? CART_MODEL[product.id]++ :CART_MODEL[product.id] = 1
      }

      const deleteProduct = (product) => {
        CART_MODEL[product.id] === 0  ? delete CART_MODEL[product.id] :CART_MODEL[product.id]--
      }

      return {
        allProducts,
        currency,
        addProduct,
        CART_MODEL,
        deleteProduct
      }     
  }
}
</script>

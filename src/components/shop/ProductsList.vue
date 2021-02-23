<template>
  <div class="products-table">
    <div class="product__card" 
      v-for="product in allProducts"
      :key="product.id"
    >
      <div class="product__img"  @click="$router.push(`/product/${product.id}`)">
        <img :src="product.img" :alt="product.title">
      </div>
      <h4 class="product__title font-poppins">{{ product.title }}</h4>
      <div class="product__price">
        <span>{{ currency(product.price) }}</span>
      </div>
      <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
    </div> 
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import StarRating from 'vue-star-rating'
import { useStore } from 'vuex'
import {currency} from '@/utils/currency.js';
export default {
  components: {
    StarRating,
  },
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const rating = ref(3)
    onMounted(async () => {
      await store.dispatch('products/loadAllProducts')
    })

    const allProducts = computed(() => 
      store.getters['products/products']
        .filter(prod => {
          if(props.filters.search) {
            return prod.title
              .toLowerCase()
              .includes(props.filters.search.toLowerCase())
          }
          return prod
        })
        .filter(prod => {
          if(props.filters.category) {
            return prod.category === props.filters.category
          }
          return prod
        })
        .filter(prod => {
          if(props.filters.price) {
            return prod.price > props.filters.price[0] && prod.price < props.filters.price[1]
          }
          return prod
        })
        .sort((el, nextEl) => nextEl.count - el.count)
    )

    return {
      allProducts,
      currency,
      rating
    }     
  }
}
</script>

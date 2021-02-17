<template>
    <div class="products-table w-full">
       <div class="product-card" 
        v-for="product in allProducts"
        :key="product.id"
      >
        <div class="product-img"  @click="$router.push(`/product/${product.id}`)">
          <img :src="product.img" :alt="product.title">
        </div>
        <h4 class="product-title font-poppins">{{ product.title }}</h4>
        <div class="product-price">
          <span>{{ currency(product.price) }}</span>
        </div>
        <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
      </div> 
    </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import StarRating from 'vue-star-rating'
import { useStore } from 'vuex'
import {currency} from '@/utils/currency.js';
export default {
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  components: {
    StarRating,
  },
  setup(props) {
      const store = useStore()
      const CART_MODEL = reactive({})
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

      const addProduct = (product) => {
        CART_MODEL[product.id] ? CART_MODEL[product.id]++ :CART_MODEL[product.id] = 1
      }

      const deleteProduct = (product) => {
        CART_MODEL[product.id] === 0  ? delete CART_MODEL[product.id] :CART_MODEL[product.id]--
      }

      const setRating = (rating) => {
      rating.value = rating;
    }

      return {
        allProducts,
        currency,
        addProduct,
        CART_MODEL,
        deleteProduct,
        setRating,
        rating
      }     
  }
}
</script>

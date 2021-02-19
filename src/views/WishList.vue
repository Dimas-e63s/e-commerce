<template>
   <table class="w-full font-roboto border-collapse table-fixed tracking-wide mb-24">
      <thead>
        <tr>
          <th class="border py-8 w-4/12">Products</th>
          <th class="border py-8 w-2/12">Color &#38; Size</th>
          <th class="border py-8 w-2/12">Price</th>
          <th class="border py-8 w-4/12"></th>
        </tr>
      </thead>
      <tbody>
        <WishItem 
            v-for="product in products"
            :key="product.id"
            :product="product"
      />
      </tbody>
    </table>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import WishItem from '../components/wishlist/WishItem.vue'
export default {
  components: {
    WishItem,
  },
  setup() {
    const store = useStore()
    const products = computed(() => store.getters['products/productsCart'])

    return {
      products
    }
  }      
}
</script>

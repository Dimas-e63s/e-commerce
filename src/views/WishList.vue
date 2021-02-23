<template>
   <table class="table font-roboto mb-24">
      <thead>
        <tr>
          <th class="table__header table__header--main">Products</th>
          <th class="table__header">Color &#38; Size</th>
          <th class="table__header">Price</th>
          <th class="table__header--main"></th>
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
    const products = computed(() => store.getters['cart/productsCart'])

    return {
      products
    }
  }      
}
</script>

<style scoped>
.table {
  width: 100%;

  table-layout: fixed;
  border-collapse: collapse;

  letter-spacing: 0.025em;
  border-width: 1px;
}

.table__header {
  width: 16.666667%;
  padding: 2rem 0;

  border-width: 1px;
}

.table__header--main {
  width: 33.333333%;
}
</style>

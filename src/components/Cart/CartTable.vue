<template>
    <table class="table font-roboto">
      <thead>
        <tr>
          <th class="table__header table__header--main">Products</th>
          <th class="table__header">Color &#38; Size</th>
          <th class="table__header">Quantaty</th>
          <th class="table__header">Price</th>
          <th class="table__header">Total</th>
        </tr>
      </thead>
      <tbody>
        <CartItem 
          v-for="(product, key) in products"
          :key="key"
          :product="product"
          :id="key"
      ></CartItem>
      </tbody>
    </table>
    <div class="table__footer">
      <button 
        class="button button--success"
        @click="$router.push('/')"
      >Continue Shopping</button>
    </div>
    <CartForm :totalPrice="totalPrice"/>
</template>

<script>
import { ref } from "vue";
import CartItem from "@/components/cart/CartItem.vue"
import { useCartTotal } from '@/use/cartTotal.js'
import CartForm from '@/components/cart/CartForm.vue'
export default {
  components: {
    CartItem,
    CartForm,
  },
  setup() {
    const model = ref('Select Country')
    const { totalPrice, products } = useCartTotal()
    
    return {
      totalPrice,
      model,
      products
    }
  }
};
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

.table__footer {
  text-align: right;
  padding: 1rem 0.75rem;
  border-width: 1px;
  border-top-width: 0;
}

.button {
  margin-top: 0.5rem;
  padding: .5rem 2.5rem;

  border-width: 1px;
  text-transform: uppercase;
  line-height: 1.5rem;
}

.button--success {
  background-color: #10B981;
  color: #fff;
}
</style>

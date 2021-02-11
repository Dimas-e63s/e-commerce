<template>
  <div class="card">
    <table class="w-full font-roboto border-collapse border table-fixed">
      <thead>
        <tr class="p-y-8">
          <th class="border p-y-8 w-4/12">Products</th>
          <th class="border p-y-8 w-2/12">Color &#38; Size</th>
          <th class="border p-y-8 w-2/12">Quantaty</th>
          <th class="border p-y-8 w-2/12">Price</th>
          <th class="border p-y-8 w-2/12">Total</th>
        </tr>
      </thead>
      <tbody>
        <CartItem 
            v-for="product in products"
            :key="product.id"
            :product="product"
      />
      </tbody>
    </table>
    <hr />
    <p class="text-right"><strong>Всего: {{totalPrice}} руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import { computed } from "vue";
import CartItem from "@/components/cart/CartItem.vue";
export default {
  components: {
    CartItem,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const totalPrice = computed(() => props.products.reduce((acc, next) => acc+= next.quantaty * next.price, 0))

    return {
      totalPrice,
    }
  }
};
</script>

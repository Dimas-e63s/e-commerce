<template>
  <tr>
    <td class="border-l border-b flex align-center">
      <img class="w-36" :src="product.img" :alt="product.title">
      <h3 class="ml-4 my-auto">{{ product.title }}</h3>
    </td>
    <td class="border text-center">
      <p>color: black</p>
      <p>size: XL</p>
    </td>
    <td class="border text-center">
      <!-- <input 
        class="inline-block w-6 outline-none w-8 border" 
        type="number"
        v-model="product.quantity"
      > -->
      <button class="px-2" @click="addToCart">+</button>
        <small class="inline-block w-12 border">{{ product.quantity }}</small>
      <button class="px-2" @click="decreaseAmount">-</button>
    </td>
    <td class="border text-center">{{ currency(product.price) }}</td>
    <td class="border text-center relative">
      {{ totalPrice }}
      <font-awesome-icon 
        class="right-2 absolute cursor-pointer" 
        :icon="['far', 'times-circle']" 
        size="lg"
        @click="deleteFromCart"
      />
    </td>
  </tr>
</template>

<script>
import {currency} from '@/utils/currency.js'
import { computed } from 'vue'
import {useProductActions} from '@/use/productActions.js'
export default {
  emits: ['change'],
  props: {
    product: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props);
    const {addToCart, decreaseAmount, deleteFromCart } = useProductActions(props.id)

    const totalPrice = computed(() => currency(props.product.price * props.product.quantity))
    return {
      addToCart,
      decreaseAmount,
      currency,
      totalPrice,
      deleteFromCart
    }
  }
}
</script>

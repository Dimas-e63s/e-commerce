<template>
   <tr>
    <td class="border-l border-b flex align-center">
      <img class="w-36  py-8 pl-6" :src="product.img" :alt="product.title">
      <h3 class="ml-4 my-auto">{{ product.title }}</h3>
    </td>
    <td class="border text-center">
      <p>color: black</p>
      <p>size: XL</p>
    </td>
    <td class="border text-center">{{ currency(product.price) }}</td>
    <td class="border text-center relative align-middle">
      <button class="bg-green-500 w-36 h-10 text-white uppercase">Add to Cart</button>
        <font-awesome-icon 
            class="text-center absolute top-24 right-2 cursor-pointer" 
            :icon="['far', 'times-circle']" 
            size="lg"
            @click="deleteProduct"
        />
    </td>
  </tr>
</template>

<script>
import {currency} from '@/utils/currency.js'
import { onMounted } from 'vue'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    const deleteProduct = () => {}
    return {
      currency,
      deleteProduct
    }
  }      
}
</script>

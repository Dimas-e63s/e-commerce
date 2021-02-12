<template>
  <tr>
    <td class="border-l border-b flex align-center">
      <img class="w-36" :src="product.img" :alt="product.title">
      <h3 class="ml-4 my-auto">{{ product.title }}</h3>
    </td>
    <td class="border text-center">
      <p>color: black</p>
      <p>size: XL</p>
      <!-- <p class="text-center">size: XL</p> -->
    </td>
    <td class="border text-center">
      <input 
        class="inline-block w-6 outline-none w-8 border" 
        type="number"
        v-model="product.quantaty"
      >
      <!-- <button class="btn primary" @click="increment(product)">+</button>
        {{ product.quantaty }} шт.
      <button class="btn danger" @click="decrement(product)">-</button> -->
    </td>
    <td class="border text-center">{{ currency(product.price) }}</td>
    <td class="border text-center relative">
      {{ total }}
      <font-awesome-icon 
        class="right-2 absolute cursor-pointer" 
        :icon="['far', 'times-circle']" 
        size="lg"
        @click="deleteProduct"
      />
    </td>
  </tr>
</template>

<script>
import { useStore } from 'vuex'
import {currency} from '@/utils/currency.js'
import { computed } from 'vue'
export default {
  emits: ['change'],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const increment = el => {
      if(el.count > el.quantaty) {
        store.dispatch('products/updateProductInCart', {
          id: el.id,
          quantaty: ++el.quantaty
        })
      }
    }
    const decrement = el => {
      if(el.quantaty > 1) {
        store.dispatch('products/updateProductInCart', {
          id: el.id,
          quantaty: --el.quantaty
        })  
      } else {
         store.dispatch('products/delete', el.id)  
      }
    }

    const deleteProduct = () => store.dispatch('products/delete', props.product.id)

    const total = computed(() => currency(props.product.price * props.product.quantaty))

    return {
      increment,
      decrement,
      currency,
      total,
      deleteProduct
    }
  }
}
</script>

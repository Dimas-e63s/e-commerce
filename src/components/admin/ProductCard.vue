<template>
  <tr>
    <td>{{ product.id }}</td>
    <td>{{ product.title }}</td>
    <td>
      <img :src="product.img" :alt="product.title">
    </td>
    <td>{{ currency(product.price) }}</td>
    <td>{{ categories.find(c => product.category === c.type).title }}</td>
    <td>{{ product.count }}</td>
    <td>
      <router-link 
        v-slot="{navigate}" 
        custom
        :to="{name: 'productEdit', params: {id: product.id}}"
      >
        <button class="btn primary" @click="navigate">Открыть</button>
      </router-link>
    </td>
  </tr>
</template>

<script>
import {currency} from '@/utils/currency.js'
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      currency
    }
  }      
}
</script>

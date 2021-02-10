<template>
  <tr 
    v-for="prod in products"
    :key="prod.id"
  >
    <td>{{ prod.id }}</td>
    <td>{{ prod.title }}</td>
    <td>
      <img :src="prod.img" :alt="prod.title">
    </td>
    <td>{{ currency(prod.price) }}</td>
    <td>{{ categories.find(c => prod.category === c.type).title }}</td>
    <td>{{ prod.count }}</td>
    <td>
      <router-link 
        v-slot="{navigate}" 
        custom
        :to="{name: 'product', params: {id: prod.id}}"
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
    products: {
      type: Array,
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

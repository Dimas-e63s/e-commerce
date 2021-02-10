<template>
  <tr v-for="r in products">
    <td>{{ r.id }}</td>
    <td>{{ r.title }}</td>
    <td>
      <img :src="r.img" :alt="r.title">
    </td>
    <td>{{ currency(r.price) }}</td>
    <td>{{ categories.find(c => r.category === c.type).title }}</td>
    <td>{{ r.count }}</td>
    <td>
      <router-link 
        v-slot="{navigate}" 
        custom
        :to="{name: 'product', params: {id: r.id}}"
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

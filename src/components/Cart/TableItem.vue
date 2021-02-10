<template>
    <tr>
          <td>{{ product.title }}</td>
          <td>
            <button class="btn primary" @click="increment(product)">+</button>
            {{ product.quantaty }} шт.
            <button class="btn danger" @click="decrement(product)">-</button>
          </td>
          <td>{{ product.price }} руб.</td>
        </tr>
</template>

<script>
import { useStore } from 'vuex'
export default {
  emits: ['change'],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {

   const store = useStore()

      const increment = el => {
        if(el.count > el.quantaty) {
          store.dispatch('products/update', {
            id: el.id,
            quantaty: ++el.quantaty
          })
        }
      }
      const decrement = el => {
        if(el.quantaty > 1) {
          store.dispatch('products/update', {
            id: el.id,
            quantaty: --el.quantaty
          })  
        } else {
           store.dispatch('products/delete', el.id)  
        }
      }

    return {
      increment,
      decrement
    }
  }
}
</script>

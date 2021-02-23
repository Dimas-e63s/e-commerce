<template>
  <tr class="item">
    <td class="item__image-container">
      <img class="item__image" :src="product.img" :alt="product.title">
      <h3 class="item__title">{{ product.title }}</h3>
    </td>
    <td class="item__size">
      <p>color: black</p>
      <p>size: XL</p>
    </td>
    <td>
      <button class="item__actions" @click="addToCart">+</button>
        <small class="item__quantity">{{ product.quantity }}</small>
      <button class="item__actions" @click="decreaseAmount">-</button>
    </td>
    <td class="item__price">{{ currency(product.price) }}</td>
    <td class="item__price item__price--relative">
      {{ totalProductPrice }}
      <font-awesome-icon 
        class="item__icon" 
        :icon="['far', 'times-circle']" 
        size="lg"
        @click="deleteFromCart"
      />
    </td>
  </tr>
</template>

<script>
import { computed } from 'vue'
import {currency} from '@/utils/currency.js'
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
    const {addToCart, decreaseAmount, deleteFromCart } = useProductActions(props.id)

    const totalProductPrice = computed(() => currency(props.product.price * props.product.quantity))
    return {
      addToCart,
      decreaseAmount,
      currency,
      totalProductPrice,
      deleteFromCart,
    }
  }
}
</script>

<style scoped>
.item {
  text-align: center;
  border-width: 1px;
}

.item__image-container {
  display: flex;
  align-items: center;
  border-right-width: 1px;
}

.item__image {
  width: 9rem;
  padding: 2rem 0;
  padding-left: 1.5rem;
}

.item__title {
  margin: 0 auto;
  margin-left: 1rem;
}

.item__size {
  border-right-width: 1px;
}

.item__actions {
  padding: 0 .5rem;
}

.item__quantity {
  display: inline-block;
  width: 3rem;
  border-width: 1px;
}

.item__price {
  border-width: 1px;
}

.item__price--relative {
  position: relative;
}

.item__icon {
  position: absolute;
  right: 0.5rem;

  cursor: pointer;
}
</style>

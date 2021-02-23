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
    <td class="item__price">{{ currency(product.price) }}</td>
    <td class="item__price item__price--relative">
      <button class="button button--success">Add to Cart</button>
      <font-awesome-icon 
        class="item__icon" 
        :icon="['far', 'times-circle']" 
        size="lg"
        @click="deleteProduct"
      />
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
  top: 46%;
  margin-left: 5rem;
  cursor: pointer;
}
</style>
<template>
  <div class="table-container">
    <table class="table">
      <caption class="caption table__caption font-poppins">
        Your Order
      </caption>
      <thead>
        <tr class="table--border-bottom">
          <td class="table__row">Product</td>
          <td class="table__row table__row--right">Total</td>
        </tr>
      </thead>
      <tbody class="table--border-bottom">
        <tr v-for="(product, key) in products" :key="key">
          <td class="table__row">
            {{ product.title }} x {{ product.quantity }}
          </td>
          <td class="table__row table__row--right">
            {{ currency(product.price * product.quantity) }}
          </td>
        </tr>
      </tbody>
      <tr>
        <td class="table__row table__row--top-padding">Subtotal</td>
        <td class="table__row table__row--top-padding table__row--right">
          {{ totalPrice }}
        </td>
      </tr>
      <tr>
        <td class="table__row table__row--top-padding">Coupon</td>
        <td class="table__row table__row--right table__row--top-padding">
          {{ currency(0) }}
        </td>
      </tr>
      <tr>
        <td class="table__row">Shipping</td>
        <td class="table__row table__row--right">Free Shipping</td>
      </tr>
      <tfoot class="border-t font-medium text-lg">
        <tr>
          <td class="table__row">Total</td>
          <td class="table__row table__row--right">{{ totalPrice }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="table__action">
      <button class="button button--success">Place Order</button>
    </div>
  </div>
</template>

<script>
import { currency } from '@/utils/currency.js';
import { useCartTotal } from '@/use/cartTotal.js';
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { totalPrice } = useCartTotal();
    return {
      currency,
      totalPrice
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.table-container {
  margin-bottom: 4rem;
  @media (min-width: $breakpoint-tablet) {
    margin-left: 1.5rem;
    width: 40%;
  }
}

.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-width: 1px;
  border-top: none;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.025em;

  &__caption {
    padding: 2rem 2.25rem;
    border-width: 1px;
    border-bottom: none;
    text-align: left;
  }

  &--border-bottom {
    border-bottom-width: 1px;
  }

  &__row {
    padding: 1.25rem 2.25rem;

    &--right {
      text-align: right;
    }

    &--top-padding {
      padding-bottom: 0;
    }
  }

  &__action {
    padding: 1rem 0;
    text-align: right;

    @media (min-width: $breakpoint-tablet) {
      padding-left: 0.75rem;
    }
  }
}
</style>

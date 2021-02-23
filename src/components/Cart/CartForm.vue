<template>
  <div class="cart-form">
    <div class="cart-form__column">
      <AppDynamicForm :schema="availabilitySchema">
        <template #default>
          <h4 class="cart-form__title font-poppins">Shipping Availaility</h4>
        </template>
        <template #footer>
          <button 
            class="button"
            @click="$router.push('/')"
          >Continue Shopping</button>
        </template>
     </AppDynamicForm>
    </div>
    <div class="cart-form__column">
      <table class="cart-form__container">
        <caption class="cart-form__title cart-form__title--text-left font-poppins">Shopping Cart Calculation</caption>
        <tr>
          <td class="cart-form__row">Subtotal</td>
          <td class="cart-form__row cart-form__row--text-right">{{ totalPrice }}</td>
        </tr>
        <tr>
          <td class="cart-form__row">Coupon</td>
          <td class="cart-form__row cart-form__row--text-right">{{ currency(0)}}</td>
        </tr>
        <tr>
          <td class="cart-form__row cart-form__row--last">Shipping</td>
          <td class="cart-form__row cart-form__row--last cart-form__row--text-right">Free Shipping</td>
        </tr>
        <tfoot class="cart-form__footer">
          <tr>
            <td class="cart-form__row cart-form__row--last">Total</td>
            <td class="cart-form__row cart-form__row--last cart-form__row--text-right">{{ totalPrice }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="px-3 py-4 text-right">
        <button 
          class="button button--success"
          @click="$router.push('/checkout')"
        >Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import {currency} from '@/utils/currency.js'
import AppDynamicForm from '../ui/AppDynamicForm.vue'
import {availabilitySchema} from '@/utils/schemes.js'

export default {
  components: {
    AppDynamicForm,
  },
  props: {
    totalPrice: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      availabilitySchema,
      currency,
    }
  }       
}
</script>

<style scoped>
.cart-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10rem;
}

.cart-form__column {
  width: 50%;
  padding:0 .5rem;
}

.cart-form__title {
  text-transform: uppercase;
  padding: 2rem 0;
}

.cart-form__title--text-left {
  text-align: left;
}

.button {
  margin-top: 0.5rem;
  padding: .5rem 2.5rem;

  border-width: 1px;
  text-transform: uppercase;
  line-height: 1.5rem;
}

.button--success {
  background-color: #10B981;
  color: #fff;
}
.cart-form__row {
  padding: 0 2.25rem;
  padding-top: 1.6rem;
}

.cart-form__container {
  border-width: 1px;
  width: 100%;
}

.cart-form__row--last {
  padding-bottom: 1.75rem;
}

.cart-form__footer {
  border-top-width: 1px;
}

.cart-form__row--text-right {
  text-align: right;
}
</style>
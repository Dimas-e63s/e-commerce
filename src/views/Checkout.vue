<template>
  <form 
    class="flex-container" 
    @submit.prevent="onSubmit">
    <checkout-form/>
    <div class="table-container">
      <table class="table">
        <caption class="caption table__caption font-poppins">Your Order</caption>
        <thead>
          <tr class="table--border-bottom">
            <td class="table__row">Product</td>
            <td class="table__row table__row--right">Total</td>
          </tr>
        </thead>
        <tbody class="table--border-bottom">
          <tr 
            v-for="(product, key) in products"
            :key="key"
          >
            <td class="table__row">{{ product.title }} x {{ product.quantity }}</td>
            <td class="table__row table__row--right">{{ currency(product.price * product.quantity) }}</td>
          </tr>
        </tbody>
          <tr>
            <td class="table__row table__row--top-padding">Subtotal</td>
            <td class="table__row table__row--top-padding table__row--right">{{ totalPrice }}</td>
          </tr>
          <tr>
            <td class="table__row table__row--top-padding">Coupon</td>
            <td class="table__row table__row--right table__row--top-padding">{{ currency(0)}}</td>
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
          <button 
            class="button button--success"
          >Place Order</button>
        </div>
    </div>
  </form>
</template>

<script>
import {currency} from '@/utils/currency.js'
import { useCartTotal } from '@/use/cartTotal.js'
import {useCheckoutForm} from '@/use/checkoutForm.js'
import {pay} from '@/utils/pay.js'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import {useStore} from 'vuex'

export default {
  components: { CheckoutForm },
  setup() {
    const { totalPrice, products, total } = useCartTotal()
    const store = useStore()
    const {handleSubmit} = useCheckoutForm()

    const onSubmit = handleSubmit(async val =>{
      try {
        await pay({
          amount: total.value,
          description: 'Thank you for you shopping;)'
        })
        await store.dispatch('order/createOrder')
      } catch (e) {
        console.log(e.message);
      }
    })
    
    return {
      currency,
      products,
      totalPrice,
      onSubmit
    }
  }        
}
</script>

<style scoped>
.table-container {
  width: 40%;
  margin-left: 1.5rem;
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
}

.table__caption {
  padding: 2rem 2.25rem;
  border-width: 1px;
  border-bottom:  none;
  text-align: left;
}

.table--border-bottom {
  border-bottom-width: 1px;
}

.table__row {
  padding: 1.25rem 2.25rem;
}

.table__row--right {
  text-align: right;
}

.table__row--top-padding {
  padding-bottom: 0;
}

.table__action {
  padding: 1rem 0;
  padding-left: 0.75rem;
  text-align: right;
}
</style>

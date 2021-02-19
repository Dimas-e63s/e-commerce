<template>
<form class="flex flex-row" @submit.prevent="onSubmit">
   <checkout-form/>
   <div class="w-2/5 ml-6">
        <table class="border border-t-0 w-full text-sm">
          <caption class="uppercase border border-b-0 text-left font-poppins px-9 py-8">Your Order</caption>
          <thead >
              <tr class="border-b">
                  <td class="pl-9">Product</td>
                  <td class="px-9 pb-4 text-right">Total</td>
              </tr>
          </thead>
          <tbody class="border-b">
            <tr 
                v-for="(product, key) in products"
                :key="key"
            >
                <td class="py-5 pl-9">{{ product.title }} x {{ product.quantity }}</td>
                <td class="py-5 pr-9 text-right">{{ currency(product.price * product.quantity) }}</td>
            </tr>
          </tbody>
          <tr>
            <td class="py-5 px-9">Subtotal</td>
            <td class="py-5 px-9 text-right">{{ totalPrice }}</td>
          </tr>
          <tr>
            <td class="px-9 pb-5">Coupon</td>
            <td class="text-right px-9">{{ currency(0)}}</td>
          </tr>
          <tr>
            <td class="pb-8 px-9">Shipping</td>
            <td class="pb-8 px-9 text-right">Free Shipping</td>
          </tr>
          <tfoot class="border-t font-medium text-lg">
            <tr>
              <td class="py-6 px-9">Total</td>
              <td class="py-6 px-9 text-right">{{ totalPrice }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="pl-3 py-4 text-right">
          <button 
            class="h-12 w-48 text-base bg-green-500 px-10 py-2 text-white uppercase"
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
// 
export default {
  components: { CheckoutForm },
  setup() {
    const { totalPrice, products, total } = useCartTotal()
    const store = useStore()
    const {handleSubmit} = useCheckoutForm()

    const onSubmit = handleSubmit(async val =>{
      try {
        await store.dispatch('order/createOrder')
        await pay({
          amount: total.value,
          description: 'Thank you for you shopping;)'
        })
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

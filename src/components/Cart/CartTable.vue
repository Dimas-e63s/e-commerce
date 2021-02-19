<template>
    <table class="w-full font-roboto border-collapse table-fixed tracking-wide">
      <thead>
        <tr>
          <th class="border py-8 w-4/12">Products</th>
          <th class="border py-8 w-2/12">Color &#38; Size</th>
          <th class="border py-8 w-2/12">Quantaty</th>
          <th class="border py-8 w-2/12">Price</th>
          <th class="border py-8 w-2/12">Total</th>
        </tr>
      </thead>
      <tbody>
        <CartItem 
            v-for="(product, key) in products"
            :key="key"
            :product="product"
            :id="key"
      ></CartItem>
      </tbody>
    </table>
    <div class="px-3 py-4 border-l border-r border-b text-right">
      <button 
        class="bg-green-500 px-10 py-2 text-white uppercase"
        @click="$router.push('/')"
      >Continue Shopping</button>
    </div>
    <div class="flex justify-center flex-row align-center mb-40">
      <div class="w-1/2 px-2">
        <app-dynamic-form
          :schema="availabilitySchema"
        >Shipping Availaility
        <template #footer>
          <button 
            class="px-10 py-2 mt-2 border uppercase"
            @click="$router.push('/')"
          >Continue Shopping</button>
        </template>
        </app-dynamic-form>
      </div>
      <div class="w-1/2 px-2">
        <table class="border w-full">
          <caption class="uppercase text-left font-poppins py-8">Shopping Cart Calculation</caption>
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
          <tfoot class="border-t">
            <tr>
              <td class="py-6 px-9">Total</td>
              <td class="py-6 px-9 text-right">{{ totalPrice }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="px-3 py-4 text-right">
          <button 
            class="h-12 w-72 text-base bg-green-500 px-10 py-2 text-white uppercase"
            @click="$router.push('/checkout')"
          >Proceed to Checkout</button>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from "vue";
import {currency} from '@/utils/currency.js'
import CartItem from "@/components/cart/CartItem.vue";
import AppDynamicForm from '../ui/AppDynamicForm.vue';
import {availabilitySchema} from '@/utils/schemes.js'
import { useCartTotal } from '@/use/cartTotal.js'
export default {
  components: {
    CartItem,
    AppDynamicForm,
  },
  setup() {
    const model = ref('Select Country')
    const { totalPrice, products } = useCartTotal()
    
    return {
      totalPrice,
      model,
      availabilitySchema,
      currency,
      products
    }
  }
};
</script>

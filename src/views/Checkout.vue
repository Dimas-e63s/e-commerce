<template>
  <form class="flex-container" @submit.prevent="onSubmit">
    <CheckoutForm />
    <CheckoutTable :products="products" />
  </form>
</template>

<script>
import { useCheckoutForm } from '@/use/checkoutForm.js';
import { useCartTotal } from '@/use/cartTotal.js';
import { pay } from '@/utils/pay.js';
import CheckoutForm from '@/components/checkout/CheckoutForm.vue';
import CheckoutTable from '@/components/checkout/CheckoutTable.vue';
import { useStore } from 'vuex';

export default {
  components: { CheckoutForm, CheckoutTable },
  setup() {
    const { products, total } = useCartTotal();
    const store = useStore();
    const { handleSubmit } = useCheckoutForm();

    const onSubmit = handleSubmit(async val => {
      try {
        await pay({
          amount: total.value,
          description: 'Thank you for you shopping;)'
        });
        await store.dispatch('order/createOrder');
      } catch (e) {
        console.log(e.message);
      }
    });

    return {
      products,
      onSubmit
    };
  }
};
</script>

<style lang="scss" scoped></style>

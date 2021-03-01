<template>
  <div class="min-h-screen">
    <AppFallbackMessage v-if="isCartEmpty"
      >There is no products in cart ;(</AppFallbackMessage
    >
    <CartTable v-else />
  </div>
</template>

<script>
import CartTable from '@/components/cart/CartTable.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import AppFallbackMessage from '@/components/ui/AppFallbackMessage.vue';

export default {
  components: {
    CartTable,
    AppFallbackMessage
  },
  setup() {
    const store = useStore();

    const products = computed(() => store.getters['cart/productsCart']);
    const isCartEmpty = computed(
      () => Object.keys(products.value).length === 0
    );

    return {
      products,
      isCartEmpty
    };
  }
};
</script>

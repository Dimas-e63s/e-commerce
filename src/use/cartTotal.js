import { useStore } from 'vuex';
import { currency } from '@/utils/currency.js';
import { computed } from 'vue';

export function useCartTotal() {
  const store = useStore();
  const products = computed(() => store.getters['cart/productsCart']);

  const total = computed(() =>
    Object.keys(products.value).reduce(
      (acc, key) =>
        (acc += products.value[key].quantity * products.value[key].price),
      0
    )
  );

  const totalPrice = computed(() => currency(total.value));
  const itemsQuantity = computed(() => {
    return Object.keys(products.value).reduce(
      (acc, key) => (acc += products.value[key].quantity),
      0
    );
  });

  return {
    totalPrice,
    products,
    total,
    itemsQuantity
  };
}

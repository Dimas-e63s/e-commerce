<template>
  <div class="flex-container" v-if="categories">
    <ProductFilter :categories="categories" v-model="filters" />
    <ProductsList :products="products" :filters="filters" />
  </div>
</template>

<script>
import ProductsList from '@/components/shop/ProductsList.vue';
import ProductFilter from '@/components/shop/ProductFilter.vue';
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  components: {
    ProductsList,
    ProductFilter
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const categories = computed(() => store.getters['categories/categories']);

    const filters = ref({
      ...route.query
    });
    watch(filters, val => {
      const query = {};
      if (val.search) {
        query['search'] = val.search;
      }
      if (val.category) {
        query['category'] = val.category;
      }
      if (val.price) {
        query['price'] = val.price;
      }
      router.replace({ query });
    });

    onMounted(async () => {
      await store.dispatch('categories/loadCategories');
      await store.dispatch('products/loadAllProducts');
    });
    const products = computed(() =>
      store.getters['products/products']
        .filter(prod => {
          if (filters.value.search) {
            return prod.title
              .toLowerCase()
              .includes(filters.value.search.toLowerCase());
          }
          return prod;
        })
        .filter(prod => {
          if (filters.value.category) {
            return prod.category === filters.value.category;
          }
          return prod;
        })
        .filter(prod => {
          if (filters.value.price) {
            return (
              prod.price > filters.value.price[0] &&
              prod.price < filters.value.price[1]
            );
          }
          return prod;
        })
        .sort((el, nextEl) => nextEl.count - el.count)
    );

    return {
      filters,
      categories,
      products
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.flex-container {
  display: flex;
  flex-direction: row;

  @media (min-width: $breakpoint-tablet) {
    display: flex;
    flex-direction: row;
  }
}
</style>

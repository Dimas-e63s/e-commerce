<template>
  <h3 v-if="products.length === 0" class="text-center">Заявок пока нет</h3>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Категории</th>
        <th>Количество</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :categories="categories"
      />
    </tbody>
  </table>
  <div class="pagination">
    <template v-if="currentPage > 1">
      <router-link :to="{ query: { page: currentPage - 1 } }"
        >&#8592;</router-link
      >
    </template>
    <router-link v-for="num in total" :to="{ query: { page: num } }">{{
      num
    }}</router-link>
    <template v-if="currentPage !== total">
      <router-link :to="{ query: { page: currentPage + 1 } }"
        >&#8594;</router-link
      >
    </template>
  </div>
</template>

<script>
import ProductCard from '@/components/admin/ProductCard.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  components: {
    ProductCard
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const total = ref(null);

    const currentPage = computed(() => +route.query.page || 1);
    onMounted(async () => {
      await store.dispatch('categories/loadCategories');
      total.value = await store.dispatch('products/loadAllProducts');
    });

    const categories = computed(() => store.getters['categories/categories']);
    const products = computed(() => store.getters['products/products']);

    return {
      products,
      categories,
      currentPage,
      total
    };
  }
};
</script>

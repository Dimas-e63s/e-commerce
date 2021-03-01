<template>
  <template v-if="product">
    <ProductMain :product="product" />
    <div>
      <button
        v-for="tab in tabs"
        :class="['tab', { active: currentTab === tab }]"
        :key="tab"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <keep-alive>
      <component
        :is="currentTab + 'Tab'"
        v-bind="{ reviews: product.reviews }"
      />
    </keep-alive>
  </template>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import DescriptionTab from '@/components/product/DescriptionTab.vue';
import ReviewsTab from '@/components/product/ReviewsTab.vue';
import ProductMain from '@/components/product/Product.vue';
export default {
  components: {
    DescriptionTab,
    ReviewsTab,
    ProductMain
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { id } = route.params;

    const currentTab = ref('Reviews');
    const tabs = ['Description', 'Reviews'];

    onMounted(async () => {
      if (!product.value) {
        await store.dispatch('products/loadProductById', id);
      }
    });
    const product = computed(() =>
      store.getters['products/getProductById'](id)
    );

    return {
      product,
      currentTab,
      tabs
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.tab {
  width: 7rem;
  height: 2.75rem;
  display: inline-block;
  line-height: 44px;
  vertical-align: bottom;
  text-align: center;

  @media (min-width: $breakpoint-tablet) {
    width: 9rem;
  }
}

.tab.active {
  background: #e5e7eb;
}
</style>

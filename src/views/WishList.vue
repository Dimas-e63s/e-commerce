<template>
  <div class="min-h-screen">
    <table class="table font-roboto mb-24" v-if="wishlist.length > 0">
      <thead>
        <tr>
          <th class="table__header table__header--main">Products</th>
          <th class="table__header">Color &#38; Size</th>
          <th class="table__header">Price</th>
          <th class="table__header table__header--main"></th>
        </tr>
      </thead>
      <tbody>
        <WishItem v-for="item in wishlist" :key="item.id" :product="item" />
      </tbody>
    </table>
    <AppFallbackMessage v-else>There is no items added yet.</AppFallbackMessage>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import WishItem from '@/components/wishlist/WishItem.vue';
import AppFallbackMessage from '@/components/ui/AppFallbackMessage.vue';
export default {
  components: {
    WishItem,
    AppFallbackMessage
  },
  setup() {
    const store = useStore();
    const wishlist = computed(() => store.getters['wishlist/wishlist']);

    return {
      wishlist
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  letter-spacing: 0.025em;

  @media (max-width: $breakpoint-tablet) {
    tr,
    td,
    tbody,
    thead,
    tfoot,
    th {
      display: table;
      width: 100%;
      border-collapse: separate;
    }

    thead tr:first-child {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
  }

  &__header {
    width: 16.666667%;
    padding: 2rem 0;
    border-width: 1px;

    &--main {
      width: 33.333333%;
    }
  }

  &__footer {
    text-align: right;
    padding: 1rem 0.75rem;
    border-width: 1px;
    border-top-width: 0;

    @media (max-width: $breakpoint-tablet) {
      border-width: 0;
    }
  }

  &__header {
    width: 16.666667%;
    padding: 2rem 0;
    border-width: 1px;

    &--main {
      width: 33.333333%;
    }
  }
}
</style>

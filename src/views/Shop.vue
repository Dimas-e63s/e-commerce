<template>
  <div class="card">
    <ProductFilter
      v-model="filters"
    />
    <ProductsList
      :filters="filters"
    />
  </div>
</template>

<script>
import ProductsList from '@/components/shop/ProductsList.vue';
import ProductFilter from '@/components/shop/ProductFilter.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
  export default {
    components: {
      ProductsList,
      ProductFilter
    },
    setup() {
      const route = useRoute()
      const router = useRouter()

      const filters = ref({
        ...route.query
      })

      watch(filters, val => {
        const query = {}
        if(val.search) {
          query['search'] = val.search
        }
        if(val.category) {
          query['category'] = val.category
        }
        router.replace({query})
      })

      return {
        filters
      }
    }
  }
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
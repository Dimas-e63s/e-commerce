<template>
   <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    onMounted(async () => {
      if(store.getters['products/categories'].length === 0) {
        console.log(1);
        await store.dispatch('products/loadCategories')
      }
      if(store.getters['products/products'].length === 0) {
        await store.dispatch('products/loadAllProducts')
      }
    })
  }   
}
</script>

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
         :products="products"
         :categories="categories"
       />
     </tbody>
   </table>
</template>

<script>
import ProductCard from '@/components/admin/ProductCard.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
   components: {
     ProductCard,
   },
   setup() {
    const store = useStore()

    const products = computed(() => store.getters['products/products'].sort((a, b) => a.id - b.id))
    const categories = computed(() => store.getters['products/categories'])

    return  {
      products,
      categories,
    }
  }     
}
</script>

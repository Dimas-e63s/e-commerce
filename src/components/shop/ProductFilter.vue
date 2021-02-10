<template>
   <div class="products-filter">
      <div class="form-control">
        <input 
          type="text" 
          placeholder="Найти товар..."
          v-model="search"
        >
        <span 
          class="form-control-clear"
          @click="search = ''"
        >&times;</span>
      </div>

      <ul class="list">
        <li 
          class="list-item"
          @click="category = ''"
        >Все</li>
        <li 
          class="list-item"
          v-for="opt in categories"
          :key="opt.id"
          @click="setCategory(opt.type)"
        >
          {{ opt.title }}
        </li>
      </ul>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const store = useStore()

    const search = ref(props.modelValue.search)
    const category = ref(props.modelValue.category)

    onMounted(async () => {
      await store.dispatch('products/loadCategories')
    })

    const setCategory = val => category.value = val

    const categories = computed(() => store.getters['products/categories'])

    watch([search, category], val => {
      emit('update:modelValue', {
        search: val[0],
        category: val[1]
      })
    })

    return {
      categories,
      setCategory,
      search,
      category
    }
  }  
}
</script>

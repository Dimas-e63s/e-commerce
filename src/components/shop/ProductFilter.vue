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
      <div class="mt-8 border-t">
        <h5 class="uppercase font-poppins mt-4">Categories</h5>
        <ul class="pt-4">
          <li 
            class="list-item font-roboto"
            @click="category = ''"
          >All</li>
          <li 
            class="list-item font-roboto"
            v-for="opt in categories"
            :key="opt.id"
            @click="setCategory(opt.type)"
          >
            {{ opt.title }}
          </li>
        </ul>
      </div>
      <div class="border-b border-t mt-4 py-8">
        <h5 class="uppercase font-poppins tracking-wide mb-6">Price filter</h5>
        <vue-slider 
          v-model="range"
          :min="10"
          :max="3000"
          tooltip="'none'"
          :enable-cross="false"
          order
        ></vue-slider>
        <div class="flex flex-row mt-8">
          <div class="border w-16 h-8 mr-4 text-center align-middle">
            <p>${{ range[0] }}</p>
          </div>
          <div class="w-16 h-8 border p-0 text-center my-auto">
            <p>${{ range[1] }}</p>
          </div>
          <div class="bg-green-500 h-8 w-8 ml-2">
            <AppLink
              :prefix="searchSchema.prefix"
              :link="searchSchema"
              @click.prevent="setPriceFilter"
              class="text-white inline-block absolute t-9"
            />
          </div>
      </div>
      </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import VueSlider from 'vue-slider-component'
import {searchSchema} from '@/utils/schemes.js'
import 'vue-slider-component/theme/default.css'
import AppInput from '../ui/AppInput.vue'
import AppLink from '../ui/AppLink.vue'
import { useRoute } from 'vue-router'
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  components: {
    VueSlider,
    AppInput,
    AppLink,
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()

    const search = ref(props.modelValue.search || '')
    const category = ref(props.modelValue.category || '')
    const range = ref([10, 3000])
    const price = ref(null)

    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
    })

    const setCategory = val => category.value = val
    const categories = computed(() => store.getters['categories/categories'])
    const setPriceFilter = () => price.value = range.value

    watch([search, category, price], val => {
      emit('update:modelValue', {
        search: val[0],
        category: val[1],
        price: val[2]
      })
    })

    watch(route, val => {
      console.log(val);
    })

    return {
      categories,
      setCategory,
      search,
      category,
      range,
      searchSchema,
      setPriceFilter
    }
  }  
}
</script>

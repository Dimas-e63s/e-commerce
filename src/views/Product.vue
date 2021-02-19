<template>
  <div class="flex mb-16" v-if="product !== undefined">
    <Gallery :images="product.images"/>
    <div class="ml-8">
      <h3 class="card-title font-poppins text-2xl mb-4 tracking-wide">{{ product.title }}</h3>
      <div class="mb-6">
        <span class="product-price">{{ currency(product.price) }}</span>
        <div class="inline-block ml-4 align-middle">
        <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
        </div>
      </div>
      <div class="product-description mb-10">
        <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores officiis expedita id quam molestiae sint libero quasi officia quos accusantium laboriosam rem voluptate optio aliquam at modi eum deserunt, iure nisi numquam ipsam nam ea. Neque corrupti enim expedita quis?</p>
      </div>
      <div class="border-b"> </div>
      <div 
        class="pt-10"
        style="width: 17.5rem;"
      >
        <app-select
          :options="options"
          v-model="select"
          class="mb-4"
        />
        <div class="border h-11 flex align-center my-8">
          <span 
            class="inline-block w-11  text-center border-r"
            style="height: inherit; line-height: 44px"
            @click="addToCart"
          >+</span>
          <span 
            class="inline-block w-full text-center"
            style="height: inherit; line-height: 44px"
          >{{productQuantityInCart}}</span>
          <span 
            class="inline-block w-12  text-center align-middle border-l"
            style="height: inherit; line-height: 44px"
            @click="decreaseAmount"
          >-</span>
        </div>
        <button 
          class="w-40 h-11 text-base bg-green-500 text-white uppercase mr-3"
          @click="addToCart"
          :disabled="product.count === 0"
        >
        <app-link class="text-white" prefix="fas" :link="{icon: 'shopping-cart'}"/>
        Add to cart</button>
        <button class="border h-11 w-12 mx-auto mr-3"><app-link class="text-black inline-block" prefix="far" :link="{icon: 'heart'}"/></button>
        <button class="border h-11 w-12">
          <app-link class="text-black" prefix="fas" :link="{icon: 'exchange-alt'}"/>
        </button>
      </div>
    </div>
  </div>
  <div>
    <button
      v-for="tab in tabs" 
      :class="['tab', { active: currentTab === tab }]"
      :key="tab"
      @click="currentTab = tab"
    >{{tab}}</button>
   </div>
   <keep-alive> 
      <component :is="currentTab"/>
   </keep-alive>
</template>

<script>
import {currency} from '@/utils/currency.js';
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import StarRating from 'vue-star-rating'
import AppSelect from '../components/ui/AppSelect.vue';
import AppLink from '../components/ui/AppLink.vue';
import AppDynamicForm from '../components/ui/AppDynamicForm.vue';
import {reviewSchema} from '@/utils/schemes.js'
import {useProductActions} from '@/use/productActions.js'
import Description from '@/components/product/Description.vue';
import Reviews from '@/components/product/Reviews.vue';
import Gallery from '@/components/product/Gallery.vue';
export default {
  components: {
    StarRating,
    AppSelect,
    AppLink,
    AppDynamicForm,
    Description,
    Reviews,
    Gallery,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const select = ref('select')
    const rating = ref(4)
    const id = route.params.id
    const product = computed(() => store.getters['products/getProductById'](id))
    const currentTab = ref('Reviews')
    const tabs = ['Description', 'Reviews']

    onMounted(async () => {
      if(!product.value) {
        await store.dispatch('products/loadProductById', id)
      }
    })

    const options = [
      {title: 'Select size', value: 'select'},
      {title: 'S', type: 's'},
      {title: 'M', type: 'm'},
      {title: 'L', type: 'l'},
      {title: 'XL', type: 'xl'},
    ]

    const {addToCart, decreaseAmount,productQuantityInCart} = useProductActions(id)

    return {
      product,
      currency,
      rating,
      select,
      options,
      reviewSchema,
      productQuantityInCart,
      addToCart,
      decreaseAmount,
      currentTab,
      tabs,
    }
  }
}
</script>

<style scoped>
.tab {
  width: 9rem;
  height: 2.75rem;
  display: inline-block;
  line-height: 44px;
  vertical-align: bottom;
  text-align: center;
}

.tab.active  {
  background: #E5E7EB;
}

img {
	height: 100%;
	object-fit: cover;
	object-position: center;
  max-width: 100%;
}
</style>
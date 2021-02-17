<template>
  <div class="flex mb-16" v-if="product">
    <div>
     <div class="product-image">
      <img :src="product.img" class=""/>
     </div>
     <div class="product-gallery">
      <img 
        v-for="img in 3"
        :src="product.img"
        class=""/>
     </div>
      <p>Категория: <strong>Название категории</strong></p>
    </div>
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
      <div class="w-64 pt-10">
        <app-select
          :options="options"
          v-model="select"
          class="mb-4"
        />
        <div class="border h-11 flex align-center my-8">
          <span 
            class="inline-block w-11  text-center border-r"
            @click="addToCart"
          >+</span>
          <span class="inline-block w-full text-center">{{productQuantityInCart}}</span>
          <span 
            class="inline-block w-11  text-center align-middle border-l"
            @click="decreaseAmount"
          >-</span>
        </div>
        <button 
          class="w-36 h-11 text-base bg-green-500 text-white uppercase mr-2"
          @click="addToCart"
          :disabled="product.count === 0"
        >Add to cart</button>
        <button class="border h-11 mx-auto mr-2"><app-link class="text-black inline-block" prefix="far" :link="{icon: 'heart'}"/></button>
        <button class="border h-11"><app-link class="text-black" prefix="fas" :link="{icon: 'exchange-alt'}"/></button>
      </div>
    </div>
  </div>
  <h3 class="text-center text-white" v-else>
      Товара не найден.
    </h3>
  <div>
    <div class="w-36 inline-block h-11 text-center"><span>Description</span></div>
    <div class="w-36 inline-block h-11 bg-gray-200 text-center"><span>Reviews (1)</span></div>
  </div>
  <div class="bg-gray-200 pt-6 px-6 mb-20">
    <h3 class="mb-6">1 review</h3>
    <div class="flex mb-14">
      <div class="bg-gray-900 w-24 h-20 inline-block"></div>
      <div class="inline-block ml-4 bg-white p-6 w-full">
        <div class="flex align-center mb-4">
          <div class="inline-block  align-middle">
            <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
          </div>
          <span class="italic">Jun 3, 2017</span>
        </div>
        <h3 class="mb-2 font-poppins">John Green</h3>
        <p class="font-poppins text-sm">This will go great with my Hoodie that I ordered a few weeks ago</p>
      </div>
    </div>
    <div style="width: 50rem;" class="pb-10">
      <h3 class=" tracking-wide font-poppins text-base">Add a review</h3>
      <app-dynamic-form
        :schema="reviewSchema"
        class="flex flex-row mb-4"
      />
      <h3 class="inline-block tracking-wide font-poppins text-base">Your review:</h3>
      <h3 class="inline-block tracking-wide font-poppins text-base ml-36 mb-4">Your rating: </h3>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false"  max-rating="1" :v-model:rating="1"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false" :max-rating="2" :v-model:rating="2"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false" :max-rating="3" :v-model:rating="3"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false" :max-rating="4" :v-model:rating="4"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" border-color="#fada5e" :show-rating="false" :v-model:rating="5" :max-rating="5"/>
      </div>
      <textarea name="" id="" class="w-full h-36 mb-4"></textarea>
      <button class="h-8 w-28 text-base text-center bg-green-500 text-white uppercase">Submit</button>
    </div>
  </div>
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
export default {
  components: {
    StarRating,
    AppSelect,
    AppLink,
    AppDynamicForm,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const rating = ref(4)
    const id = route.params.id
    const select = ref('select')
    const product = computed(() => store.getters['products/getProductById'](id))

    const options = [
      {title: 'Select size', value: 'select'},
      {title: 'S', type: 's'},
      {title: 'M', type: 'm'},
      {title: 'L', type: 'l'},
      {title: 'XL', type: 'xl'},
    ]

    onMounted(async () => {
      if(!product.value) {
        await store.dispatch('products/loadProductById', id)
      }
    })

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
      decreaseAmount
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="product" v-if="product">
    <Gallery :images="product.images"/>
    <div class="product__info">
      <h3 class="product__title">{{ product.title }}</h3>
      <div class="mb-6">
        <span class="product__price">{{ currency(product.price) }}</span>
        <div class="product__rating">
          <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
        </div>
      </div>
      <div class="product__description">
        <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores officiis expedita id quam molestiae sint libero quasi officia quos accusantium laboriosam rem voluptate optio aliquam at modi eum deserunt, iure nisi numquam ipsam nam ea. Neque corrupti enim expedita quis?</p>
      </div>
      <div class="product__actions">
        <app-select
          class="product__select"
          v-model="select"
          :options="options"
        />
        <div class="product__cart-actions">
          <span 
            class="product__action product__action--left"
            @click="addToCart"
          >+</span>
          <span 
            class="product__action product__action--main"
          >{{productQuantityInCart}}</span>
          <span 
            class="product__action product__action--right"
            @click="decreaseAmount"
          >-</span>
        </div>
        <button 
          class="product__button button--success"
          @click="addToCart"
          :disabled="product.count === 0"
        >
          <app-link 
            class="product__icon--white" 
            prefix="fas" 
            :link="{icon: 'shopping-cart'}"
          />Add to cart</button>
        <button class="product__button-other product__button-other--left">
          <app-link 
            class="product__icon--black" 
            prefix="far" 
            :link="{icon: 'heart'}"/>
        </button>
        <button class="product__button-other">
          <app-link 
            class="product__icon--black" 
            prefix="fas" 
            :link="{icon: 'exchange-alt'}"/>
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
import {currency} from '@/utils/currency.js'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import StarRating from 'vue-star-rating'
import AppSelect from '../components/ui/AppSelect.vue'
import AppLink from '../components/ui/AppLink.vue'
import AppDynamicForm from '../components/ui/AppDynamicForm.vue'
import {reviewSchema, options} from '@/utils/schemes.js'
import {useProductActions} from '@/use/productActions.js'
import Description from '@/components/product/Description.vue'
import Reviews from '@/components/product/Reviews.vue'
import Gallery from '@/components/product/Gallery.vue'
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
    const id = route.params.id

    const select = ref('select')
    const rating = ref(4)

    const currentTab = ref('Reviews')
    const tabs = ['Description', 'Reviews']

    const product = computed(() => store.getters['products/getProductById'](id))
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

.product {
  display: flex;
  margin-bottom: 4rem;
}

.product__info {
  margin-left: 2rem;
}

.product__title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;

  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 0.025em;
}

.product__description {
  width: 32rem;
  padding-bottom: 2.5rem;

  font-size: 15px;
  letter-spacing: 0px;
  line-height: 24px;
  color: #232323;
  font-weight: 400;
  font-family: "Roboto";

  border-bottom-width: 1px;
}

.product__price {
  font-size: 1.15rem;
  color: #3cb878;
  letter-spacing: 1px;
  line-height: 24px;
  margin-bottom: 0.4rem;
}

.product__rating {
  display: inline-block;
  margin-left: 1rem;
  height: inherit;
  line-height: 25px;
}

.product__actions {
  width: 17.5rem;
  padding-top: 2.5rem;
}

.product__select {
  margin-bottom: 1rem;
}

.product__cart-actions {
  display: flex;
  align-items: center;

  height: 2.75rem;
  margin: 2rem 0;

  border-width: 1px;
}

.product__action {
  display: inline-block;
  width: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
}

.product__action--main {
  width: 100%;
}

.product__action--left {
  border-right-width: 1px;
}

.product__action--right {
  border-left-width: 1px;
}

.product__button {
  width: 10rem;
  height: 2.75rem;

  margin-right: 0.75rem;
}

.product__button-other {
  height: 2.75rem;
  width: 3rem;

  border-width: 1px;
}

.product__button-other--left {
  margin-right: 0.75rem;
}

.product__icon--white {
  color: #fff;
}

.product__icon--black {
  color: #000;
}
</style>
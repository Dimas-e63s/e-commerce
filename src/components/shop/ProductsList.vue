<template>
  <div class="products-table">
    <div class="product__card" v-for="product in products" :key="product.id">
      <div class="product__img" @click="$router.push(`/product/${product.id}`)">
        <img
          :src="product.img[1]"
          :alt="product.title"
          sizes="(min-width: 768px) 317px, 238px"
          :srcset="
            `
          ${product.img[0]} 238w,${product.img[1]} 317w,${product.img[2]} 476w,${product.img[3]} 634w,
          `
          "
        />
      </div>
      <h4 class="product__title font-poppins">{{ product.title }}</h4>
      <div class="product__price">
        <span>{{ currency(product.price) }}</span>
      </div>
      <Rating v-model="product.rating" class="product__rating" readonly />
    </div>
  </div>
</template>

<script>
import { currency } from '@/utils/currency.js';
import Rating from '@/components/ui/Rating.vue';
export default {
  components: {
    Rating
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      currency
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.products-table {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // padding: 1rem;

  @media (min-width: $breakpoint-tablet) {
    //  padding: 1rem;
  }
}

.product__card {
  width: calc(50% - 6px);
  // height: 29rem;
  /* border: 1px solid #ccc; */
  margin: 0.7rem 0 0 0.7rem;
  transition: 0.22s box-shadow;
  cursor: pointer;

  &:nth-child(odd) {
    margin-left: 0;
  }

  @media (min-width: $breakpoint-tablet) {
    width: calc(50% - 10px);

    &:nth-child(odd) {
      margin-left: 0.5rem;
    }
  }

  @media (min-width: 840px) {
    width: calc(47% - 10px);
    // &:nth-child(odd) {
    //   margin-left: 5%;
    // }
  }

  @media (min-width: 950px) {
    width: calc(33.3% - 10px);
  }
}

.product__rating {
  margin-top: 0.6rem;
  margin-bottom: 1.2rem;
}

.product__img {
  width: 100%;
  display: flex;
  justify-content: center;
}

.product__img img {
  max-width: 100%;
  height: auto;
}
</style>

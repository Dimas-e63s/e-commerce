<template>
  <div class="product">
    <Gallery :images="product.images" />
    <div class="product__info">
      <h3 class="product__title">{{ product.title }}</h3>
      <div class="flex items-end mb-4">
        <span class="product__price">{{ currency(product.price) }}</span>
        <div class="product__rating">
          <Rating v-model="product.rating" readonly />
        </div>
      </div>
      <div class="product__description">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
          officiis expedita id quam molestiae sint libero quasi officia quos
          accusantium laboriosam rem voluptate optio aliquam at modi eum
          deserunt, iure nisi numquam ipsam nam ea. Neque corrupti enim expedita
          quis?
        </p>
      </div>
      <div class="product__actions">
        <app-select
          aria-label="Size select"
          class="product__select"
          v-model="select"
          :options="options"
        />
        <div class="product__cart-actions">
          <span
            class="product__action product__action--left"
            @click="decreaseAmount"
            >-</span
          >
          <span class="product__action product__action--main">{{
            productQuantityInCart
          }}</span>
          <span
            class="product__action product__action--right"
            @click="addToCart"
            >+</span
          >
        </div>
        <button
          class="product__button button--success"
          @click="addToCart"
          :disabled="product.count === 0"
        >
          <app-link
            class="product__icon--white"
            prefix="fas"
            :link="{ icon: 'shopping-cart' }"
          />Add to cart
        </button>
        <button
          class="product__button-other product__button-other--left"
          @click="toggleWishListItem"
        >
          <app-link
            v-if="inWishList"
            aria-label="Wish List"
            class="product__icon--black"
            prefix="fas"
            :link="{ icon: 'heart' }"
          />
          <app-link
            v-else
            aria-label="Wish List"
            class="product__icon--black"
            prefix="far"
            :link="{ icon: 'heart' }"
          />
        </button>
        <button class="product__button-other">
          <app-link
            aria-label="Exchange"
            class="product__icon--black"
            prefix="fas"
            :link="{ icon: 'exchange-alt' }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@/utils/currency.js';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AppSelect from '@/components/ui/AppSelect.vue';
import AppLink from '@/components/ui/AppLink.vue';
import { options } from '@/utils/schemes.js';
import { useProductActions } from '@/use/productActions.js';
import Gallery from '@/components/product/Gallery.vue';
import Rating from '@/components/ui/Rating.vue';
export default {
  components: {
    AppSelect,
    AppLink,
    Gallery,
    Rating
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const select = ref('select');
    const store = useStore();
    const inWishList = computed(() =>
      store.getters['wishlist/isItemInWishlist'](props.product.id)
    );
    const {
      addToCart,
      decreaseAmount,
      productQuantityInCart
    } = useProductActions(props.product.id);
    const toggleWishListItem = () => {
      if (inWishList.value) {
        return store.commit('wishlist/DELETE_ITEM', props.product.id);
      }
      return store.commit('wishlist/ADD_ITEM', props.product);
    };
    return {
      currency,
      options,
      select,
      addToCart,
      decreaseAmount,
      productQuantityInCart,
      toggleWishListItem,
      inWishList
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.product {
  margin-bottom: 4rem;
  height: 100%;
  @media (min-width: $breakpoint-tablet) {
    display: flex;
  }

  &__info {
    @media (min-width: $breakpoint-tablet) {
      margin-left: 2rem;
      width: 40%;
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;

    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: 0.025em;
  }

  &__description {
    padding-bottom: 2.5rem;
    font-size: 15px;
    letter-spacing: 0px;
    line-height: 24px;
    color: #232323;
    font-weight: 400;
    font-family: 'Roboto';
    border-bottom-width: 1px;

    @media (min-width: $breakpoint-tablet) {
      // width: 32rem;
    }
  }

  &__price {
    font-size: 1.15rem;
    color: #3cb878;
    letter-spacing: 1px;
    line-height: 24px;
  }

  &__rating {
    display: inline-block;
    margin-left: 1rem;
    height: inherit;
    line-height: 25px;
  }

  &__actions {
    padding-top: 2.5rem;

    @media (min-width: $breakpoint-tablet) {
      width: 17.5rem;
    }
  }

  &__select {
    margin-bottom: 1rem;
  }

  &__cart-actions {
    display: flex;
    align-items: center;

    height: 2.75rem;
    margin: 2rem 0;

    border-width: 1px;
  }

  &__action {
    display: inline-block;
    width: 2.75rem;
    line-height: 2.75rem;
    text-align: center;
    cursor: pointer;

    &--main {
      width: 100%;
    }

    &--left {
      border-right-width: 1px;
    }

    &--right {
      border-left-width: 1px;
    }
  }

  &__button {
    height: 2.75rem;
    margin-right: 0.75rem;
    width: 23rem;

    @media (max-width: $breakpoint-xl-phone) {
      width: 16rem;
    }

    @media (min-width: $breakpoint-tablet) {
      width: 10rem;
    }

    &-other {
      height: 2.75rem;
      width: 3rem;
      border-width: 1px;

      &--left {
        margin-right: 0.75rem;
      }
    }
  }

  &__icon--white {
    color: #fff;
  }

  &__icon--black {
    color: #000;
  }
}

img {
  height: 100%;
  object-fit: cover;
  object-position: center;
  max-width: 100%;
}
</style>

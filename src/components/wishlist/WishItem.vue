<template>
  <tr class="item">
    <td class="item__image-container text-left">
      <img
        class="item__image"
        :src="product.img[0]"
        sizes="(min-width: 768px) 317px, 238px"
        :srcset="
          `
          ${product.img[0]} 238w,${product.img[1]} 317w,${product.img[2]} 476w,${product.img[3]} 634w,
          `
        "
        :alt="product.title"
      />
      <h3 class="item__title">{{ product.title }}</h3>
    </td>
    <td data-title="Size" class="item__size">
      <p>color: black</p>
      <p>size: XL</p>
    </td>
    <td data-title="Price" class="item__price">
      {{ currency(product.price) }}
    </td>
    <td class="item__price item__price--relative">
      <button class="button button--success" @click="addToCart">
        Add to Cart
      </button>
      <font-awesome-icon
        class="item__icon"
        :icon="['far', 'times-circle']"
        size="lg"
        @click="deleteProduct"
      />
    </td>
  </tr>
</template>

<script>
import { currency } from '@/utils/currency.js';
import { useStore } from 'vuex';
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const deleteProduct = () => {
      store.commit('wishlist/DELETE_ITEM', props.product.id);
    };
    const addToCart = () => {
      store.commit('cart/ADD_PRODUCT_TO_CART', {
        ...props.product,
        quantity: 1
      });
      deleteProduct();
    };
    return {
      currency,
      deleteProduct,
      addToCart
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.item {
  text-align: center;
  border-width: 1px;
  padding: 0.5rem;

  @media (max-width: $breakpoint-tablet) {
    margin-bottom: 2rem;
    border-radius: 0.375rem;
    box-shadow: 1px 2px 9px 2px #00000029;
    & td {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-top-width: 1px;
      // remove some borders

      &:first-child,
      &:nth-child(2) {
        border: 0 none;
      }

      &:first-child {
        border: 0 none;
      }
      &:last-child {
        font-weight: bold;
      }
    }
    & td[data-title]:before {
      content: attr(data-title) ': ';
    }

    & td:before {
      white-space: nowrap;
      width: 50%;
      display: table-cell;
      text-align: left;
      // -- just styling
      font-weight: bold;
    }
  }

  &__image {
    width: 9rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    @media (min-width: $breakpoint-tablet) {
      border-radius: 0;
      padding: 2rem 0;
      padding-left: 1.5rem;
      margin-bottom: 0rem;
    }

    &-container {
      display: flex;
      align-items: center;
      border-right-width: 1px;
    }
  }

  &__title {
    margin: 0 auto;
    margin-bottom: 1rem;
    @media (min-width: $breakpoint-tablet) {
      margin-bottom: 0;
      margin-left: 1rem;
    }
  }

  &__size {
    border-right-width: 1px;
  }

  &__actions {
    padding: 0 0.5rem;
  }

  &__quantity {
    display: inline-block;
    width: 3rem;
    border-width: 1px;
  }

  &__price {
    @media (min-width: $breakpoint-tablet) {
      border-width: 1px;
    }

    &--relative {
      position: relative;
    }
  }

  &__icon {
    position: absolute;
    right: 0.5rem;
    top: 46%;
    margin-left: 5rem;
    cursor: pointer;
    opacity: 0;

    @media (min-width: $breakpoint-tablet) {
      opacity: 1;
    }
  }
}
</style>

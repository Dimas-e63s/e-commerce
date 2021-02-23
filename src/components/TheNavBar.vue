<template>
  <the-side-nav @close="sidebar = false" :class="{ active: sidebar }" />
  <nav class="navbar font-poppins">
    <div class="navbar__wrapper">
      <button
        type="button"
        id="sidebarCollapse"
        class="navbar__btn"
        @click="sidebar = true"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <router-link custom v-slot="{ navigate }" :to="{ name: 'shop' }">
        <h3 class="navbar__title navbar__title--cursor" @click="navigate">
          Renoshop<span class="navbar__title-piece">bee</span>
        </h3>
      </router-link>
    </div>
    <ul class="navbar__menu">
      <li>
        <router-link custom v-slot="{ navigate }" :to="{ name: 'shop' }">
          <a
            @click="navigate"
            :class="[
              'cursor-pointer',
              {
                active: ['shop', 'product'].includes($route.name)
              }
            ]"
            >Shop</a
          >
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'cart' }">Cart</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'products' }">Admin</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'wishlist' }">Wish List</router-link>
      </li>
    </ul>
    <div class="navbar__actions">
      <a
        @click.prevent="$router.push({ name: 'cart' })"
        class="navbar__link navbar__link--relative"
      >
        <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg" />
        <small v-if="itemsQuantity" id="lblCartCount">{{
          itemsQuantity
        }}</small>
      </a>
      <a
        @click="$store.commit('focus')"
        class="navbar__link navbar__link--last"
      >
        <font-awesome-icon :icon="['fas', 'search']" size="lg" />
      </a>
    </div>
  </nav>
</template>

<script>
import { useCartTotal } from '@/use/cartTotal.js';
import { ref } from 'vue';
import TheSideNav from './TheSideNav.vue';
export default {
  components: { TheSideNav },
  setup() {
    const sidebar = ref(false);
    return {
      sidebar,
      itemsQuantity: useCartTotal().itemsQuantity
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
#lblCartCount {
  position: absolute;
  top: -6px;
  right: -12px;
  padding: 0 6px;
  background: #10b981;
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;
  background-color: #fff;
  border-bottom-width: 2px;

  @media (min-width: $breakpoint-tablet) {
    height: 6rem;
  }

  &__wrapper {
    margin: auto 0;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    @media (min-width: $breakpoint-tablet) {
      margin-left: 3rem;
    }
  }

  &__title {
    color: #10b981;
    text-transform: uppercase;

    &--cursor {
      cursor: pointer;
    }
  }

  &__title-piece {
    color: black;
  }

  &__actions {
    margin: auto 0;
    margin-right: 1rem;
    @media (min-width: $breakpoint-tablet) {
      margin-right: 2.8rem;
    }
  }

  &__link {
    color: #000;
    cursor: pointer;

    &--last {
      margin-left: 1.5rem;
    }

    &--relative {
      position: relative;
    }
  }

  &__menu {
    list-style: none;
    display: flex;

    @media (max-width: $breakpoint-tablet) {
      display: none;
    }

    & li {
      margin-right: 2rem;
      display: flex;
      align-items: center;
      box-sizing: content-box;

      & a {
        position: relative;
        display: block;
        padding: 5px 15px;
        color: #2c3e50;
        text-decoration: none;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 0%;
          height: 5px;
          content: '.';
          color: transparent;
          background: #10b981;
          height: 1px;
        }

        &:hover:after,
        &.active:after {
          width: 100%;
          height: 0.1rem;
        }

        &,
        &:after,
        &:before {
          transition: all 0.5s;
        }

        &:hover {
          color: #555;
        }
      }
    }
  }
}

.navbar__btn {
  width: 2rem;
  height: 2.5rem;
  margin-right: 1.3rem;

  @media (min-width: $breakpoint-tablet) {
    display: none;
  }

  & span {
    width: 80%;
    height: 3px;
    margin: 0.3rem auto;
    border-radius: 4px;
    display: block;
    background: #000;
  }
}
</style>

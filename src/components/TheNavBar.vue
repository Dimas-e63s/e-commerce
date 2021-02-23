<template>
   <nav class="navbar font-poppins">
    <div class="navbar__wrapper">
     <h2 class="navbar__title">Renoshop<span class="navbar__title-piece">bee</span></h2>
    </div>
    <ul class="navbar__menu">
      <li>
        <router-link :to="{name: 'shop'}">Shop</router-link>
      </li>
      <li>
        <router-link :to="{name: 'cart'}">Cart</router-link>
      </li>
      <li>
        <router-link :to="{name: 'products'}">Admin</router-link>
      </li>
      <li>
        <router-link :to="{name: 'wishlist'}">Wish List</router-link>
      </li>
    </ul>
    <div class="navbar__actions">
      <a @click.prevent="$router.push({name: 'cart'})" class="navbar__link navbar__link--relative">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg"/>
        <small v-if="itemsQuantity" id="lblCartCount">{{itemsQuantity}}</small>
      </a>
      <a @click="$store.commit('focus')" class="navbar__link">
        <font-awesome-icon :icon="['fas', 'search']" size="lg"/>
      </a>
    </div>
   </nav>
</template>

<script>
import { useCartTotal } from '@/use/cartTotal.js'
export default {
  setup() {
    return {
      itemsQuantity: useCartTotal().itemsQuantity,
    }
  }
}
</script>

<style scoped>
#lblCartCount {
  position: absolute;
  top: -6px;
  right: -12px;

  padding: 0 6px;
  background: #10B981;
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

  height: 6rem;

  background-color: #fff;
  border-bottom-width: 2px;
}

.navbar__wrapper {
  margin: auto 0;
  margin-left: 2rem;
}

.navbar__title {
  color: #10B981;
  text-transform: uppercase;
}

.navbar__title-piece {
  color: black;
}

.navbar__actions {
  margin: auto 0;
  margin-right: 3.5rem;
}

.navbar__link {
  color: #000;
  cursor: pointer;
}

.navbar__link--relative {
  position: relative;
}

.navbar__link:last-child {
  margin-left: 1.5rem;
}
</style>


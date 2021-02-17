<template>
   <nav class="flex justify-between flex-row h-24 bg-white font-poppins sticky top-0 z-20 border-b-2 border-black-900">
    <div class="my-auto ml-8">
     <h2 class="text-green-500 uppercase">Renoshop<span class="text-black">bee</span></h2>
    </div>
    <ul class="navbar-menu">
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
    <div class="my-auto mr-14">
        <a @click.prevent="$router.push({name: 'cart'})" class="cursor-pointer text-black mr-4 relative">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg"/>
            <small v-if="totalInCart" id="lblCartCount">{{totalInCart}}</small>
        </a>
        <a @click.prevent class="text-black cursor-pointer">
            <font-awesome-icon :icon="['fas', 'search']" size="lg"/>
        </a>
    </div>
   </nav>
</template>

<script>
export default {
  computed: {
    totalInCart() {
      const cart = this.$store.getters['cart/productsCart']
      return Object.keys(cart).reduce((acc, key) => acc+= cart[key].quantity ,0)
    }
  }
}
</script>

<style scoped>
#lblCartCount {
    position: absolute;
    font-size: 12px;
    background: #10B981;
    color: #fff;
    padding: 0 6px;
    border-radius: 50%;
    top: -6px;
    right: -12px;
}
</style>


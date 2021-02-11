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
    </ul>
    <div class="my-auto mr-14">
        <a @click.prevent="$router.push({name: 'cart'})" class="cursor-pointer text-black">
            <font-awesome-icon class="mr-6" :icon="['fas', 'shopping-cart']" size="lg"/>
        </a>
        <a @click.prevent class="text-black cursor-pointer">
            <font-awesome-icon :icon="['fas', 'search']" size="lg"/>
        </a>
    </div>
   </nav>
</template>

<script>
import AppLink from './ui/AppLink.vue'
export default {
  components: { AppLink },
}
</script>


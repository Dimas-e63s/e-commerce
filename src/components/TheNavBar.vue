<template>
   <nav class="navbar">
         <h3>
             <router-link :to="{name: 'shop'}">Online Shop</router-link>
         </h3>
       <ul class="navbar-menu">
         <li>
             <router-link :to="{name: 'shop'}">Shop</router-link>
         </li>
         <li>
             <router-link :to="{name: 'cart'}">Cart</router-link>
         </li>
       </ul>
   </nav>
</template>

<script>
export default {
       
}
</script>

<style lang="scss" scoped>

</style>
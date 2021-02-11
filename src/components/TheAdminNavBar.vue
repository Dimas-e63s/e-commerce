<template>
   <nav class="navbar">
         <h3>
             <router-link :to="{name: 'products'}">Admin Page</router-link>
         </h3>
       <ul class="navbar-menu">
         <li>
             <router-link :to="{name: 'products'}">Products</router-link>
         </li>
         <li>
             <router-link :to="{name: 'categories'}">Categories</router-link>
         </li>
         <li>
           <a href="#" @click.prevent="logout">Logout</a>
        </li>
       </ul>
   </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('auth/DELETE_TOKEN')
      this.$router.push({name: 'auth'})
    }
  }
}
</script>

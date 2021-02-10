<template>
    <TheAdminNavBar/>
    <div class="container with-nav">
      <div class="card">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import TheAdminNavBar from '@/components/TheAdminNavBar.vue';
export default {
  components: {
    TheAdminNavBar,
  },      
}
</script>
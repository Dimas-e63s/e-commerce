<template>
  <TheAdminNavBar />
  <div class="container bg-white with-nav">
    <div class="card bg-white">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheAdminNavBar from '@/components/TheAdminNavBar.vue';
export default {
  components: {
    TheAdminNavBar
  }
};
</script>

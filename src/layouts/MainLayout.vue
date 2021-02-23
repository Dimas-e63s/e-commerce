<template>
  <TheHeader />
  <TheNavBar />
  <div class="container with-nav">
    <router-view></router-view>
  </div>
  <TheFooter />
</template>

<script>
import TheNavBar from '@/components/TheNavBar.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
export default {
  components: {
    TheNavBar,
    TheHeader,
    TheFooter
  }
};
</script>

<template>
  <TheHeader/>
    <TheNavBar/>
    <div class="container with-nav">
        <router-view></router-view>
    </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar.vue';
import TheHeader from '../components/TheHeader.vue';
export default {
  components: {
    TheNavBar,
    TheHeader,
  },      
}
</script>

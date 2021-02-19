<template>
<div class="w-2/4 h-screen mx-auto bg-white my-auto">
   <div class="flex w-full justify-center mt-8">
      <button
      v-for="(tab, key) in tabs" 
      :class="['tab', { active: currentTab === key }]"
      :key="key"
      @click="currentTab = key"
      >{{tab}}</button>
   </div>
   <component :is="currentTab"/>
   </div>
</template>

<script>
import {ref} from 'vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
export default {
  components: {
    Login,
    Register
  },
  setup() {   
		const currentTab = ref('Login')
    const tabs = {
      'Login': 'Already registerd?',
      'Register': 'New to Renoshop?'
    }

   return {
      currentTab,
      tabs,
   }

   }     
}
</script>

<style scoped>
.tab {
   text-align: center;
   vertical-align: middle;
   line-height: 4rem;
   width: 14rem;
   height: 4rem;
   border-bottom: 1px solid black;
   text-transform: uppercase;
   font-family: 'Roboto';
   font-weight: 500;
   outline: none;
}

.tab.active  {
  border: 1px solid black;
  border-bottom: none;
}
</style>

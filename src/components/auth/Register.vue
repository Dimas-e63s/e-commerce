<template>
  <app-dynamic-form 
    :schema="registerSchema"
    @submited="register"
    class="p-8"
  >
    <template #default>
        Sign Up with Email
    </template>
    <template #footer>
      <div class="text-center mb-8">
        <button 
            class="px-10 py-2 mt-2 border uppercase bg-gray-900 text-white"
        >Register</button>
     </div> 
    </template>
  </app-dynamic-form>
</template>

<script>
import AppDynamicForm from '../ui/AppDynamicForm.vue'
import {registerSchema} from '@/utils/schemes.js'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
export default {
  components: { AppDynamicForm },
setup () {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  
  const register = async val => {
    await store.dispatch('auth/register', val)
    const path = route.query.goTo ? {name: route.query.goTo} : '/'
    router.push(path)
  }

  return {
    registerSchema,
    register
  }
}
}
</script>

<style lang="scss" scoped>

</style>
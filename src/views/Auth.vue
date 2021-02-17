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
   {{dynamicBtn.method}}
   <form @submit.prevent="onSubmit()" class="p-8">
     <h2  class="uppercase font-poppins py-8 mb-8 text-center">{{dynamicBtn.label}} with Email</h2>
     <div v-if="currentTab === 'register'" :class="['form-control', {'invalid': nMessage}]">
        <label for="name" class="font-roboto text-gray-900 pb">Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="name"
          v-on="nameListeners"
         >
        <small v-if="nMessage">{{ nMessage }}</small>
     </div>
     <div :class="['form-control', {'invalid': eMessage}]">
        <label for="email" class="font-roboto text-gray-900 pb">Email</label>
        <input 
          type="text" 
          id="email" 
          v-model="email"
          v-on="emailListeners"
         >
        <small v-if="eMessage">{{ eMessage }}</small>
     </div>
     <div :class="['form-control', {'invalid': pMessage}]">
        <label class="font-roboto text-gray-900 pb" for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password"
          v-on="passwordListeners"
        >
        <small v-if="pMessage">{{ pMessage }}</small>
     </div>
     <div class="text-center mb-8">
       <button 
         class="px-10 py-2 mt-2 border uppercase bg-gray-900 text-white"
       >{{dynamicBtn.text}}</button>
     </div>
   <p class="text-black text-center block hover:underline">Forgot password?</p>
   </form>
   </div>
</template>

<script>
import {useLoginForm} from '@/use/loginForm.js'
import {computed, ref} from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    AppInput,
  },
  setup() {   
		const currentTab = ref('login')
		const store = useStore()
    const tabs = {
      'login': 'Already registerd?',
      'register': 'New to Renoshop?'
    }

    const login = (val) => store.dispatch('auth/login', {...val, returnSecureToken: true})
    const register = (val) => store.dispatch('auth/register', {...val, returnSecureToken: true})

		const loginSet = {
			text: 'Login',
			label: 'Sign In',
			method: login
		}

		const registerSet = {
			text:' Register',
			label: 'Sign Up',
			method: register
		}

    const dynamicBtn = computed(() => 
      currentTab.value === 'login' 
      ? loginSet
      : registerSet
     )

      const {
       email,
       isSubmitting,
       eMessage,
       emailListeners,
      //  onSubmit,
      handleSubmit,
       password,
       pMessage,
       passwordListeners,
      //  registerSet,
      //  loginSet,
       nameListeners,
       name,
       nMessage
       } = useLoginForm()

       const onSubmit = handleSubmit(async val => {
          try {
            dynamicBtn.value.method(val)
          } catch (error) {
             
          }
       })


   return {
      email,
      isSubmitting,
      eMessage,
      emailListeners,
      onSubmit,
      password,
      pMessage,
      passwordListeners,
      currentTab,
      tabs,
      dynamicBtn,
      nameListeners,
      name,
      nMessage,
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

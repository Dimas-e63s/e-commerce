<template>
   <form @submit="onSubmit">
     <h2>Sign In</h2>
     <div :class="['form-control', {'invalid': eMessage}]">
        <label for="email">Email</label>
        <input 
          type="text" 
          id="email" 
          v-model="email"
          v-on="emailListeners"
         >
        <small v-if="eMessage">{{ eMessage }}</small>
     </div>
     <div :class="['form-control', {'invalid': pMessage}]">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          :value="password"
          v-on="passwordListeners"
        >
        <small v-if="pMessage">{{ pMessage }}</small>
     </div>
     <button 
       class="btn primary"
       :disabled="isSubmitting"
      >Login</button>
   </form>
</template>

<script>
import {useLoginForm} from '@/use/loginForm.js';
export default {
   setup() {
     const {
      email,
      isSubmitting,
      eMessage,
      emailListeners,
      onSubmit,
      password,
      pMessage,
      passwordListeners
      } = useLoginForm()

   return {
      email,
      isSubmitting,
      eMessage,
      emailListeners,
      onSubmit,
      password,
      pMessage,
      passwordListeners
   }

   }     
}
</script>

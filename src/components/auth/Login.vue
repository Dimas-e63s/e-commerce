<template>
  <app-dynamic-form :schema="loginSchema" @submited="login" class="p-8">
    <template #default class="text-center">
      <h4 class="uppercase text-center font-poppins mt-16">
        Sign In with Email
      </h4>
    </template>
    <template #footer>
      <div class="text-center mb-8">
        <button class="px-10 py-2 mt-2 border uppercase bg-gray-900 text-white">
          Login
        </button>
      </div>
    </template>
  </app-dynamic-form>
</template>

<script>
import AppDynamicForm from '@/components/ui/AppDynamicForm.vue';
import { loginSchema } from '@/utils/schemes.js';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
export default {
  components: { AppDynamicForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const login = async val => {
      store.dispatch('auth/login', val);
      const path = route.query.goTo ? { name: route.query.goTo } : '/';
      router.push(path);
    };

    return {
      loginSchema,
      login
    };
  }
};
</script>

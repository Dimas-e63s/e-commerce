<template>
  <component :is="componentName"></component>
</template>

<script>
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: {
    MainLayout,
    AuthLayout,
    AdminLayout
  },
  setup() {
    const route = useRoute();
    const componentName = computed(() => {
      return `${route.meta.layout}-layout`;
    });
    console.log(process.env.VUE_APP_MY_ENV_VARIABLE);

    return {
      componentName
    };
  }
};
</script>

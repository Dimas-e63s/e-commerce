<template>
  <AppPage title="Заявки">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <ProductsList />
  </AppPage>

  <teleport to="body">
    <AppModal v-if="modal" @close="modal = false">
      <AppDynamicForm :schema="productSchema" @submited="onSubmit"
        >Создать продукт</AppDynamicForm
      >
    </AppModal>
  </teleport>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import AppPage from '@/components/ui/AppPage.vue';
import AppModal from '@/components/ui/AppModal.vue';
import AppDynamicForm from '@/components/ui/AppDynamicForm.vue';
import { productSchema } from '@/utils/schemes.js';
import ProductsList from '@/components/admin/ProductsList.vue';
export default {
  components: {
    AppPage,
    AppModal,
    AppDynamicForm,
    ProductsList
  },
  setup() {
    const store = useStore();
    const modal = ref(false);

    const onSubmit = val => {
      store.dispatch('products/addProduct', { ...val, id: Date.now() });
      modal.value = false;
    };

    return {
      productSchema,
      onSubmit,
      modal
    };
  }
};
</script>

<template>
  <AppPage title="Категории">
    <template #header>
      <button 
        class="btn primary"
        @click="modal = true"
      >Создать</button>
    </template>
     <CategoryTable/>
  </AppPage>
  <teleport to="body">
    <AppModal
      v-if="modal"
      @close="modal = false"
    >
     <AppDynamicForm 
        :schema="categorySchema" 
        @submited="onSubmit"
     >Создать новую увтегорию
     <template #footer><button>create</button></template>
     </AppDynamicForm>
    </AppModal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue';
import AppModal from '@/components/ui/AppModal.vue';
import CategoryTable from '../../components/admin/CategoryTable.vue';
import AppDynamicForm from '@/components/ui/AppDynamicForm.vue';
import {categorySchema} from'@/utils/schemes.js'
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  components: {
    AppPage,
    AppModal,
    CategoryTable,
    AppDynamicForm
  },  
  setup() {
    const modal = ref(false)
    const store = useStore()

    const onSubmit = payload => {
      store.dispatch('products/addCategory', {...payload, id: Date.now()})
      modal.value = false
    }

    return {
      modal,
      categorySchema,
      onSubmit
    }
  }    
}
</script>

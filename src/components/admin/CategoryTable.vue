<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Тип</th>
        <th>Удалить</th>
      </tr>
    </thead>
    <tbody>
      <CategoryTableItem
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @delete="confirmRemove"
      />
    </tbody>
  </table>
  <teleport to="body">
    <AppConfirm
      v-if="confirm"
      title="Вы дествительно хотите удалить данную категорию?"
      @reject="confirm = false"
      @confirm="deleteCategory"
    />
  </teleport>
</template>

<script>
import CategoryTableItem from '@/components/admin/CategoryTableItem.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AppConfirm from '@/components/ui/AppConfirm.vue';
export default {
  components: {
    CategoryTableItem,
    AppConfirm
  },
  setup() {
    const store = useStore();
    const confirm = ref(false);
    const categoryId = ref(false);
    const categories = computed(() => store.getters['categories/categories']);

    const confirmRemove = id => {
      categoryId.value = id;
      confirm.value = true;
    };

    const deleteCategory = () => {
      store.dispatch('categories/deleteCategory', categoryId.value);
      confirm.value = false;
    };

    return {
      categories,
      confirm,
      deleteCategory,
      confirmRemove
    };
  }
};
</script>

<style lang="scss" scoped></style>

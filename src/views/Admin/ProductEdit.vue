<template>
  <div class="product-preview">
    <h2>{{ initial.title }}</h2>
    <div class="product-preview__image">
      <img :src="initial.img" :alt="initial.title" />
    </div>
  </div>
  <AppInput v-model="product.title" label="Название" type="text" />
  <AppInput v-model="product.img" label="Изображение" type="text" />
  <AppInput v-model="product.price" label="Цена" type="number" />
  <AppInput v-model="product.count" label="Количество" type="number" />
  <AppSelect
    v-model="product.category"
    :options="categories"
    label="Категория"
  />
  <div class="product-edit__actions">
    <button class="btn danger" @click="confirm = true">Delete</button>
    <button v-if="hasChanges" class="btn" @click="updateProduct">Update</button>
  </div>

  <teleport to="body">
    <AppConfirm
      v-if="leave"
      title="Есть несохраненные изменения. Хотите покинуть страницу?"
      @confirm="navigate"
      @reject="leave = false"
    />
  </teleport>

  <teleport to="body">
    <AppConfirm
      v-if="confirm"
      title="Вы действительно хотите удалить этот товар?"
      @confirm="removeProduct"
      @reject="confirm = false"
    />
  </teleport>
</template>

<script>
import AppInput from '@/components/ui/AppInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import AppConfirm from '@/components/ui/AppConfirm.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useLeaveGuard } from '@/use/leaveGuard.js';

export default {
  components: {
    AppInput,
    AppSelect,
    AppConfirm
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const product = computed(() =>
      store.getters['products/getProductById'](props.id)
    );
    const categories = computed(() => store.getters['products/categories']);
    const initial = ref({ ...product.value });
    const updateProduct = () => {
      store.dispatch('products/update', product.value);
      initial.value = product.value;
    };
    const removeProduct = () => {
      confirm.value = false;
      store.dispatch('products/delete', product.value.id);
      router.push({ name: 'products' });
    };

    const confirm = ref(false);
    const hasChanges = computed(() => {
      return Object.keys(initial.value).some(key => {
        return initial.value[key] !== product.value[key];
      });
    });
    const { leave, navigate } = useLeaveGuard(hasChanges);

    return {
      product,
      initial,
      hasChanges,
      categories,
      updateProduct,
      confirm,
      leave,
      navigate,
      removeProduct
    };
  }
};
</script>

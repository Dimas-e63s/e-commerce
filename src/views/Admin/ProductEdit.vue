<template>
  <AppDynamicForm :schema="schema"/>
</template>

<script>
import AppDynamicForm from '@/components/ui/AppDynamicForm.vue';
import {productEditSchema} from '@/utils/schemes.js'
import { computed } from 'vue'
import { useStore } from 'vuex';
export default {
  components: {
    AppDynamicForm,
  }, 
  setup(props) {
    const store = useStore()
    const product = computed(() => store.getters['products/getProductById'](props.id))

    const schema = {...productEditSchema, values: product}

    return {
      schema
    }
  }       
}
</script>

<style lang="scss" scoped>

</style>
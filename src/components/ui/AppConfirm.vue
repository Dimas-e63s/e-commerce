<template>
   <AppModal :title="title" @close="$emit('reject')">
      <button 
        class="btn primary"
        @click="$emit('confirm')"
      >Yes</button>
      <button 
        class="btn danger"
        @click="$emit('reject')"
      >No</button>
   </AppModal>
</template>

<script>
import AppModal from './AppModal.vue'
export default {
  components: { AppModal },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ['reject', 'confirm']     
}
</script>

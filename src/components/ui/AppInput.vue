<template>
  <div :class="[containerClass, 'form-control', {'invalid': error}]">
    <label 
      class="label font-roboto form-control__label--small" 
      for="label"
    >{{label}}<small class="form-control__asterick" v-if="required">*</small></label>
    <input 
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
    >
    <small v-if="error">{{error}}</small>
  </div>
 </template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      required: true
    },
    placeholder: {
      type: [String, Number],
      required: false
    },
    label: {
      type: String,
      required: false
    },
    error: {
      required: false
    },
    containerClass: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      
    }
  },
  emits: ['update:modelValue']        
}
</script>

<style scoped>
.form-control__asterick {
  color: #DC2626;
}

.form-control__label--small {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
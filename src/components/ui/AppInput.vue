<template>
   <div :class="['form-control', {'invalid': error}]">
       <label for="label">{{label}}</label>
       <input 
         v-bind="$attrs" 
         :value="modelValue"
         :placeholder="placeholder"
         @input="$emit('update:modelValue', $event.target.value)"
       >
       <slot name="end"></slot>
   </div>
 </template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
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
    }
  },
  emits: ['update:modelValue']        
}
</script>

<style lang="scss" scoped>

</style>
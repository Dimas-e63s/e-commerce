<template>
   <div :class="[containerClass, 'form-control', {'invalid': error}]">
       <label class="text-sm font-roboto text-gray-500" for="label">{{label}} <small class="text-red-600" v-if="required">*</small> </label>
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

<style lang="scss" scoped>

</style>
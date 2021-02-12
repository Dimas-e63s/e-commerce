<template>
   <div class="form-control h-11">
    <label 
      v-if="label"
      class="font-roboto text-gray-500"
    >{{ label }}</label>
    <select 
      class="h-11"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option 
        v-for="opt in options"
        :key="opt.type"
        :value="opt.type"
        :selected="modelValue === opt.type"
      >{{ opt.title }}</option>
    </select>
   </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: false
    }
  }        
}
</script>

<style lang="scss" scoped>

</style>
<template>
   <div class="form-control">
    <label v-if="label">{{ label }}</label>
    <select 
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
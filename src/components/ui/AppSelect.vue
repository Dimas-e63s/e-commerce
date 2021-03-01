<template>
  <div class="form-control">
    <label v-if="label" class="label font-roboto">{{ label }}</label>
    <select
      v-bind="$attrs"
      class="form-control__select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="opt in options"
        :key="opt.type"
        :value="opt.type"
        :selected="modelValue === opt.type"
        >{{ opt.title }}</option
      >
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
};
</script>

<style scoped>
.form-control__select {
  height: 2.75rem;
}
</style>

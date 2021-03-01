<template>
  <slot></slot>
  <Form
    :validation-schema="schema.validation"
    :initial-values="schema.values"
    @submit="onSubmit"
    v-slot="{ errors }"
    v-bind="$attrs"
  >
    <div
      v-for="{
        as,
        name,
        label,
        labelClass,
        children,
        ...attrs
      } in schema.fields"
      :key="name"
      :class="['form-control', { invalid: errors[name] }, attrs.class]"
    >
      <label
        v-if="label"
        class="font-roboto label"
        :class="labelClass"
        :for="name"
        >{{ label }}</label
      >
      <Field :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component
            class="font-roboto label"
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs"
            >{{ text }}</component
          >
        </template>
      </Field>
      <ErrorMessage as="small" :name="name" class="invalid" />
    </div>
    <slot name="footer" />
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Field,
    Form,
    ErrorMessage
  },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  emits: ['submited'],
  setup(_, { slots, emit }) {
    const onSubmit = val => emit('submited', val);
    return {
      slots,
      onSubmit
    };
  }
};
</script>

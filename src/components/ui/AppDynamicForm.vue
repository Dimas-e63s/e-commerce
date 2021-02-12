<template>
  <h4 v-if="slots" class="uppercase font-poppins py-8"><slot/></h4>
  <Form 
    :validation-schema="schema.validation" 
    :initial-values="schema.values"
    @submit="onSubmit"
    v-slot="{errors}"
    class="pt-4"
  >
      <div 
        v-for="{as, name, label, children, ...attrs} in schema.fields" 
        :key="name" 
        :class="['form-control', {'invalid': errors[name]}]">
        <label class="font-roboto text-gray-500 pb" :for="name">{{ label }}</label> 
        <Field 
          :as="as" 
          :id="name" 
          :name="name" 
          v-bind="attrs">
          <template v-if="children && children.length">
              <component 
                class="font-roboto text-gray-500"
                v-for="({ tag, text, ...childAttrs }, idx) in children" 
                :key="idx" 
                :is="tag"
                v-bind="childAttrs"
                >{{text}}</component>
          </template>
        </Field>
        <ErrorMessage 
          as="small" 
          :name="name" 
          class="invalid"/>
    </div>
      <slot name="footer"/>
   </Form> 
</template>

<script>
import {Field, Form, ErrorMessage} from 'vee-validate'
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
  setup(_, {slots,emit}) {
    const onSubmit = (val) => emit('submited', val)
    return {
      slots,
      onSubmit
    }
  }
}   
</script>
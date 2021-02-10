<template>
  <h2 v-if="slots"><slot/></h2>
  <Form 
    :validation-schema="schema.validation" 
    :initial-values="schema.values"
    @submit="onSubmit"
    v-slot="{errors}"
  >
      <div 
        v-for="{as, name, label, children, ...attrs} in schema.fields" 
        :key="name" 
        :class="['form-control', {'invalid': errors[name]}]">
        <label :for="name">{{ label }}</label> 
        <Field 
          :as="as" 
          :id="name" 
          :name="name" 
          v-bind="attrs">
          <template v-if="children && children.length">
              <component 
                v-for="{ tag, text, ...childAttrs }, idx) in children" 
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
    <button class="btn primary">Создать</button>
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
  setup(_, {slots}) {
    function onSubmit(val) {
      this.$emit('submited', val)
    }
    return {
      slots,
      onSubmit
    }
  }
}   
</script>
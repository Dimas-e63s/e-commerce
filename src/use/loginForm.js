import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import { computed } from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()

  const {
    value: email,
    errorMessage: eMessage,
    handleChange: eChange,
    handleInput: eInput
  } = useField('email', 
    yup.string().trim().email('Please enter a valid email').required('Email is required field'),
    {validateOnValueUpdate: false})

  const {
    value: password,
    errorMessage: pMessage,
    handleChange: pChange,
    handleInput: pInput

  } = useField('password',
    yup.string().trim().required('Password is required field').min(6, 'Password must be at least 6 characters'),
    {validateOnValueUpdate: false})
  
    const passwordListeners = computed(() => {
        const base = {
            blur: pChange,
            change: pChange 
        }
        if (!pMessage.value) {
          return {
            ...base,
            input: pInput,
          };
        }
  
        // Aggressive
        return {
          ...base,
          input: pChange, // only switched this
        };
      })

      const emailListeners = computed(() => {
        const base = {
            blur: eChange,
            change: eChange 
        }
        if (!eMessage.value) {
          return {
            ...base,
            input: eInput,
          };
        }
  
        // Aggressive
        return {
          ...base,
          input: eChange, // only switched this
        };
      })

  const onSubmit = handleSubmit(async val => {
    try {
      await store.dispatch('auth/authentication', {
        ...val,
        type: 'login'
      })
      router.push({name: 'products'})
    } catch (e) {
      console.log(e.message);
    }
  })

  return {
    onSubmit,
    isSubmitting,
    email,
    eMessage,
    emailListeners,
    password,
    pMessage,
    passwordListeners
  }

}
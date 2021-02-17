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

  const {
    value: name,
    errorMessage: nMessage,
    handleChange: nChange,
    handleInput: nInput
  } = useField('name',
    yup.string().trim().required('Name is required field'),
    {validateOnValueUpdate: false}
  )
  
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
    const nameListeners = computed(() => {
      const base = {
        blur: nChange,
        change: nChange 
    }
    if (!nMessage.value) {
      return {
        ...base,
        input: nInput,
      };
    }

    // Aggressive
    return {
      ...base,
      input: nChange, // only switched this
    };
    })

  // const onSubmit = fn => handleSubmit(async val => {
  //   try {
  //     console.log('get executed');
  //     await fn(val)
  //     router.push({name: 'products'})
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // })

  const login = (val) => {
    store.dispatch('auth/login', {...val, returnSecureToken: true})
  }
  const register = (val) => store.dispatch('auth/register', {...val, returnSecureToken: true})

  const loginSet = {
    text: 'Login',
    label: 'Sign In',
    method: login
  }

  const registerSet = {
    text:' Register',
    label: 'Sign Up',
    method: register
  }

  return {
    isSubmitting,
    email,
    eMessage,
    emailListeners,
    password,
    pMessage,
    passwordListeners,
    name,
    nMessage,
    nameListeners,
    loginSet,
    registerSet,
    handleSubmit,
    // onSubmit
  }

}
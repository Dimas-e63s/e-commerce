import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import { computed } from 'vue'

export function useCheckoutForm() {
  const {handleSubmit, isSubmitting} = useForm()

  const {
    value: email,
    errorMessage: emailMessage,
    handleChange: emailChange,
    handleInput: emailInput
  } = useField('email', 
    yup.string().trim().email('Please enter a valid email').required('Email is required field'),
    {validateOnValueUpdate: false})

  const {
    value: firstName,
    errorMessage: firstNameMessage,
    handleChange: firstNameChange,
    handleInput: firstNameInput
  } = useField('firstName',
    yup.string().trim().required('First Name is required field'),
    {validateOnValueUpdate: false}
  )

  const {
    value: lastName,
    errorMessage: lastNameMessage,
    handleChange: lastNameChange,
    handleInput: lastNameInput
  } = useField('lastName',
    yup.string().trim().required('Last Name is required field'),
    {validateOnValueUpdate: false}
  )

  const {
    value: address,
    errorMessage: addressMessage,
    handleChange: addressChange,
    handleInput: addressInput
  } = useField('address',
    yup.string().trim().required('Address is required field'),
    {validateOnValueUpdate: false}
  )

  const {
    value: city,
    errorMessage: cityMessage,
    handleChange: cityChange,
    handleInput: cityInput
  } = useField('city',
    yup.string().trim().required('City is required field'),
    {validateOnValueUpdate: false}
  )

  const {
    value: phone,
    errorMessage: phoneMessage,
    handleChange: phoneChange,
    handleInput: phoneInput
  } = useField('phone',
    yup.string().trim().required('Phone is required field'),
    {validateOnValueUpdate: false}
  ) 

  const {value: company, handleChange: companyChange} = useField('company', yup.string())
  const {value: zipCode, handleChange: zipChange} = useField('zipCode', yup.string())
  
  
    const firstNameListeners = computed(() => {
      const base = {
        blur: firstNameChange,
        change: firstNameChange 
    }
    if (!firstNameMessage.value) {
      return {
        ...base,
        input: firstNameInput,
      };
    }

    // Aggressive
    return {
      ...base,
      input: firstNameChange, // only switched this
    };
    })

    const lastNameListeners = computed(() => {
        const base = {
          blur: lastNameChange,
          change: lastNameChange 
      }
      if (!lastNameMessage.value) {
        return {
          ...base,
          input: lastNameInput,
        };
      }
  
      // Aggressive
      return {
        ...base,
        input: lastNameChange, // only switched this
      };
    })

    const addressListeners = computed(() => {
        const base = {
          blur: addressChange,
          change: addressChange 
      }
      if (!addressMessage.value) {
        return {
          ...base,
          input: addressInput,
        };
      }
  
      // Aggressive
      return {
        ...base,
        input: addressChange, // only switched this
      };
    })

    const cityListeners = computed(() => {
        const base = {
          blur: cityChange,
          change: cityChange 
      }
      if (!cityMessage.value) {
        return {
          ...base,
          input: cityInput,
        };
      }
  
      // Aggressive
      return {
        ...base,
        input: cityChange, // only switched this
      };
    })
    
    const emailListeners = computed(() => {
        const base = {
          blur: emailChange,
          change: emailChange 
      }
      if (!emailMessage.value) {
        return {
          ...base,
          input: emailInput,
        };
      }
  
      // Aggressive
      return {
        ...base,
        input: emailChange, // only switched this
      };
    })

    const phoneListeners = computed(() => {
        const base = {
          blur: phoneChange,
          change: phoneChange 
      }
      if (!phoneMessage.value) {
        return {
          ...base,
          input: phoneInput,
        };
      }
  
      // Aggressive
      return {
        ...base,
        input: emailChange, // only switched this
      };
    })

    const onSubmit = handleSubmit(async val => {
      try {
        console.log(val);
      } catch (e) {
        console.log(e.message);
      }
    })

  return {
    isSubmitting,
    email,
    emailMessage,
    emailListeners,
    firstName,
    firstNameMessage,
    firstNameListeners,
    lastName,
    lastNameMessage,
    lastNameListeners,
    address,
    addressMessage,
    addressListeners,
    city,
    cityMessage,
    cityListeners,
    phone,
    phoneMessage,
    phoneListeners,
    company,
    companyListeners: {change: companyChange},
    zipCode,
    zipListeners: {change: zipChange},
    onSubmit,
    handleSubmit
  }

}
import * as yup from 'yup'

const postZIP = {
  label: 'Postcode/Zip',
  name: 'postcode',
  as: 'input',
  type: 'text',
  placeholder: 'Postcode/Zip'
}

const country = {
  label: 'Select Country',
  name: 'country',
  as: 'select',
  children: [
    {id: 1, text: 'Poland', value: 'pl', tag: 'option'},
    {id: 2, text: 'United Kingdom', value: 'uk', tag: 'option'},
    {id: 3, text: 'US', value: 'us', tag: 'option'},
    {id: 4, text: 'France', value: 'fr', tag: 'option'},
    {id: 5, text: 'Germany', value: 'gr', tag: 'option'},
    {id: 6, text: 'Sweden', value: 'pl', tag: 'option'},
    {id: 7, text: 'Finland', value: 'pl', tag: 'option'},
    {id: 8, text: 'Italy', value: 'pl', tag: 'option'},
    {id: 9, text: 'Greece', value: 'pl',tag: 'option'},
  ]
}

const email = {
  name: 'email',
  as: 'input',
  type: 'email',
  placeholder: 'Your e-mail...'
}

const emailValidation = {email: yup.string().email('Please enter a valid e-mail').required('E-mail is required')}

export const productSchema = {
    fields: [
      {
        label: 'Название',
        name: 'title',
        as: 'input',
      },
      {
        label: 'Изображение',
        name: 'img',
        as: 'input',
      },
      {
        label: 'Цена',
        name: 'price',
        type: 'number',
        as: 'input',
      },
      {
        label: 'Количество',
        name: 'count',
        type: 'number',
        as: 'input',
      },
      {
        label: 'Категории',
        name: 'category',
        as: 'select',
        children: [
          {
            tag: 'option',
            value: '',
            text: ''
          },
          {
            tag: 'option',
            value: 'fruit',
            text: 'Фрукты'
          },
          {
            tag: 'option',
            value: 'vegetable',
            text: 'Овощи'
          },
          {
            tag: 'option',
            value: 'meat',
            text: 'Мясо'
          },
          {
            tag: 'option',
            value: 'fish',
            text: 'Рыба'
          },
          {
            tag: 'option',
            value: 'greens',
            text: 'Зелень'
          },
          {
            tag: 'option',
            value: 'berries',
            text: 'Ягоды'
          }
        ]
      }
      ],
    validation: yup.object().shape({
      title: yup.string().trim().required(),
      img: yup.string().required(),
      price: yup.number().required().min(10),
      count: yup.number().required().min(2),
      category: yup.string().required()
    }),
}

export const categorySchema = {
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      as: 'input',
    },
    {
      label: 'Type',
      name: 'type',
      type: 'text',
      as: 'input',
    },
  ]
}
export const searchSchema = {
  icon: 'search',
  url: '#',
  prefix: 'fas'
} 
export const availabilitySchema = {
  fields: [
    country,
    {
      label: 'Select State',
      name: 'state',
      as: 'select',
      children: [
        {id: 1, text: 'Poland', value: 'pl', tag: 'option'},
        {id: 2, text: 'United Kingdom', value: 'uk', tag: 'option'},
        {id: 3, text: 'US', value: 'us', tag: 'option'},
        {id: 4, text: 'France', value: 'fr', tag: 'option'},
        {id: 5, text: 'Germany', value: 'gr', tag: 'option'},
        {id: 6, text: 'Sweden', value: 'pl', tag: 'option'},
        {id: 7, text: 'Finland', value: 'pl', tag: 'option'},
        {id: 8, text: 'Italy', value: 'pl', tag: 'option'},
        {id: 9, text: 'Greece', value: 'pl',tag: 'option'},
      ]
    }, 
    postZIP
  ],
  validation: yup.object().shape({
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    postcode: yup.string().required('Postcode field is required').min(8, 'Postcode must be at least 8 characters'),
  })
}

export const reviewSchema = {
  fields: [
    {
      name: 'name',
      as: 'input',
      type: 'text',
      class: 'w-1/2 inline-block',
      placeholder: 'Your name...'
    },
    {...email, class: 'w-1/2 inline-block ml-4',},
  ],
  validation: yup.object().shape({
    name: yup.string().required('Name is required'),
    ...emailValidation,
  })
}

export const checkoutTopSchema = {
  fields: [
    {
      name: 'name',
      as: 'input',
      type: 'text',
      label: 'First Name',
      labelClass: 'text-black',
      class: 'w-1/2 text-black inline-block',
    },
    {
      name: 'last_name',
      as: 'input',
      type: 'text',
      label: 'Last Name',
      labelClass: 'text-black',
      class: 'w-1/2 inline-block text-black ml-4',
    },
  ],
  validation: yup.object().shape({
    name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
  })
}

export const checkoutMainSchema = {
  fields: [
    country,
    {
      name: 'company',
      as: 'input',
      type: 'text',
      label: 'Company Name',
      labelClass: 'text-black',
    },
    {
      name: 'address',
      as: 'input',
      type: 'text',
      label: 'Address',
      placeholder: 'Street address',
    },
    postZIP,
    {
      name: 'city',
      as: 'input',
      type: 'text',
      label: 'Town/City',
      placeholder: 'Town/City',
    },
  ],
  validation: yup.object().shape({
    address: yup.string().required('Address is required'),
    country: yup.string().required('Country is required'),
    city: yup.string().required('City field is required'),
  })
}

export const checkoutFootSchema = {
  fields: [
    {...email, label: 'Email Address', class: 'w-1/2 inline-block', placeholder: ''},
    {
      name: 'phone',
      as: 'input',
      type: 'text',
      label: 'Phone',
      class: 'ml-4 w-1/2'
    },
  ],
  validation: yup.object().shape({
    ...emailValidation,
    phone: yup.string().required('Phone Number is required')
  })
}

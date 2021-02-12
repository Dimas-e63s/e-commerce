import * as yup from 'yup'

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
export const availabilitySchema = {
  fields: [
    {
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
    },
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
    {
      label: 'Postcode/Zip',
      name: 'postcode',
      as: 'input',
      type: 'text',
      placeholder: 'Postcode/Zip'
    }
  ],
  validation: yup.object().shape({
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    postcode: yup.string().required('Postcode field is required').min(8, 'Postcode must be at least 8 characters'),
  })
}

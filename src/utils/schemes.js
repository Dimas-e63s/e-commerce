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

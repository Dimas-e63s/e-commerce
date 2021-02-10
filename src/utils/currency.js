const formatter = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})

export function currency(num) {
  return formatter.format(num)
}
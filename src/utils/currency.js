const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});

export function currency(num) {
  return formatter.format(num);
}

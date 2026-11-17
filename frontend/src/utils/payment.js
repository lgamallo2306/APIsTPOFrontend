// Pago simulado: no se conecta a ningún procesador. Los datos de la tarjeta solo se validan acá y no se guardan ni se mandan al back

// tarjeta de prueba para mostrar un rechazo: cualquier número que termine en 0000
export const isRejectedCard = (cardNumber) => cardNumber.endsWith('0000')

// "4111 1111 1111 1111" → "4111111111111111"
export const onlyDigits = (value) => value.split(' ').join('')

// devuelve el primer error del formulario, o '' si está todo bien
export const validateCard = (form) => {
  const number = onlyDigits(form.cardNumber)
  if (number.length !== 16 || isNaN(Number(number))) return 'El número de tarjeta tiene que tener 16 dígitos.'
  if (form.cardName.trim() === '') return 'Ingresá el nombre como figura en la tarjeta.'

  const parts = form.expiry.split('/')
  const month = Number(parts[0])
  const year = 2000 + Number(parts[1])
  if (parts.length !== 2 || parts[1] === undefined || parts[1].length !== 2 || month < 1 || month > 12 || isNaN(year)) {
    return 'El vencimiento tiene que tener el formato MM/AA.'
  }
  const today = new Date()
  // vence el último día del mes indicado
  if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1)) {
    return 'La tarjeta está vencida.'
  }

  if (form.cvv.length < 3 || form.cvv.length > 4 || isNaN(Number(form.cvv))) return 'El código de seguridad tiene 3 o 4 dígitos.'
  return ''
}

export const rules = {
  titleProduct: {
    required: { value: true, message: 'Titulo obligatorio' },
    maxLength: { value: 80, message: 'Maximo 80 letras' },
    minLength: { value: 3, message: 'Minimo 3 letras' },
    pattern: { value: /^[a-zA-ZÀ-ÿ0-9 ()-.]*$/, message: 'Titulo no permitido' }
  },

  descriptionProduct: {
    required: { value: true, message: 'Titulo obligatorio' },
    maxLength: { value: 80, message: 'Maximo 80 letras' },
    minLength: { value: 3, message: 'Minimo 3 letras' },
    pattern: { value: /^[a-zA-ZÀ-ÿ0-9 ()-.]*$/, message: 'Titulo no permitido' }
  },

  priceProduct: {
    required: { value: true, message: 'Precio obligatorio' },
    maxLength: { value: 8, message: 'Maximo 8 numeros' },
    minLength: { value: 1, message: 'Minimo 1 numeros' },
    pattern: { value: /^[0-9.,]*$/i, message: 'Solo Numeros' }
  }
}

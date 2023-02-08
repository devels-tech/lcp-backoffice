interface IFormConfig {
  email: {
    required: { value: boolean, message: string }
    pattern: { value: RegExp, message: string }
  }

  password: {
    required: { value: boolean, message: string }
    maxLength: { value: number, message: string }
    minLength: { value: number, message: string }
  }
}

export const rulesForm: IFormConfig = {
  password: {
    required: { value: true, message: 'Contraseña obligatoria' },
    maxLength: { value: 50, message: 'Maximo 50 Caracteres' },
    minLength: { value: 3, message: 'Minimo 3 Caracteres' }
  },

  email: {
    required: { value: true, message: 'Correo obligatorio' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Coloque un correo valido'
    }
  }
}

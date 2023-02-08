interface IRulesForm {
  title: {
    required: { value: boolean, message: string },
    maxLength: { value: number, message: string }
    minLength: { value: number, message: string }
    pattern: { value: RegExp, message: string }

  }
}

export const rulesForm: IRulesForm = {
  title: {
    required: { value: true, message: '* Es Requerido' },
    maxLength: { value: 60, message: '* Maximo 60 Caracteres' },
    minLength: { value: 3, message: '* Minimo 3 Caracteres' },
    pattern: { value: /^[a-zA-Z0-9\s]*$/, message: '* Caracteres no validos' }
  }
}

interface IRulesForm {
  required: { value: boolean, message: string }
}

export const rulesForm: IRulesForm = {
  required: { value: true, message: '* Es Requerido' }
}

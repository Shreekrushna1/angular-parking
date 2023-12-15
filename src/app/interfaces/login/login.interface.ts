export interface LoginInterface {
formTitle:string,
formSubmitTitle:string,
formControls:FormControls[],
}

export interface FormControls {
  name:string,
  placeholder:string,
  type:string,
  label:string,
  fieldType: string,
  validators:Validator[],
}

export interface Validator {
  message: string,
  required: boolean,
  pattern: string,
  minlength: number,
  validatorName:string
}
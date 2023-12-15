export const LoginForm = {
  formTitle: "Login",
  formSubmitTitle: "Submit",
  formControls: [
    {
      'name': "email",
      'placeholder': "Email",
      'label': "Email",
      'type': "email",
      'validators': [
        {
          'validatorName': 'required',
          'required': true,
          'message': "Email is required"
        },
        {
          'validatorName': 'email',
          'email': true,
          'message': "Please enter valid email"
        },
      ]
    },
    {
      'name': "password",
      'placeholder': "Password",
      'label': "Password",
      'type': "password",
      'validators': [
        {
          'validatorName': 'required',
          'required': true,
          'message': "password is required"
        },
        {
          'validatorName': 'minlength',
          'minlength': 8,
          'message': "password must be 8 characters"
        },
        {
          'validatorName': 'pattern',
          'pattern': '((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})',
          'message': "password must be one capital letter,small letter,symbol and number"
        },
      ]
    },
  ]
}
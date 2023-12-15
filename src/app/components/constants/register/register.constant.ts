export const RegisterForm = {
  formTitle:'Register Form',
  saveBtnTitle:'Register',
  resetBtnTitle:'Reset',
  formControls: [
    {
      "name":"firstName",
      "label":"First Name",
      "value":"",
      "placeholder":"First Name",
      "class":"form-control",
      "type":"text",
      "validators":[
        {
          "validatorName":"required",
          "required":true,
          "message":"First Name is Required"
        },
        {
          "validatorName": 'pattern',
          "pattern": true,
          "message": 'firstName cannot contain spaces',
        }
      ]
    },
    {
      "name":"lastName",
      "label":"Last Name",
      "value":"",
      "placeholder":"Last Name",
      "class":"form-control",
      "type":"text",
      "validators":[
        {
          "validatorName":"required",
          "required":true,
          "message":"Last Name is Required"
        },
        {
          "validatorName": 'pattern',
          "pattern": true,
          "message": 'lastName cannot contain spaces',
        }
      ]
    },
    {
      "name":"email",
      "label":"Email Address",
      "value":"",
      "placeholder":"Email Address",
      "class":"form-control",
      "type":"email",
      "validators":[
        {
          "validatorName":"required",
          "required":true,
          "message":"Email is Required"
        },
        {
          "validatorName":"email",
          "email": "email",
          "message":"email is invalid"
        }
      ]
    },
    {
      "name":"password",
      "label":"Password",
      "value":"",
      "placeholder":"Password",
      "class":"form-control",
      "type":"password",
      "validators":[
        {
          "validatorName":"required",
          "required":true,
          "message":"Password is Required"
        },
        {
          "validatorName":"minlength",
          "minlength":8,
          "message":"Password must be 8 character"
        },
        {
          "validatorName": 'pattern',
          "pattern": true,
          "message": 'Password cannot contain spaces',
        },
      ]
    },
    {
      "name":"confirmpassword",
      "label":"Confirm Password",
      "value":"",
      "placeholder":"Confirm Password",
      "class":"form-control",
      "type":"password",
      "validators":[
        {
          "validatorName":"required",
          "required":true,
          "message":"Username is Required"
        },
        {
          "validatorName": 'pattern',
          "pattern": true,
          "message": 'username cannot contain spaces',
        }
      ]
    },
    {
      "name":'cars',
      "fieldType":"array",
      "type": 'number',
      "placeholder":'Cars',
      "label":'cars'
    },
    {
      "name":'bikes',
      "fieldType":"array",
      "type": 'number',
      "placeholder":'Bikes',
      "label":'Bikes'
    },
  ]
}
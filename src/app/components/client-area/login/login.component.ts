import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../constants/login/login.constant';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormControls, Validator } from 'src/app/interfaces/login/login.interface';
import { WebService } from 'src/app/services/webservice/web.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder, private web: WebService, private router: Router) { }
  loginFormConfig = LoginForm;
  dynamicForm!: FormGroup;
  errorMessage: string = '';
  ngOnInit(): void {
    if (this.loginFormConfig.formControls) {
      let formGroup: any = {};
      this.loginFormConfig.formControls.forEach((control: any) => {
        let controlValidators: any = [];
        if (control.validators) {
          control.validators.forEach((val: Validator) => {
            if (val.validatorName === 'required') controlValidators.push(Validators.required);
            if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minlength as number));
            if (val.validatorName === 'email') controlValidators.push(Validators.email);
          })
        }
        formGroup[control.name] = [control.value || '', controlValidators]
      });
      this.dynamicForm = this.fb.group(formGroup);
    }
  }
  getGeneratedError(data: any, validatorName: string): any {
    if (validatorName === 'email') {
      const error = [data].find((res: any) => {
        if (res.name === validatorName) return res;
      });
    }
  }

  submitForm() {
    if (this.dynamicForm.valid) {
      this.web.getData('users').subscribe((res: any) => {
        res.map((response: any) => {
          if (this.dynamicForm.value.email === response.email && this.dynamicForm.value.password === response.password) {
            localStorage.setItem('currentUserEmail', response.email)
            this.router.navigate(['dashboard']);
          } else {
            this.errorMessage = 'Email/Password is invalid';
          }
        })
      })
    } else {
      Object.values(this.dynamicForm.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}

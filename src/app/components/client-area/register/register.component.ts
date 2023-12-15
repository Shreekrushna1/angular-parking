import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormControls, Validator } from 'src/app/interfaces/login/login.interface';
import { RegisterForm } from '../../constants/register/register.constant';
import { WebService } from 'src/app/services/webservice/web.service';
import { Router } from '@angular/router';
import { NzFormLayoutType } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: NonNullableFormBuilder, private web: WebService, private router:Router) { }
  registerFormConfig = RegisterForm;
  dynamicForm!: FormGroup;
  formLayout: NzFormLayoutType ='horizontal';
  ngOnInit(): void {
    if (this.registerFormConfig.formControls) {
      let formGroup: any = {};
      this.registerFormConfig.formControls.forEach((control: FormControls | any) => {
        let controlValidators: any = [];
        if (control.validators) {
          control.validators.forEach((val: Validator) => {
            if (val.validatorName === 'required') controlValidators.push(Validators.required);
            if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minlength as number));
            if (val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern));
            if (val.validatorName === 'email') controlValidators.push(Validators.email);
          })
        }
        if (!control.fieldType) {
          formGroup[control.name] = [control.value || '', controlValidators]
        } else {
          formGroup[control.name] = this.fb.array([], controlValidators);
        }
      });
      this.dynamicForm = this.fb.group(formGroup);
    }
  }

  getCarsControls(name: string): AbstractControl[] {
    return (this.dynamicForm.get(`${name}`) as FormArray).controls;
  }

  //pending
  getPreviousValue(name: any,cars:string): void {
    const carsControl = this.dynamicForm.get('cars');
    if (carsControl) {
      const previousValue = carsControl.value;
      const isValuePresent = previousValue.slice(1, Number(cars)).some((res: any) => {
        return res === name;
      });
      if (isValuePresent) {
        console.log('matched');
      }
    }
  }


  getError(controlName: string, currentValue: any): boolean {

    return false;
  }
  addCars(name: string, value: string) {
    let newArray = [];
    for (let i = 0; i < Number(value); i++) {
      const control = new FormControl(null, Validators.required);
      newArray.push(control);
    }
    const carsArray = this.dynamicForm.get(`${name}`) as FormArray;
    newArray.forEach(control => carsArray.push(control));
  }

  submitForm() {
    if (this.dynamicForm.valid) {
      this.web.postData('users', this.dynamicForm.value).subscribe((res) => {
        localStorage.setItem('currentUserEmail',this.dynamicForm.value.email);
        this.router.navigate(['dashboard']);
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

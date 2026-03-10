import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Supaservice } from '../../services/supaservice';
import { Router } from '@angular/router';

const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('password2');
  return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordValidator: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formulario: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  supaservice: Supaservice = inject(Supaservice);
  loggedData = signal<any>('');
  errorMessage = signal('');
  router: Router = inject(Router);

  constructor() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: passwordValidator
    }
  );
  }

  register() {
    const loginData = this.formulario.value;
    this.supaservice.register(loginData).then(data =>{
      console.log(data);
  
      this.loggedData.set(data);
      this.router.navigate(['/home']);
    }).catch((error: Error) => {
      this.errorMessage.set(error.message);
    });
  }

  get emailValidation() {
    if (this.formulario.controls['email']!.invalid && this.formulario.controls['email']!.touched) {
      return 'is-invalid';
    }
    if (this.formulario.controls['email']!.valid && this.formulario.controls['email']!.touched) {
      return 'is-valid';
    }
    return '';
  }

  get passwordValidation() {
    if (this.formulario.controls['password']!.invalid && this.formulario.controls['password']!.touched) {
      return 'is-invalid';
    }
    if (this.formulario.controls['password']!.valid && this.formulario.controls['password']!.touched) {
      return 'is-valid';
    }
    return '';
  }

  passwordNotValid(name: string) {
    return (this.formulario.controls[name].invalid && this.formulario.get(name)!.touched || this.formulario.hasError('passwordValidator'));
  }

  passwordValid(name: string) {
    return (this.formulario.get(name)!.valid && this.formulario.get(name)!.touched || !this.formulario.hasError('passwordValidator'));
  }

  get passwordCrossValidation() {
    if (this.formulario.hasError('passwordValidator') && this.formulario.get('password2')!.touched && this.formulario.get('password')!.touched) {
      return true;
    } else {
      return false;
    }
    return '';
  }
}

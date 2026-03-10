import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Supaservice } from '../../services/supaservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
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
    });
  }

  login() {
    const loginData = this.formulario.value;
    this.supaservice.login(loginData).then(data =>{
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
}
  
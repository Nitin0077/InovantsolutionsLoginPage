import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginObj: LoginData;
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
      
    this.loginObj = new LoginData();
  }



  onLogin() {
    const validEmail = 'eddy@yopmail.com';
    const validPassword = '123123';

    if (
      this.loginObj.email === validEmail &&
      this.loginObj.password === validPassword
    ) {
      
      this.router.navigate(['/profile']); 
    } else {
      alert('Login failed: Invalid static credentials');
    }
  }
}

export class LoginData {
  email: string;
  password: string;

  constructor() {
    this.email = 'eddy@yopmail.com';
    this.password = '123123';
  }

 
  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //   });
  // }

  //  onSubmit() {
  //   this.errorMessage = '';
  //   if (this.loginForm.valid) {
  //     this.loading = true;
  //     const { email, password } = this.loginForm.value;

  //     this.authService.login(email, password).subscribe({
  //       next: (token) => {
  //         this.loading = false;
  //        
  //         this.router.navigate(['/profile']);
  //       },
  //       error: (err) => {
  //         this.loading = false;
  //         this.errorMessage = err;
  //       },
  //     });
  //   } else {
  //     this.errorMessage = 'Please enter valid email and password';
  //   }
  // }
}





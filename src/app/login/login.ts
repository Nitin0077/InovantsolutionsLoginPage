import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid email and password.';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loading = true;

    this.authService.login(email, password).subscribe({
      next: (token: string) => {
        this.loading = false;
        console.log('Login successful, token:', token);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err;
      }
    });
  }
}

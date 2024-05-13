import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;
  rememberMe: boolean;
  constructor(private fb: FormBuilder,private authService : AuthService,private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Handle login logic here
    console.log(this.loginForm.value);
  }
  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(response => {
        // Handle the response from the backend
        console.log('Login successful:', response);
        this.router.navigate(['/user']);
        // Optionally, redirect the user to another page
      }, error => {
        console.error('Error logging in:', error);
        // Optionally, show an error message to the user
      });
  }
}

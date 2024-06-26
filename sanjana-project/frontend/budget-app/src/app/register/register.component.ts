import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constants';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ["", [ Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  get formControl() {
    return this.registerForm.controls;
  }


  Register(): void {
    let user = this.registerForm.getRawValue();


    if (this.registerForm.valid) {

      this.http
        .post(`${AppConstant.API_URL}/register`, user, {
          withCredentials: true,
        })
        .subscribe(
          (user: any) => {
            alert('Success User registered successfully');
            localStorage.setItem('user', user.user);
            // this.authService.isLoggedin=true;
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log(error);
            alert('Error');
          }
        );
    }
  }
}
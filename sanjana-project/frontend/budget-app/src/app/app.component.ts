// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tokenExpiry: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.authService.checkTokenExpiration().subscribe(
        expired => {
          if (expired) {
            this.tokenExpiry = true;
          } else {
            this.tokenExpiry = false;
          }
        }
      );
    }, 1000);
  }

  refreshToken(): void {
    this.authService.refreshToken().subscribe(
      () => {
        this.authService.isLoggedin = true;
        this.tokenExpiry = false;
      },
      error => {
        console.log(error);
        alert("Error");
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.authService.isLoggedin = false;
        localStorage.clear()
        this.tokenExpiry = false;
      },
      error => {
        console.log(error);
        alert("Error");
      }
    );
  }
}


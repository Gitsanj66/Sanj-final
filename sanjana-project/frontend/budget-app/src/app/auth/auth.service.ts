// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConstant } from '../app.constants';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public isLoggedin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${AppConstant.API_URL}/login`, { email, password }).pipe(
      tap(response => this.handleTokenResponse(response.token))
    );
  }

  refreshToken(): Observable<any> {
    const token = this.getToken();
    const email = localStorage.getItem("email");
    if (token && email) {    
      return this.http.post<any>(`${AppConstant.API_URL}/refresh-token`, { token, email }).pipe(
        tap(response => this.handleTokenResponse(response.token))
      );
    } else {
      return throwError("Token or email not available.");
    }
  }

  logout(): Observable<any> {
    localStorage.clear();
    return this.http.post<any>(`${AppConstant.API_URL}/logout`, {}).pipe(
      tap(() => this.handleLogout())
    );
  }

  private handleTokenResponse(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  private handleLogout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  checkTokenExpiration(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      if (expirationTime - currentTime < 20000) {
        return of(true); 
      } else if (expirationTime - currentTime <= 0) {
        this.handleLogout();
        return of(false);
      }
    }
    return of(false);
  }
}
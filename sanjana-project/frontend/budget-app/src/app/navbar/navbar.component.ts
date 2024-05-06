import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  menuItems: MenuItem[];

  constructor(private authService: AuthService, private router: Router) {
    this.menuItems = [
      { label: 'Budget Tracker', routerLink: ['/'] },
      { label: 'Dashboard', routerLink: ['/dashboard'] },
      { label: 'Budget', routerLink: ['/budget'] },
      { label: 'Expenses', routerLink: ['/expenses'] },
      { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout() }
    ];
  }

  logout(): void {
    this.authService.isLoggedin=false;

    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
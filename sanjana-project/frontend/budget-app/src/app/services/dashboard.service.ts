import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConstant.API_URL}/budgets`, { withCredentials: true });
  }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConstant.API_URL}/expenses`, { withCredentials: true });
  }

  getMonthlyExpenses(): Observable<any> {
    return this.http.get<any>(`${AppConstant.API_URL}/expenses/monthly`, { withCredentials: true });
  }
}

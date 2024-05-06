import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConstant.API_URL}/budgets`, { withCredentials: true });
  }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConstant.API_URL}/expenses`, { withCredentials: true });
  }

  addExpense(newExpense: any): Observable<any> {
    return this.http.post<any>(`${AppConstant.API_URL}/expenses`, newExpense, { withCredentials: true });
  }

  updateExpense(expense: any): Observable<any> {
    return this.http.put<any>(`${AppConstant.API_URL}/expenses/${expense._id}`, expense, { withCredentials: true });
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${AppConstant.API_URL}/expenses/${id}`, { withCredentials: true });
  }
}

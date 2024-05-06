import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConstant.API_URL}/budgets`, { withCredentials: true });
  }

  addBudget(newBudget: any): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}/budgets`, newBudget, { withCredentials: true });
  }

  deleteBudget(budgetId: string): Observable<any> {
    return this.http.delete(`${AppConstant.API_URL}/budgets/${budgetId}`, { withCredentials: true });
  }

  updateBudget(budget: any): Observable<any> {
    return this.http.put(`${AppConstant.API_URL}/budgets/${budget._id}`, budget, { withCredentials: true });
  }
}

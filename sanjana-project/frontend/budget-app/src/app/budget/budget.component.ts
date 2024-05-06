import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppConstant } from '../app.constants';
import { AuthService } from '../auth/auth.service';
import { BudgetService } from '../services/budget.service';
import { ExpensesService } from '../services/expense.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  budgets: any[] = [];
  clonedBudgets: any[] = [];
  newBudget: any = {};
titles=["Entertainment","Food","Groceries","Rent","Travel","Fees","Insurance","Others"];
  showAddBudgetRow: boolean = false;

  constructor(private authService: AuthService, private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetService.getBudgets().subscribe(
      (data) => {
        this.budgets = data; 
      },
      (error) => {
        console.error('Error fetching budgets:', error);
      }
    );
  }

  openAddBudgetDialog() {
    this.newBudget = {};
    this.showAddBudgetRow = true;
  }

  addBudget(newBudget: any): void {
    this.budgetService.addBudget(newBudget).subscribe(
      (data) => {
        this.getBudgets();
        this.showAddBudgetRow = false;
        this.newBudget = {};
      },
      (error) => {
        console.error('Error adding budget:', error);
      }
    );
  }

  onRowEditInit(budget: any, id: any) {
    
    this.clonedBudgets[id] = { ...budget };
  }

  onRowEditSave(budget: any, id: any) {
    delete this.clonedBudgets[id];
    this.budgetService.updateBudget(budget)
      .subscribe(
        (data) => {
          this.getBudgets();
        },
        (error) => {
          console.error('Error updating budget:', error);
        }
      );
  }

  cancelNewBudget() {
    this.showAddBudgetRow = false;
    this.newBudget = {};
  }

  onRowEditCancel(budget: any, index: number) {
    this.budgets[index] = this.clonedBudgets[index];
    delete this.clonedBudgets[index];
  }

  onRowDelete(rowData: any, ri: any) {
    this.budgetService.deleteBudget(rowData._id).subscribe(() => {
      this.getBudgets();
    });
  }
}
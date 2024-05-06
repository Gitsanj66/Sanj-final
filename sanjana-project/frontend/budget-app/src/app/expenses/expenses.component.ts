import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppConstant } from '../app.constants';
import { AuthService } from '../auth/auth.service';
import { BudgetService } from '../services/budget.service';
import { ExpensesService } from '../services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  displayedColumns: string[] = ['category', 'amount', 'ExpenseTitle', 'date', 'actions'];
  expenses: any[] = [];
  clonedExpenses: any[] = [];
  newExpense: any = {};
  budgets: any[] = [];
  categories: any[] = [];
  showAddExpenseRow: boolean = false;

  constructor(private authService: AuthService, private budgetService: BudgetService, private expenseService: ExpensesService) { }

  ngOnInit(): void {
    this.getBudgets();
    this.getExpenses();
  }

  getBudgets(): void {
    this.budgetService.getBudgets().subscribe(
      (data) => {
        this.budgets = data;
        this.categories = this.budgets.map((budget) => budget.title);
      },
      (error) => {
        console.error('Error fetching budgets:', error);
      }
    );
  }

  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(
      (data) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  openAddExpenseRow() {
    this.newExpense = {};
    this.showAddExpenseRow = true;
  }

  addExpense(newExpense: any): void {
    this.expenseService.addExpense(newExpense).subscribe(
      (data) => {
        console.log('Expense added successfully:', data);
        this.getExpenses();
        this.showAddExpenseRow = false;
        this.newExpense = {};
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }

  onRowEditInit(expense: any, id: any) {
    this.clonedExpenses[id] = { ...expense };
  }

  onRowEditSave(expense: any, id: any) {
    delete this.clonedExpenses[id];
    this.expenseService.updateExpense(expense)
      .subscribe(
        (data) => {
          console.log('Expense updated successfully:', data);
          this.getExpenses();
        },
        (error) => {
          console.error('Error updating expense:', error);
        }
      );
  }

  cancelNewExpense() {
    this.showAddExpenseRow = false;
    this.newExpense = {};
  }

  onRowEditCancel(expense: any, index: number) {
    this.expenses[index] = this.clonedExpenses[index];
    delete this.clonedExpenses[index];
  }

  onRowDelete(rowData: any, ri: any) {
    this.expenseService.deleteExpense(rowData._id).subscribe(() => {
      this.getExpenses();
    });
  }
}
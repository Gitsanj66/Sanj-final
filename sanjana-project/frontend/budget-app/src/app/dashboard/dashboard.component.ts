import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  template: `
  <app-navbar></app-navbar>
  <br>
  <br>
  <h2 style="text-align: center;">Dashboard</h2>
  <br>
  <br>
  <div class="container-fluid">
  <div class="row">
  <div class="col-md-5">
    <div #pieChartContainer style="height: 400px; width: 100%;"></div>
  </div>
  <div class="col-md-2"></div>
  <div class="col-md-5">
    <div #barChartContainer style="height: 400px; width: 100%;"></div>
</div>
  </div></div>
<div class="container-fluid">
  <div class="row">
<div class="col-md-3"></div>
<div class="col-md-6">
    <div #monthlyChartContainer style="height: 400px; width: 100%;"></div>
</div>
<div class="col-md-3"></div>
  </div>
</div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChartContainer', { static: true }) pieChartContainer!: ElementRef;
  @ViewChild('barChartContainer', { static: true }) barChartContainer!: ElementRef;
  @ViewChild('monthlyChartContainer', { static: true }) monthlyChartContainer!: ElementRef;

  budgets: any[] = [];
  expenses: any[] = [];
  monthlyExpenseData: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getBudgetsAndPieG();
    this.getmonthlyExpensesChart();
  }

  ngAfterViewInit() {}

  drawPieChart() {
    const pieData = this.budgets.map(budget => ({
      label: budget.title,
      value: budget.amount
    }));

    const canvas = document.createElement('canvas');
    this.pieChartContainer.nativeElement.appendChild(canvas);
    const pieChartCtx = canvas.getContext('2d');
    if (!pieChartCtx) return;

    new Chart(pieChartCtx, {
      type: 'pie',
      data: {
        labels: pieData.map(data => data.label),
        datasets: [{
          data: pieData.map(data => data.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  drawBarChart() {
    const barData = this.budgets.map(budget => ({
      label: budget.title,
      budget: budget.amount,
      expense: this.expenses.reduce((acc, expense) => expense.category === budget.title ? acc + expense.amount : acc, 0)
    }));

    const canvas = document.createElement('canvas');
    this.barChartContainer.nativeElement.appendChild(canvas);
    const barChartCtx = canvas.getContext('2d');
    if (!barChartCtx) return;

    new Chart(barChartCtx, {
      type: 'bar',
      data: {
        labels: barData.map(data => data.label),
        datasets: [{
          label: 'Budget',
          data: barData.map(data => data.budget),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }, {
          label: 'Expense',
          data: barData.map(data => data.expense),
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true
      }
    });
  }

  drawMonthlyChart() {
    const monthlyData = Object.entries(this.monthlyExpenseData).map(([month, expense]) => ({
      month,
      expense: expense || 0
    }));

    const canvas = document.createElement('canvas');
    this.monthlyChartContainer.nativeElement.appendChild(canvas);
    const monthlyChartCtx = canvas.getContext('2d');
    if (!monthlyChartCtx) return;

    new Chart(monthlyChartCtx, {
      type: 'bar',
      data: {
        labels: monthlyData.map(data => data.month),
        datasets: [{
          label: 'Monthly Expense',
          data: monthlyData.map(data => data.expense),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true
      }
    });
  }

  getBudgetsAndPieG() {
    this.dashboardService.getBudgets().subscribe(
      (budgets) => {
        this.budgets = budgets;
        this.dashboardService.getExpenses().subscribe(
          (expenses) => {
            this.expenses = expenses;
            this.drawPieChart();
            this.drawBarChart();
          },
          (error) => {
            console.error('Error fetching expenses:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching budgets:', error);
      }
    );
  }

  getmonthlyExpensesChart() {
    this.dashboardService.getMonthlyExpenses().subscribe(
      (data) => {
        this.monthlyExpenseData = data;
        this.drawMonthlyChart();
      },
      (error) => {
        console.error('Error fetching monthly expense data:', error);
      }
    );
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Orders</h2>
        <div></div>
      </div>

      <div class="orders-content">
        <div class="tabs">
          <div class="tab" 
               [class.active]="activeTab === 'all'" 
               (click)="setActiveTab('all')">
            All Orders
          </div>
          <div class="tab" 
               [class.active]="activeTab === 'active'" 
               (click)="setActiveTab('active')">
            Active
          </div>
          <div class="tab" 
               [class.active]="activeTab === 'completed'" 
               (click)="setActiveTab('completed')">
            Completed
          </div>
        </div>

        <div class="orders-list">
          <div class="order-item" *ngFor="let order of filteredOrders">
            <div class="order-header">
              <div class="order-id">Order #{{order.id}}</div>
              <div class="order-status" [class]="order.status">{{order.status}}</div>
            </div>
            <div class="order-details">
              <div class="order-type">{{order.type}}</div>
              <div class="order-amount">₹{{order.amount}}</div>
            </div>
            <div class="order-info">
              <div class="order-date">{{order.date}}</div>
              <div class="order-duration">{{order.duration}}</div>
            </div>
            <div class="order-progress" *ngIf="order.status === 'active'">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="order.progress"></div>
              </div>
              <div class="progress-text">{{order.progress}}% Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: #f5f7fa;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .back-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: #f0f0f0;
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .orders-content {
      padding: 20px;
    }

    .tabs {
      display: flex;
      background: white;
      border-radius: 16px;
      padding: 4px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .tab {
      flex: 1;
      padding: 12px;
      text-align: center;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 14px;
    }

    .tab.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .tab:not(.active) {
      color: #666;
    }

    .tab:not(.active):hover {
      background: #f8f9fa;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .order-item {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .order-id {
      font-weight: 600;
      color: #333;
    }

    .order-status {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .order-status.active {
      background: #e3f2fd;
      color: #1976d2;
    }

    .order-status.completed {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .order-status.pending {
      background: #fff3e0;
      color: #f57c00;
    }

    .order-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .order-type {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .order-amount {
      font-size: 18px;
      font-weight: 700;
      color: #667eea;
    }

    .order-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .order-date,
    .order-duration {
      font-size: 14px;
      color: #666;
    }

    .order-progress {
      margin-top: 16px;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e1e5e9;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  `]
})
export class OrdersComponent {
  activeTab = 'all';
  allOrders = [
    {
      id: 1001,
      type: 'Stable Investment',
      amount: 1300,
      status: 'active',
      date: '2024-01-15',
      duration: '35 days',
      progress: 65
    },
    {
      id: 1002,
      type: 'Daily Investment',
      amount: 600,
      status: 'completed',
      date: '2024-01-10',
      duration: '1 day',
      progress: 100
    },
    {
      id: 1003,
      type: 'Stable Investment',
      amount: 300,
      status: 'active',
      date: '2024-01-20',
      duration: '35 days',
      progress: 45
    },
    {
      id: 1004,
      type: 'Daily Investment',
      amount: 300,
      status: 'completed',
      date: '2024-01-08',
      duration: '1 day',
      progress: 100
    }
  ];

  constructor(private router: Router) {}

  get filteredOrders() {
    if (this.activeTab === 'all') {
      return this.allOrders;
    }
    return this.allOrders.filter(order => order.status === this.activeTab);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
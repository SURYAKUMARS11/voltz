@@ .. @@
 import { Component } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';
+import { SupabaseService } from '../../../services/supabase.service';
+import { LucideAngularModule, ArrowLeft, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-angular';

 @Component({
   selector: 'app-orders',
   standalone: true,
-  imports: [CommonModule],
+  imports: [CommonModule, LucideAngularModule],
   template: `
     <div class="page-container">
       <div class="header">
-        <button class="back-btn" (click)="goBack()">←</button>
+        <button class="back-btn" (click)="goBack()">
+          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
+        </button>
         <h2>Orders</h2>
         <div></div>
       </div>

@@ .. @@
         <div class="orders-list">
-          <div class="order-item" *ngFor="let order of filteredOrders">
+          <div class="order-item" *ngFor="let investment of filteredInvestments">
+            <div class="order-icon">
+              <lucide-icon [img]="getStatusIcon(investment.status)" size="20"></lucide-icon>
+            </div>
             <div class="order-header">
-              <div class="order-id">Order #{{order.id}}</div>
-              <div class="order-status" [class]="order.status">{{order.status}}</div>
+              <div class="order-id">{{investment.investment_plans?.name || 'Investment'}}</div>
+              <div class="order-status" [class]="investment.status">{{investment.status}}</div>
             </div>
             <div class="order-details">
-              <div class="order-type">{{order.type}}</div>
-              <div class="order-amount">₹{{order.amount}}</div>
+              <div class="order-amount">₹{{investment.total_invested}}</div>
+              <div class="order-quantity">Qty: {{investment.quantity}}</div>
             </div>
             <div class="order-info">
-              <div class="order-date">{{order.date}}</div>
-              <div class="order-duration">{{order.duration}}</div>
+              <div class="order-date">{{formatDate(investment.created_at)}}</div>
+              <div class="order-duration">{{investment.days_remaining}} days left</div>
             </div>
-            <div class="order-progress" *ngIf="order.status === 'active'">
+            <div class="order-progress" *ngIf="investment.status === 'active'">
               <div class="progress-bar">
-                <div class="progress-fill" [style.width.%]="order.progress"></div>
+                <div class="progress-fill" [style.width.%]="getProgress(investment)"></div>
               </div>
-              <div class="progress-text">{{order.progress}}% Complete</div>
+              <div class="progress-text">{{getProgress(investment)}}% Complete</div>
+            </div>
+            <div class="earnings-info" *ngIf="investment.status === 'active'">
+              <div class="daily-earning">Daily: ₹{{investment.daily_income}}</div>
+              <div class="total-earning">Total: ₹{{investment.total_income}}</div>
             </div>
           </div>
+          
+          <div class="empty-state" *ngIf="filteredInvestments.length === 0">
+            <div class="empty-icon">
+              <lucide-icon [img]="TrendingUpIcon" size="48"></lucide-icon>
+            </div>
+            <h3>No Investments Yet</h3>
+            <p>Start investing to see your orders here</p>
+            <button class="start-investing-btn" (click)="goToInvest()">Start Investing</button>
+          </div>
         </div>
       </div>
     </div>
@@ .. @@
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
+      position: relative;
+    }
+
+    .order-icon {
+      position: absolute;
+      top: 16px;
+      right: 16px;
+      width: 40px;
+      height: 40px;
+      border-radius: var(--radius-full);
+      display: flex;
+      align-items: center;
+      justify-content: center;
+      color: white;
+    }
+
+    .order-icon:has(lucide-icon[ng-reflect-img="Clock"]) {
+      background: var(--warning-500);
+    }
+
+    .order-icon:has(lucide-icon[ng-reflect-img="CheckCircle"]) {
+      background: var(--success-500);
+    }
+
+    .order-icon:has(lucide-icon[ng-reflect-img="XCircle"]) {
+      background: var(--error-500);
     }

     .order-header {
@@ .. @@
     .order-details {
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin-bottom: 12px;
     }

-    .order-type {
-      font-size: 18px;
-      font-weight: 600;
-      color: #333;
-    }
-
     .order-amount {
       font-size: 18px;
       font-weight: 700;
       color: #667eea;
     }

+    .order-quantity {
+      font-size: 14px;
+      color: #666;
+      font-weight: 500;
+    }
+
     .order-info {
@@ .. @@
     .progress-text {
       font-size: 12px;
       color: #666;
       text-align: center;
     }
+
+    .earnings-info {
+      display: flex;
+      justify-content: space-between;
+      margin-top: 12px;
+      padding-top: 12px;
+      border-top: 1px solid #f0f0f0;
+    }
+
+    .daily-earning,
+    .total-earning {
+      font-size: 12px;
+      font-weight: 600;
+    }
+
+    .daily-earning {
+      color: #4caf50;
+    }
+
+    .total-earning {
+      color: #667eea;
+    }
+
+    .empty-state {
+      text-align: center;
+      padding: var(--space-12) var(--space-4);
+      color: var(--gray-500);
+    }
+
+    .empty-icon {
+      color: var(--gray-400);
+      margin-bottom: var(--space-4);
+    }
+
+    .empty-state h3 {
+      margin: 0 0 var(--space-2) 0;
+      font-weight: 600;
+      color: var(--gray-600);
+    }
+
+    .empty-state p {
+      margin: 0 0 var(--space-4) 0;
+      font-size: var(--font-size-sm);
+    }
+
+    .start-investing-btn {
+      background: var(--gradient-primary);
+      color: white;
+      border: none;
+      border-radius: var(--radius-lg);
+      padding: var(--space-3) var(--space-6);
+      font-weight: 600;
+      cursor: pointer;
+      transition: all var(--transition-fast);
+    }
+
+    .start-investing-btn:hover {
+      transform: translateY(-2px);
+      box-shadow: var(--shadow-lg);
+    }
   `]
 })
-export class OrdersComponent {
+export class OrdersComponent implements OnInit {
   activeTab = 'all';
-  allOrders = [
-    {
-      id: 1001,
-      type: 'Stable Investment',
-      amount: 1300,
-      status: 'active',
-      date: '2024-01-15',
-      duration: '35 days',
-      progress: 65
-    },
-    {
-      id: 1002,
-      type: 'Daily Investment',
-      amount: 600,
-      status: 'completed',
-      date: '2024-01-10',
-      duration: '1 day',
-      progress: 100
-    },
-    {
-      id: 1003,
-      type: 'Stable Investment',
-      amount: 300,
-      status: 'active',
-      date: '2024-01-20',
-      duration: '35 days',
-      progress: 45
-    },
-    {
-      id: 1004,
-      type: 'Daily Investment',
-      amount: 300,
-      status: 'completed',
-      date: '2024-01-08',
-      duration: '1 day',
-      progress: 100
-    }
-  ];
+  userInvestments: any[] = [];
+
+  // Lucide Icons
+  readonly ArrowLeftIcon = ArrowLeft;
+  readonly TrendingUpIcon = TrendingUp;
+  readonly ClockIcon = Clock;
+  readonly CheckCircleIcon = CheckCircle;
+  readonly XCircleIcon = XCircle;

-  constructor(private router: Router) {}
+  constructor(
+    private router: Router,
+    private supabaseService: SupabaseService
+  ) {}
+
+  async ngOnInit() {
+    await this.loadUserInvestments();
+  }
+
+  async loadUserInvestments() {
+    this.supabaseService.currentUser.subscribe(async (currentUser) => {
+      if (currentUser) {
+        const { data: investments } = await this.supabaseService.getUserInvestments(currentUser.id);
+        this.userInvestments = investments || [];
+      }
+    });
+  }

-  get filteredOrders() {
+  get filteredInvestments() {
     if (this.activeTab === 'all') {
-      return this.allOrders;
+      return this.userInvestments;
     }
-    return this.allOrders.filter(order => order.status === this.activeTab);
+    return this.userInvestments.filter(investment => investment.status === this.activeTab);
   }

   goBack() {
     this.router.navigate(['/home']);
   }

+  goToInvest() {
+    this.router.navigate(['/invest']);
+  }
+
   setActiveTab(tab: string) {
     this.activeTab = tab;
   }
+
+  getStatusIcon(status: string) {
+    switch (status) {
+      case 'active': return this.ClockIcon;
+      case 'completed': return this.CheckCircleIcon;
+      case 'cancelled': return this.XCircleIcon;
+      default: return this.ClockIcon;
+    }
+  }
+
+  getProgress(investment: any): number {
+    if (!investment.investment_plans) return 0;
+    const totalDays = investment.investment_plans.total_days;
+    const remainingDays = investment.days_remaining;
+    const completedDays = totalDays - remainingDays;
+    return Math.round((completedDays / totalDays) * 100);
+  }
+
+  formatDate(dateString: string): string {
+    const date = new Date(dateString);
+    return date.toLocaleDateString();
+  }
 }
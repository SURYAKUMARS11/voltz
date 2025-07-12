@@ .. @@
 import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';
 import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
-import { DataService } from '../../services/data.service';
-import { Investment, User } from '../../models/investment.model';
+import { SupabaseService } from '../../services/supabase.service';
+import { LucideAngularModule, Bell, TrendingUp, Zap, Star, Lock } from 'lucide-angular';

 @Component({
   selector: 'app-invest',
   standalone: true,
 }
 )
-  imports: [CommonModule, BottomNavComponent],
+  imports: [CommonModule, BottomNavComponent, LucideAngularModule],
   template: `
     <div class="page-container">
       <div class="header">
         <h2>Investment Plans</h2>
-        <div class="notification-icon">
-          <div class="notification-badge">2</div>
-          🔔
+        <div class="notification-icon" (click)="showNotifications()">
+          <lucide-icon [img]="BellIcon" size="20"></lucide-icon>
+          <div class="notification-badge">{{notificationCount}}</div>
         </div>
       </div>

       <div class="balance-info">
         <div class="balance-label">Available Balance</div>
-        <div class="balance-value">₹{{user.balance | number}}</div>
+        <div class="balance-value">₹{{(userProfile?.balance || 0) | number}}</div>
       </div>

@@ .. @@
       <div class="investment-list" *ngIf="activeTab === 'stable'">
-        <div class="investment-card" *ngFor="let investment of stableInvestments">
+        <div class="investment-card" *ngFor="let plan of investmentPlans | async">
+          <div class="plan-icon">
+            <lucide-icon [img]="getIconForPlan(plan)" size="24"></lucide-icon>
+          </div>
           <div class="investment-header">
-            <div class="investment-type">Stable Investment</div>
-            <div class="investment-badge">Popular</div>
+            <div class="investment-type">{{plan.name}}</div>
+            <div class="investment-badge" [class]="getBadgeClass(plan)">
+              {{getBadgeText(plan)}}
+            </div>
           </div>
           <div class="investment-details">
             <div class="detail-row">
               <span class="label">Investment Amount</span>
-              <span class="value">₹{{investment.investAmount}}</span>
+              <span class="value">₹{{plan.invest_amount}}</span>
             </div>
             <div class="detail-row">
               <span class="label">Daily Income</span>
-              <span class="value highlight">₹{{investment.dailyIncome}}</span>
+              <span class="value highlight">₹{{plan.daily_income}}</span>
             </div>
             <div class="detail-row">
               <span class="label">Total Days</span>
-              <span class="value">{{investment.totalDays}} days</span>
+              <span class="value">{{plan.total_days}} days</span>
             </div>
             <div class="detail-row">
               <span class="label">Total Income</span>
-              <span class="value total">₹{{investment.totalIncome}}</span>
+              <span class="value total">₹{{plan.total_income}}</span>
             </div>
+            <div class="detail-row" *ngIf="plan.required_vip_level > 0">
+              <span class="label">Required VIP Level</span>
+              <span class="value vip">VIP {{plan.required_vip_level}}</span>
+            </div>
           </div>
-          <button class="invest-btn" (click)="invest(investment)">
-            Invest Now
+          <button 
+            class="invest-btn" 
+            (click)="invest(plan)"
+            [disabled]="!canInvest(plan)"
+          >
+            <lucide-icon [img]="canInvest(plan) ? TrendingUpIcon : LockIcon" size="16"></lucide-icon>
+            {{getButtonText(plan)}}
           </button>
         </div>
       </div>

-      <div class="investment-list" *ngIf="activeTab === 'daily'">
-        <div class="investment-card" *ngFor="let investment of dailyInvestments">
-          <div class="investment-header">
-            <div class="investment-type">Daily Investment</div>
-            <div class="investment-badge">Quick</div>
-          </div>
-          <div class="investment-details">
-            <div class="detail-row">
-              <span class="label">Investment Amount</span>
-              <span class="value">₹{{investment.investAmount}}</span>
-            </div>
-            <div class="detail-row">
-              <span class="label">Daily Income</span>
-              <span class="value highlight">₹{{investment.dailyIncome}}</span>
-            </div>
-            <div class="detail-row">
-              <span class="label">Total Days</span>
-              <span class="value">{{investment.totalDays}} day</span>
-            </div>
-            <div class="detail-row">
-              <span class="label">Total Income</span>
-              <span class="value total">₹{{investment.totalIncome}}</span>
-            </div>
-          </div>
-          <button class="invest-btn" (click)="invest(investment)">
-            Invest Now
-          </button>
+      <div class="investment-list" *ngIf="activeTab === 'daily'">
+        <div class="investment-card" *ngFor="let plan of dailyPlans | async">
+          <div class="plan-icon">
+            <lucide-icon [img]="getIconForPlan(plan)" size="24"></lucide-icon>
+          </div>
+          <div class="investment-header">
+            <div class="investment-type">{{plan.name}}</div>
+            <div class="investment-badge quick">Quick Return</div>
+          </div>
+          <div class="investment-details">
+            <div class="detail-row">
+              <span class="label">Investment Amount</span>
+              <span class="value">₹{{plan.invest_amount}}</span>
+            </div>
+            <div class="detail-row">
+              <span class="label">Daily Income</span>
+              <span class="value highlight">₹{{plan.daily_income}}</span>
+            </div>
+            <div class="detail-row">
+              <span class="label">Total Days</span>
+              <span class="value">{{plan.total_days}} day</span>
+            </div>
+            <div class="detail-row">
+              <span class="label">Total Income</span>
+              <span class="value total">₹{{plan.total_income}}</span>
+            </div>
+            <div class="detail-row" *ngIf="plan.required_vip_level > 0">
+              <span class="label">Required VIP Level</span>
+              <span class="value vip">VIP {{plan.required_vip_level}}</span>
+            </div>
+          </div>
+          <button 
+            class="invest-btn" 
+            (click)="invest(plan)"
+            [disabled]="!canInvest(plan)"
+          >
+            <lucide-icon [img]="canInvest(plan) ? TrendingUpIcon : LockIcon" size="16"></lucide-icon>
+            {{getButtonText(plan)}}
+          </button>
         </div>
       </div>

@@ .. @@
       <div class="coming-soon" *ngIf="activeTab === 'advanced'">
-        <div class="coming-soon-icon">🚀</div>
+        <div class="coming-soon-icon">
+          <lucide-icon [img]="ZapIcon" size="48"></lucide-icon>
+        </div>
         <h3>Advanced Plans</h3>
         <p>Advanced investment plans are coming soon. Stay tuned for more exciting opportunities!</p>
       </div>
@@ .. @@
     .investment-card {
       background: white;
       border-radius: 20px;
       padding: 20px;
       box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
       border: 2px solid transparent;
       transition: all 0.3s ease;
+      position: relative;
+      overflow: hidden;
     }

     .investment-card:hover {
       border-color: #667eea;
       transform: translateY(-2px);
     }

+    .plan-icon {
+      position: absolute;
+      top: 16px;
+      right: 16px;
+      width: 48px;
+      height: 48px;
+      background: var(--gradient-primary);
+      border-radius: var(--radius-xl);
+      display: flex;
+      align-items: center;
+      justify-content: center;
+      color: white;
+      opacity: 0.1;
+    }
+
     .investment-header {
       display: flex;
       justify-content: space-between;
@@ .. @@
     .investment-badge.unlocked {
       background: #e8f5e8;
       color: #2e7d32;
     }

+    .investment-badge.quick {
+      background: #e3f2fd;
+      color: #1976d2;
+    }
+
     .investment-details {
       margin-bottom: 20px;
     }
@@ .. @@
     .value.total {
       color: #667eea;
       font-size: 15px;
     }

+    .value.vip {
+      color: #ff9800;
+      font-weight: 700;
+    }
+
     .invest-btn {
       width: 100%;
+      display: flex;
+      align-items: center;
+      justify-content: center;
+      gap: var(--space-2);
       padding: 14px;
       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
       color: white;
@@ .. @@
 })
 export class InvestComponent implements OnInit {
   activeTab = 'stable';
-  user: User = {
-    id: 1,
-    name: 'John Doe',
-    email: 'john@example.com',
-    balance: 15000,
-    vipLevel: 0
-  };
-  stableInvestments: Investment[] = [];
-  dailyInvestments: Investment[] = [];
+  userProfile: any = null;
+  investmentPlans: any;
+  dailyPlans: any;
+  notificationCount = 2;
+
+  // Lucide Icons
+  readonly BellIcon = Bell;
+  readonly TrendingUpIcon = TrendingUp;
+  readonly ZapIcon = Zap;
+  readonly StarIcon = Star;
+  readonly LockIcon = Lock;

-  constructor(private router: Router, private dataService: DataService) {}
+  constructor(
+    private router: Router, 
+    private supabaseService: SupabaseService
+  ) {}

   ngOnInit() {
-    this.user = this.dataService.getUser();
-    this.stableInvestments = this.dataService.getStableInvestments();
-    this.dailyInvestments = this.dataService.getDailyInvestments();
+    this.loadUserData();
+    this.loadInvestmentPlans();
+  }
+
+  async loadUserData() {
+    this.supabaseService.currentUser.subscribe(async (currentUser) => {
+      if (currentUser) {
+        const { data: profile } = await this.supabaseService.getUserProfile(currentUser.id);
+        this.userProfile = profile;
+      }
+    });
+  }
+
+  async loadInvestmentPlans() {
+    const { data: plans } = await this.supabaseService.getInvestmentPlans();
+    this.investmentPlans = plans?.filter(plan => plan.type === 'stable') || [];
+    this.dailyPlans = plans?.filter(plan => plan.type === 'daily') || [];
   }

   setActiveTab(tab: string) {
     this.activeTab = tab;
   }

-  getRequiredVipLevel(investment: Investment): number {
-    if (investment.type === 'stable' && investment.investAmount === 300) return 0;
-    if (investment.type === 'stable' && investment.investAmount === 1300) return 2;
-    if (investment.type === 'daily') return 1;
-    return 0;
+  canInvest(plan: any): boolean {
+    if (!this.userProfile) return false;
+    
+    // Check VIP level requirement
+    if ((this.userProfile.vip_level || 0) < (plan.required_vip_level || 0)) {
+      return false;
+    }
+    
+    // Check balance
+    if ((this.userProfile.balance || 0) < plan.invest_amount) {
+      return false;
+    }
+    
+    return true;
   }

-  canInvestIn(investment: Investment): boolean {
-    return (this.user.vipLevel || 0) >= this.getRequiredVipLevel(investment);
+  getBadgeClass(plan: any): string {
+    if (!this.canInvest(plan)) return 'vip-required';
+    if (plan.type === 'stable' && plan.invest_amount === 300) return 'popular';
+    return 'unlocked';
   }

-  getInvestmentBadgeClass(investment: Investment): string {
-    if (!this.canInvestIn(investment)) return 'vip-required';
-    if (investment.type === 'stable' && investment.investAmount === 300) return 'popular';
-    if (investment.type === 'daily') return 'quick';
-    return 'unlocked';
+  getBadgeText(plan: any): string {
+    if (!this.canInvest(plan)) {
+      if ((this.userProfile?.vip_level || 0) < (plan.required_vip_level || 0)) {
+        return \`VIP ${plan.required_vip_level} Required`;
+      }
+      if ((this.userProfile?.balance || 0) < plan.invest_amount) {
+        return 'Insufficient Balance';
+      }
+    }
+    if (plan.type === 'stable' && plan.invest_amount === 300) return 'Popular';
+    return 'Available';
   }

-  getInvestmentBadgeText(investment: Investment): string {
-    if (!this.canInvestIn(investment)) return \`VIP ${this.getRequiredVipLevel(investment)} Required`;
-    if (investment.type === 'stable' && investment.investAmount === 300) return 'Popular';
-    if (investment.type === 'daily') return 'Quick';
-    return 'Available';
+  getButtonText(plan: any): string {
+    if (!this.canInvest(plan)) {
+      if ((this.userProfile?.vip_level || 0) < (plan.required_vip_level || 0)) {
+        return 'VIP Upgrade Required';
+      }
+      if ((this.userProfile?.balance || 0) < plan.invest_amount) {
+        return 'Insufficient Balance';
+      }
+    }
+    return 'Invest Now';
   }

-  getInvestButtonText(investment: Investment): string {
-    if (!this.canInvestIn(investment)) return 'VIP Upgrade Required';
-    return 'Invest Now';
+  getIconForPlan(plan: any): any {
+    if (plan.type === 'stable') return this.StarIcon;
+    if (plan.type === 'daily') return this.ZapIcon;
+    return this.TrendingUpIcon;
   }

-  invest(investment: Investment) {
-    if (this.canInvestIn(investment)) {
-      this.router.navigate(['/investment', investment.id]);
+  invest(plan: any) {
+    if (this.canInvest(plan)) {
+      this.router.navigate(['/investment', plan.id]);
     }
   }
+
+  showNotifications() {
+    console.log('Show notifications');
+  }
 }
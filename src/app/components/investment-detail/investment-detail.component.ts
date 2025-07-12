@@ .. @@
 import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { Router, ActivatedRoute } from '@angular/router';
-import { DataService } from '../../services/data.service';
-import { Investment } from '../../models/investment.model';
+import { SupabaseService } from '../../services/supabase.service';
+import { LucideAngularModule, ArrowLeft, TrendingUp, Lock, CheckCircle } from 'lucide-angular';

 @Component({
   selector: 'app-investment-detail',
   standalone: true,
-  imports: [CommonModule, FormsModule],
+  imports: [CommonModule, FormsModule, LucideAngularModule],
   template: `
     <div class="page-container" [class.slide-in]="true">
       <div class="header">
-        <button class="back-btn" (click)="goBack()">←</button>
+        <button class="back-btn" (click)="goBack()">
+          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
+        </button>
         <h2>Investment Details</h2>
-        <div class="vip-level">VIP {{userVipLevel}}</div>
+        <div class="vip-level">VIP {{userProfile?.vip_level || 0}}</div>
       </div>

-      <div class="investment-detail" *ngIf="investment">
+      <div class="investment-detail" *ngIf="investmentPlan">
         <div class="investment-card">
           <div class="investment-header">
-            <div class="investment-type">{{investment.type === 'stable' ? 'Stable Investment' : 'Daily Investment'}}</div>
-            <div class="vip-required" *ngIf="getRequiredVipLevel(investment) > userVipLevel">
-              VIP {{getRequiredVipLevel(investment)}} Required
+            <div class="investment-type">{{investmentPlan.name}}</div>
+            <div class="vip-required" *ngIf="!canInvest()">
+              {{getRequirementText()}}
             </div>
           </div>
           
           <div class="investment-details">
             <div class="detail-row">
               <span class="label">Investment Amount</span>
-              <span class="value">₹{{investment.investAmount}}</span>
+              <span class="value">₹{{investmentPlan.invest_amount}}</span>
             </div>
             <div class="detail-row">
               <span class="label">Daily Income</span>
-              <span class="value highlight">₹{{investment.dailyIncome}}</span>
+              <span class="value highlight">₹{{investmentPlan.daily_income}}</span>
             </div>
             <div class="detail-row">
               <span class="label">Total Days</span>
-              <span class="value">{{investment.totalDays}} days</span>
+              <span class="value">{{investmentPlan.total_days}} days</span>
             </div>
             <div class="detail-row">
               <span class="label">Total Income</span>
-              <span class="value total">₹{{investment.totalIncome}}</span>
+              <span class="value total">₹{{investmentPlan.total_income}}</span>
+            </div>
+            <div class="detail-row">
+              <span class="label">Your Balance</span>
+              <span class="value balance">₹{{userProfile?.balance || 0}}</span>
             </div>
           </div>

           <div class="quantity-section" *ngIf="canInvest()">
             <h4>Select Quantity</h4>
             <div class="quantity-controls">
-              <button class="quantity-btn" (click)="decreaseQuantity()">-</button>
+              <button class="quantity-btn" (click)="decreaseQuantity()" [disabled]="quantity <= 1">-</button>
               <input type="number" [(ngModel)]="quantity" min="1" class="quantity-input">
-              <button class="quantity-btn" (click)="increaseQuantity()">+</button>
+              <button class="quantity-btn" (click)="increaseQuantity()" [disabled]="!canAffordQuantity(quantity + 1)">+</button>
             </div>
             <div class="total-investment">
-              Total Investment: ₹{{investment.investAmount * quantity}}
+              Total Investment: ₹{{investmentPlan.invest_amount * quantity}}
+            </div>
+            <div class="total-return">
+              Expected Return: ₹{{investmentPlan.total_income * quantity}}
             </div>
           </div>

           <div class="vip-upgrade-notice" *ngIf="!canInvest()">
-            <div class="notice-icon">🔒</div>
-            <h4>VIP Upgrade Required</h4>
-            <p>You need VIP {{getRequiredVipLevel(investment)}} to access this investment plan.</p>
-            <p>Complete the VIP 1 investment to unlock higher levels.</p>
+            <div class="notice-icon">
+              <lucide-icon [img]="LockIcon" size="32"></lucide-icon>
+            </div>
+            <h4>{{getRequirementTitle()}}</h4>
+            <p>{{getRequirementDescription()}}</p>
           </div>

           <button 
             class="invest-btn" 
             (click)="proceedToInvest()" 
             [disabled]="!canInvest() || isProcessing"
-            *ngIf="canInvest()">
-            Invest ₹{{investment.investAmount * quantity}}
+          >
+            <lucide-icon [img]="isProcessing ? CheckCircle : TrendingUpIcon" size="16"></lucide-icon>
+            <span *ngIf="!isProcessing">{{canInvest() ? 'Invest ₹' + (investmentPlan.invest_amount * quantity) : getRequirementText()}}</span>
+            <span *ngIf="isProcessing">Processing...</span>
           </button>
         </div>
       </div>
@@ .. @@
     .total-investment {
       font-size: 14px;
       font-weight: 600;
       color: #667eea;
       text-align: center;
+      margin-bottom: var(--space-2);
+    }
+
+    .total-return {
+      font-size: 14px;
+      font-weight: 600;
+      color: #4caf50;
+      text-align: center;
+    }
+
+    .value.balance {
+      color: #667eea;
+      font-weight: 700;
     }

     .vip-upgrade-notice {
@@ .. @@
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
 export class InvestmentDetailComponent implements OnInit {
-  investment: Investment | null = null;
+  investmentPlan: any = null;
+  userProfile: any = null;
   quantity = 1;
-  userVipLevel = 0;
+  isProcessing = false;
+
+  // Lucide Icons
+  readonly ArrowLeftIcon = ArrowLeft;
+  readonly TrendingUpIcon = TrendingUp;
+  readonly LockIcon = Lock;
+  readonly CheckCircle = CheckCircle;

   constructor(
     private router: Router,
     private route: ActivatedRoute,
-    private dataService: DataService
+    private supabaseService: SupabaseService
   ) {}

-  ngOnInit() {
+  async ngOnInit() {
     const investmentId = this.route.snapshot.params['id'];
-    this.investment = this.dataService.getInvestmentById(Number(investmentId));
-    this.userVipLevel = this.dataService.getUserVipLevel();
+    await this.loadInvestmentPlan(investmentId);
+    await this.loadUserData();
+  }
+
+  async loadInvestmentPlan(id: string) {
+    const { data: plans } = await this.supabaseService.getInvestmentPlans();
+    this.investmentPlan = plans?.find(plan => plan.id === parseInt(id));
+  }
+
+  async loadUserData() {
+    this.supabaseService.currentUser.subscribe(async (currentUser) => {
+      if (currentUser) {
+        const { data: profile } = await this.supabaseService.getUserProfile(currentUser.id);
+        this.userProfile = profile;
+      }
+    });
   }

   goBack() {
@@ -1,6 +1,7 @@
   }

   increaseQuantity() {
-    this.quantity++;
+    if (this.canAffordQuantity(this.quantity + 1)) {
+      this.quantity++;
+    }
   }

   decreaseQuantity() {
@@ -1,6 +1,7 @@
     }
   }

-  getRequiredVipLevel(investment: Investment): number {
-    if (investment.type === 'stable' && investment.investAmount === 300) return 0;
-    if (investment.type === 'stable' && investment.investAmount === 1300) return 2;
-    if (investment.type === 'daily') return 1;
-    return 0;
+  canAffordQuantity(qty: number): boolean {
+    if (!this.userProfile || !this.investmentPlan) return false;
+    return (this.userProfile.balance || 0) >= (this.investmentPlan.invest_amount * qty);
   }

   canInvest(): boolean {
-    if (!this.investment) return false;
-    return this.userVipLevel >= this.getRequiredVipLevel(this.investment);
+    if (!this.investmentPlan || !this.userProfile) return false;
+    
+    // Check VIP level requirement
+    if ((this.userProfile.vip_level || 0) < (this.investmentPlan.required_vip_level || 0)) {
+      return false;
+    }
+    
+    // Check balance
+    if ((this.userProfile.balance || 0) < (this.investmentPlan.invest_amount * this.quantity)) {
+      return false;
+    }
+    
+    return true;
+  }
+
+  getRequirementText(): string {
+    if (!this.userProfile || !this.investmentPlan) return '';
+    
+    if ((this.userProfile.vip_level || 0) < (this.investmentPlan.required_vip_level || 0)) {
+      return `VIP ${this.investmentPlan.required_vip_level} Required`;
+    }
+    
+    if ((this.userProfile.balance || 0) < (this.investmentPlan.invest_amount * this.quantity)) {
+      return 'Insufficient Balance';
+    }
+    
+    return '';
+  }
+
+  getRequirementTitle(): string {
+    if (!this.userProfile || !this.investmentPlan) return '';
+    
+    if ((this.userProfile.vip_level || 0) < (this.investmentPlan.required_vip_level || 0)) {
+      return 'VIP Upgrade Required';
+    }
+    
+    if ((this.userProfile.balance || 0) < (this.investmentPlan.invest_amount * this.quantity)) {
+      return 'Insufficient Balance';
+    }
+    
+    return '';
+  }
+
+  getRequirementDescription(): string {
+    if (!this.userProfile || !this.investmentPlan) return '';
+    
+    if ((this.userProfile.vip_level || 0) < (this.investmentPlan.required_vip_level || 0)) {
+      return `You need VIP ${this.investmentPlan.required_vip_level} to access this investment plan. Complete lower VIP investments to unlock higher levels.`;
+    }
+    
+    if ((this.userProfile.balance || 0) < (this.investmentPlan.invest_amount * this.quantity)) {
+      return `You need ₹${this.investmentPlan.invest_amount * this.quantity} to make this investment. Please recharge your account or reduce the quantity.`;
+    }
+    
+    return '';
   }

-  proceedToInvest() {
-    if (this.investment && this.canInvest()) {
-      // Process investment
-      this.dataService.processInvestment(this.investment, this.quantity);
-      this.router.navigate(['/invest']);
+  async proceedToInvest() {
+    if (!this.canInvest() || this.isProcessing) return;
+    
+    this.isProcessing = true;
+    
+    try {
+      const currentUser = await this.supabaseService.currentUser.pipe(take(1)).toPromise();
+      if (!currentUser) return;
+
+      const totalAmount = this.investmentPlan.invest_amount * this.quantity;
+      const totalIncome = this.investmentPlan.total_income * this.quantity;
+      const dailyIncome = this.investmentPlan.daily_income * this.quantity;
+
+      // Create investment record
+      const { error: investmentError } = await this.supabaseService.createInvestment({
+        user_id: currentUser.id,
+        plan_id: this.investmentPlan.id,
+        quantity: this.quantity,
+        total_invested: totalAmount,
+        daily_income: dailyIncome,
+        total_income: totalIncome,
+        days_remaining: this.investmentPlan.total_days,
+        status: 'active'
+      });
+
+      if (investmentError) {
+        console.error('Investment creation failed:', investmentError);
+        return;
+      }
+
+      // Update user balance and stats
+      const newBalance = (this.userProfile.balance || 0) - totalAmount;
+      const newTotalInvested = (this.userProfile.total_invested || 0) + totalAmount;
+      let newVipLevel = this.userProfile.vip_level || 0;
+
+      // Upgrade VIP level if this is first stable investment
+      if (this.investmentPlan.type === 'stable' && this.investmentPlan.invest_amount === 300 && newVipLevel === 0) {
+        newVipLevel = 1;
+      }
+
+      const { error: profileError } = await this.supabaseService.updateUserProfile(currentUser.id, {
+        balance: newBalance,
+        total_invested: newTotalInvested,
+        vip_level: newVipLevel
+      });
+
+      if (profileError) {
+        console.error('Profile update failed:', profileError);
+        return;
+      }
+
+      // Create transaction record
+      await this.supabaseService.createTransaction({
+        user_id: currentUser.id,
+        type: 'investment',
+        amount: totalAmount,
+        status: 'completed',
+        description: `Investment in ${this.investmentPlan.name}`,
+        reference_id: `INV-${Date.now()}`
+      });
+
+      // Navigate back to invest page
+      this.router.navigate(['/invest']);
+    } catch (error) {
+      console.error('Investment processing failed:', error);
+    } finally {
+      this.isProcessing = false;
     }
   }
 }
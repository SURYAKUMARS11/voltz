@@ .. @@
 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';
 import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
+import { TelegramPopupComponent } from '../shared/telegram-popup/telegram-popup.component';
 import { SupabaseService } from '../../services/supabase.service';
 import { LucideAngularModule, Bell, Eye, CreditCard, ArrowUpRight, ArrowDownLeft, FileText, Building2, TrendingUp, Wallet, Gift, Shield, Award, Star, Zap } from 'lucide-angular';
 import { Subscription } from 'rxjs';

 @Component({
   selector: 'app-home',
   standalone: true,
 }
 )
-  imports: [CommonModule, BottomNavComponent, LucideAngularModule],
+  imports: [CommonModule, BottomNavComponent, LucideAngularModule, TelegramPopupComponent],
   template: `
     <div class="page-container">
+      <app-telegram-popup 
+        *ngIf="showTelegramPopup" 
+        (close)="closeTelegramPopup()" 
+        (join)="joinTelegram()">
+      </app-telegram-popup>
+
       <div class="header safe-area-top">
@@ .. @@
           <div class="balance-amount">
             <span class="currency">₹</span>
             <span class="amount" [class.blurred]="!showBalance">
-              {{showBalance ? (userProfile?.balance | number) : '••••••'}}
+              {{showBalance ? (userProfile?.balance || 0 | number) : '••••••'}}
             </span>
           </div>
           <div class="balance-stats">
             <div class="stat">
               <lucide-icon [img]="TrendingUpIcon" size="14"></lucide-icon>
-              <span>+₹{{userProfile?.total_earned || 0 | number}} earned</span>
+              <span>+₹{{(userProfile?.total_earned || 0) | number}} earned</span>
             </div>
           </div>
         </div>
@@ .. @@
 export class HomeComponent implements OnInit, OnDestroy {
   userProfile: any = null;
   recentTransactions: any[] = [];
   showBalance = true;
+  showTelegramPopup = false;
   notificationCount = 3;
   private subscriptions: Subscription[] = [];

@@ .. @@
   async ngOnInit() {
     await this.loadUserData();
     this.setupRealtimeSubscriptions();
+    
+    // Show Telegram popup after 2 seconds if user hasn't seen it
+    setTimeout(() => {
+      const hasSeenPopup = localStorage.getItem('hasSeenTelegramPopup');
+      if (!hasSeenPopup) {
+        this.showTelegramPopup = true;
+      }
+    }, 2000);
   }

@@ .. @@
   async loadUserData() {
-    // Get current user from the observable
-    this.supabaseService.currentUser.subscribe(async (currentUser) => {
-    if (currentUser) {
-      // Load user profile
-      const { data: profile } = await this.supabaseService.getUserProfile(currentUser.id);
-      this.userProfile = profile;
-
-      // Load recent transactions
-      const { data: transactions } = await this.supabaseService.getUserTransactions(currentUser.id);
-      this.recentTransactions = transactions?.slice(0, 5) || [];
-    }
+    this.supabaseService.currentUser.subscribe(async (currentUser) => {
+      if (currentUser) {
+        // Load user profile
+        const { data: profile, error } = await this.supabaseService.getUserProfile(currentUser.id);
+        
+        if (error || !profile) {
+          // Create profile if it doesn't exist
+          const { data: newProfile } = await this.supabaseService.createUserProfile(currentUser.id, {
+            full_name: currentUser.user_metadata?.full_name || 'User',
+            balance: 0,
+            vip_level: 0,
+            total_earned: 0,
+            total_invested: 0
+          });
+          this.userProfile = newProfile;
+        } else {
+          this.userProfile = profile;
+        }
+
+        // Load recent transactions
+        const { data: transactions } = await this.supabaseService.getUserTransactions(currentUser.id);
+        this.recentTransactions = transactions?.slice(0, 5) || [];
+      }
     });
   }

@@ .. @@
   toggleBalanceVisibility() {
     this.showBalance = !this.showBalance;
   }

+  closeTelegramPopup() {
+    this.showTelegramPopup = false;
+    localStorage.setItem('hasSeenTelegramPopup', 'true');
+  }
+
+  joinTelegram() {
+    this.closeTelegramPopup();
+  }
+
   navigate(path: string) {
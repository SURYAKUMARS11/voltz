@@ .. @@
 import { Component } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
+import { SupabaseService } from '../../services/supabase.service';
+import { LucideAngularModule, Share2, Users, Gift, Trophy, Star, Copy, Check } from 'lucide-angular';

 @Component({
   selector: 'app-invite',
   standalone: true,
-  imports: [CommonModule, BottomNavComponent],
+  imports: [CommonModule, BottomNavComponent, LucideAngularModule],
   template: `
     <div class="page-container">
       <div class="header">
         <h2>Invite Friends</h2>
-        <div class="earn-more">Earn More!</div>
+        <div class="earn-more">
+          <lucide-icon [img]="GiftIcon" size="12"></lucide-icon>
+          Earn More!
+        </div>
       </div>

       <div class="invite-card">
-        <div class="invite-icon">🎁</div>
+        <div class="invite-icon">
+          <lucide-icon [img]="GiftIcon" size="32"></lucide-icon>
+        </div>
         <h3>Invite Friends & Earn</h3>
-        <p>Share your referral code and earn ₹100 for each friend who joins!</p>
+        <p>Share your referral link and earn commissions on multiple levels!</p>
         
         <div class="referral-code">
-          <div class="code-label">Your Referral Code</div>
+          <div class="code-label">Your Referral Link</div>
           <div class="code-value">
-            <span>{{referralCode}}</span>
-            <button class="copy-btn" (click)="copyCode()">📋</button>
+            <span class="referral-link">{{getReferralLink()}}</span>
+            <button class="copy-btn" (click)="copyReferralLink()">
+              <lucide-icon [img]="copied ? CheckIcon : CopyIcon" size="16"></lucide-icon>
+            </button>
           </div>
         </div>
+        
+        <button class="share-btn" (click)="shareReferralLink()">
+          <lucide-icon [img]="Share2Icon" size="16"></lucide-icon>
+          Share Referral Link
+        </button>
       </div>

-      <div class="share-options">
-        <h4>Share via</h4>
-        <div class="share-grid">
-          <div class="share-item" (click)="shareVia('whatsapp')">
-            <div class="share-icon whatsapp">📱</div>
-            <span>WhatsApp</span>
-          </div>
-          <div class="share-item" (click)="shareVia('telegram')">
-            <div class="share-icon telegram">✈️</div>
-            <span>Telegram</span>
-          </div>
-          <div class="share-item" (click)="shareVia('facebook')">
-            <div class="share-icon facebook">📘</div>
-            <span>Facebook</span>
-          </div>
-          <div class="share-item" (click)="shareVia('twitter')">
-            <div class="share-icon twitter">🐦</div>
-            <span>Twitter</span>
-          </div>
+      <div class="commission-structure">
+        <h4>
+          <lucide-icon [img]="TrophyIcon" size="16"></lucide-icon>
+          Commission Structure
+        </h4>
+        <div class="level-grid">
+          <div class="level-item level-1">
+            <div class="level-number">1</div>
+            <div class="level-info">
+              <div class="level-title">Direct Referral</div>
+              <div class="level-commission">36%</div>
+            </div>
+          </div>
+          <div class="level-item level-2">
+            <div class="level-number">2</div>
+            <div class="level-info">
+              <div class="level-title">2nd Level</div>
+              <div class="level-commission">9%</div>
+            </div>
+          </div>
+          <div class="level-item level-3">
+            <div class="level-number">3</div>
+            <div class="level-info">
+              <div class="level-title">3rd Level</div>
+              <div class="level-commission">3%</div>
+            </div>
+          </div>
         </div>
       </div>

-      <div class="referral-stats">
-        <h4>Your Referral Stats</h4>
-        <div class="stats-grid">
-          <div class="stat-item">
-            <div class="stat-number">{{referralStats.totalReferrals}}</div>
-            <div class="stat-label">Total Referrals</div>
+      <div class="joining-bonus">
+        <h4>
+          <lucide-icon [img]="StarIcon" size="16"></lucide-icon>
+          Joining Bonus Rewards
+        </h4>
+        <div class="bonus-grid">
+          <div class="bonus-item" [class.achieved]="referralStats.totalReferrals >= 3">
+            <div class="bonus-icon">
+              <lucide-icon [img]="UsersIcon" size="20"></lucide-icon>
+            </div>
+            <div class="bonus-info">
+              <div class="bonus-target">3 Referrals</div>
+              <div class="bonus-reward">₹300 Bonus</div>
+            </div>
+            <div class="bonus-status" *ngIf="referralStats.totalReferrals >= 3">
+              <lucide-icon [img]="CheckIcon" size="16"></lucide-icon>
+            </div>
           </div>
-          <div class="stat-item">
-            <div class="stat-number">₹{{referralStats.totalEarned}}</div>
-            <div class="stat-label">Total Earned</div>
+          <div class="bonus-item" [class.achieved]="referralStats.totalReferrals >= 10">
+            <div class="bonus-icon">
+              <lucide-icon [img]="UsersIcon" size="20"></lucide-icon>
+            </div>
+            <div class="bonus-info">
+              <div class="bonus-target">10 Referrals</div>
+              <div class="bonus-reward">₹3,000 Bonus</div>
+            </div>
+            <div class="bonus-status" *ngIf="referralStats.totalReferrals >= 10">
+              <lucide-icon [img]="CheckIcon" size="16"></lucide-icon>
+            </div>
           </div>
-          <div class="stat-item">
-            <div class="stat-number">{{referralStats.activeReferrals}}</div>
-            <div class="stat-label">Active Referrals</div>
+          <div class="bonus-item" [class.achieved]="referralStats.totalReferrals >= 20">
+            <div class="bonus-icon">
+              <lucide-icon [img]="UsersIcon" size="20"></lucide-icon>
+            </div>
+            <div class="bonus-info">
+              <div class="bonus-target">20 Referrals</div>
+              <div class="bonus-reward">₹10,000 Bonus</div>
+            </div>
+            <div class="bonus-status" *ngIf="referralStats.totalReferrals >= 20">
+              <lucide-icon [img]="CheckIcon" size="16"></lucide-icon>
+            </div>
+          </div>
+          <div class="bonus-item" [class.achieved]="referralStats.totalReferrals >= 50">
+            <div class="bonus-icon">
+              <lucide-icon [img]="UsersIcon" size="20"></lucide-icon>
+            </div>
+            <div class="bonus-info">
+              <div class="bonus-target">50 Referrals</div>
+              <div class="bonus-reward">₹50,000 Bonus</div>
+            </div>
+            <div class="bonus-status" *ngIf="referralStats.totalReferrals >= 50">
+              <lucide-icon [img]="CheckIcon" size="16"></lucide-icon>
+            </div>
           </div>
         </div>
       </div>

-      <div class="referral-list">
-        <h4>Recent Referrals</h4>
-        <div class="referral-item" *ngFor="let referral of recentReferrals">
-          <div class="referral-avatar">{{referral.name.charAt(0)}}</div>
-          <div class="referral-info">
-            <div class="referral-name">{{referral.name}}</div>
-            <div class="referral-date">Joined {{referral.joinDate}}</div>
+      <div class="referral-stats">
+        <h4>Your Referral Network</h4>
+        <div class="stats-grid">
+          <div class="stat-item">
+            <div class="stat-number">{{referralStats.level1Count}}</div>
+            <div class="stat-label">Level 1</div>
+          </div>
+          <div class="stat-item">
+            <div class="stat-number">{{referralStats.level2Count}}</div>
+            <div class="stat-label">Level 2</div>
+          </div>
+          <div class="stat-item">
+            <div class="stat-number">{{referralStats.level3Count}}</div>
+            <div class="stat-label">Level 3</div>
+          </div>
+          <div class="stat-item total">
+            <div class="stat-number">₹{{referralStats.totalEarned}}</div>
+            <div class="stat-label">Total Earned</div>
           </div>
-          <div class="referral-reward">+₹{{referral.reward}}</div>
         </div>
       </div>

@@ .. @@
     .referral-code {
       background: rgba(255, 255, 255, 0.1);
       border-radius: 16px;
       padding: 20px;
       backdrop-filter: blur(10px);
+      margin-bottom: var(--space-4);
     }

     .code-label {
@@ .. @@
     .code-value {
       display: flex;
-      justify-content: space-between;
       align-items: center;
+      gap: var(--space-2);
       background: rgba(255, 255, 255, 0.1);
       border-radius: 12px;
       padding: 12px 16px;
     }

-    .code-value span {
-      font-size: 18px;
-      font-weight: 600;
-      letter-spacing: 2px;
+    .referral-link {
+      flex: 1;
+      font-size: 12px;
+      font-weight: 500;
+      word-break: break-all;
+      opacity: 0.9;
     }

     .copy-btn {
       background: rgba(255, 255, 255, 0.2);
       border: none;
       border-radius: 8px;
-      padding: 8px;
+      padding: 8px 12px;
       cursor: pointer;
-      font-size: 16px;
+      color: white;
+      transition: all var(--transition-fast);
+      display: flex;
+      align-items: center;
+      gap: var(--space-1);
+    }
+
+    .copy-btn:hover {
+      background: rgba(255, 255, 255, 0.3);
+    }
+
+    .share-btn {
+      width: 100%;
+      display: flex;
+      align-items: center;
+      justify-content: center;
+      gap: var(--space-2);
+      padding: var(--space-3) var(--space-4);
+      background: rgba(255, 255, 255, 0.2);
+      border: none;
+      border-radius: var(--radius-lg);
+      color: white;
+      font-weight: 600;
+      cursor: pointer;
+      transition: all var(--transition-fast);
+      backdrop-filter: blur(10px);
+    }
+
+    .share-btn:hover {
+      background: rgba(255, 255, 255, 0.3);
+      transform: translateY(-2px);
     }

-    .share-options {
+    .commission-structure {
       margin: 20px;
     }

-    .share-options h4 {
+    .commission-structure h4 {
       margin: 0 0 16px 0;
       color: #333;
+      display: flex;
+      align-items: center;
+      gap: var(--space-2);
     }

-    .share-grid {
-      display: grid;
-      grid-template-columns: repeat(4, 1fr);
+    .level-grid {
+      display: flex;
+      flex-direction: column;
       gap: 16px;
     }

-    .share-item {
+    .level-item {
       display: flex;
-      flex-direction: column;
       align-items: center;
-      gap: 8px;
-      padding: 20px 16px;
+      gap: 16px;
+      padding: 16px;
       background: white;
       border-radius: 16px;
-      cursor: pointer;
-      transition: all 0.3s ease;
       box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
+      border-left: 4px solid transparent;
     }

-    .share-item:hover {
-      transform: translateY(-2px);
-      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
+    .level-item.level-1 {
+      border-left-color: var(--success-500);
     }

-    .share-icon {
-      width: 40px;
-      height: 40px;
+    .level-item.level-2 {
+      border-left-color: var(--warning-500);
+    }
+
+    .level-item.level-3 {
+      border-left-color: var(--primary-500);
+    }
+
+    .level-number {
+      width: 32px;
+      height: 32px;
       border-radius: 50%;
+      background: var(--gradient-primary);
+      color: white;
       display: flex;
       align-items: center;
       justify-content: center;
-      font-size: 20px;
-      color: white;
+      font-weight: 700;
+      font-size: 14px;
+      flex-shrink: 0;
     }

-    .share-icon.whatsapp {
-      background: #25d366;
+    .level-info {
+      flex: 1;
     }

-    .share-icon.telegram {
-      background: #0088cc;
+    .level-title {
+      font-weight: 600;
+      color: #333;
+      margin-bottom: 2px;
     }

-    .share-icon.facebook {
-      background: #3b5998;
+    .level-commission {
+      font-size: 18px;
+      font-weight: 700;
+      color: var(--success-600);
     }

-    .share-icon.twitter {
-      background: #1da1f2;
+    .joining-bonus {
+      margin: 20px;
     }

-    .share-item span {
-      font-size: 12px;
-      font-weight: 500;
+    .joining-bonus h4 {
+      margin: 0 0 16px 0;
       color: #333;
+      display: flex;
+      align-items: center;
+      gap: var(--space-2);
+    }
+
+    .bonus-grid {
+      display: flex;
+      flex-direction: column;
+      gap: 12px;
+    }
+
+    .bonus-item {
+      display: flex;
+      align-items: center;
+      gap: 16px;
+      padding: 16px;
+      background: white;
+      border-radius: 16px;
+      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
+      transition: all var(--transition-fast);
+      position: relative;
+    }
+
+    .bonus-item.achieved {
+      background: var(--success-50);
+      border: 2px solid var(--success-200);
+    }
+
+    .bonus-icon {
+      width: 40px;
+      height: 40px;
+      border-radius: var(--radius-lg);
+      background: var(--gray-100);
+      display: flex;
+      align-items: center;
+      justify-content: center;
+      color: var(--gray-600);
+      flex-shrink: 0;
+    }
+
+    .bonus-item.achieved .bonus-icon {
+      background: var(--success-100);
+      color: var(--success-600);
+    }
+
+    .bonus-info {
+      flex: 1;
+    }
+
+    .bonus-target {
+      font-weight: 600;
+      color: #333;
+      margin-bottom: 2px;
+    }
+
+    .bonus-reward {
+      font-size: 16px;
+      font-weight: 700;
+      color: var(--primary-600);
+    }
+
+    .bonus-status {
+      position: absolute;
+      top: 8px;
+      right: 8px;
+      width: 24px;
+      height: 24px;
+      border-radius: var(--radius-full);
+      background: var(--success-500);
+      color: white;
+      display: flex;
+      align-items: center;
+      justify-content: center;
     }

     .referral-stats {
@@ .. @@
     .stats-grid {
       display: grid;
-      grid-template-columns: repeat(3, 1fr);
+      grid-template-columns: repeat(2, 1fr);
       gap: 16px;
     }

     .stat-item {
@@ .. @@
     .stat-item {
       background: white;
       padding: 20px;
       border-radius: 16px;
       text-align: center;
       box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
     }

+    .stat-item.total {
+      grid-column: span 2;
+      background: var(--gradient-primary);
+      color: white;
+    }
+
     .stat-number {
       font-size: 24px;
       font-weight: 700;
-      color: #667eea;
       margin-bottom: 4px;
     }

+    .stat-item:not(.total) .stat-number {
+      color: #667eea;
+    }
+
     .stat-label {
       font-size: 12px;
-      color: #666;
+    }
+
+    .stat-item:not(.total) .stat-label {
+      color: #666;
+    }
+
+    .stat-item.total .stat-label {
+      color: rgba(255, 255, 255, 0.9);
     }

     .referral-list {
@@ .. @@
 })
 export class InviteComponent {
-  referralCode = 'EARN2024';
+  userProfile: any = null;
+  copied = false;
   referralStats = {
-    totalReferrals: 12,
-    totalEarned: 1200,
-    activeReferrals: 8
+    totalReferrals: 5,
+    level1Count: 3,
+    level2Count: 2,
+    level3Count: 0,
+    totalEarned: 2500
   };
-  recentReferrals = [
-    { name: 'Alice Johnson', joinDate: '2 days ago', reward: 100 },
-    { name: 'Bob Smith', joinDate: '1 week ago', reward: 100 },
-    { name: 'Carol Brown', joinDate: '2 weeks ago', reward: 100 }
-  ];

-  copyCode() {
-    navigator.clipboard.writeText(this.referralCode);
-    // Show success message
-    console.log('Referral code copied!');
+  // Lucide Icons
+  readonly Share2Icon = Share2;
+  readonly UsersIcon = Users;
+  readonly GiftIcon = Gift;
+  readonly TrophyIcon = Trophy;
+  readonly StarIcon = Star;
+  readonly CopyIcon = Copy;
+  readonly CheckIcon = Check;
+
+  constructor(private supabaseService: SupabaseService) {}
+
+  ngOnInit() {
+    this.loadUserData();
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
+  getReferralLink(): string {
+    if (!this.userProfile?.referral_code) return '';
+    return `${window.location.origin}/register?ref=${this.userProfile.referral_code}`;
+  }
+
+  async copyReferralLink() {
+    try {
+      await navigator.clipboard.writeText(this.getReferralLink());
+      this.copied = true;
+      setTimeout(() => {
+        this.copied = false;
+      }, 2000);
+    } catch (error) {
+      console.error('Failed to copy:', error);
+    }
+  }
+
+  shareReferralLink() {
+    const shareData = {
+      title: 'Join Volt Capital',
+      text: 'Start earning with smart investments! Join me on Volt Capital and get exclusive bonuses.',
+      url: this.getReferralLink()
+    };
+
+    if (navigator.share) {
+      navigator.share(shareData);
+    } else {
+      // Fallback for browsers that don't support Web Share API
+      this.copyReferralLink();
+    }
   }

-  shareVia(platform: string) {
-    const message = `Join me on this amazing earning app! Use my referral code: ${this.referralCode}`;
-    console.log(`Sharing via ${platform}: ${message}`);
+  async loadReferralStats() {
+    // This would load actual referral statistics from the database
+    // For now, using mock data
   }
 }
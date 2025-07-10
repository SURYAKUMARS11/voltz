import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { SupabaseService } from '../../services/supabase.service';
import { LucideAngularModule, Bell, Eye, CreditCard, ArrowUpRight, ArrowDownLeft, FileText, Building2, TrendingUp, Wallet, Gift, Shield, Award, Star, Zap } from 'lucide-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BottomNavComponent, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header safe-area-top">
        <div class="user-info">
          <div class="user-avatar">
            <div class="avatar-gradient"></div>
            <span>{{getInitials(userProfile?.full_name || 'User')}}</span>
          </div>
          <div class="user-details">
            <h3>Welcome back</h3>
            <p>{{userProfile?.full_name || 'User'}}</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="notification-btn" (click)="showNotifications()">
            <lucide-icon [img]="BellIcon" size="20"></lucide-icon>
            <div class="notification-badge">{{notificationCount}}</div>
          </button>
          <button class="profile-btn" (click)="navigate('/profile')">
            <div class="profile-avatar">{{getInitials(userProfile?.full_name || 'U')}}</div>
          </button>
        </div>
      </div>

      <div class="balance-section">
        <div class="balance-card card">
          <div class="balance-header">
            <div class="balance-info">
              <h4>Available Balance</h4>
              <div class="vip-badge">
                <lucide-icon [img]="StarIcon" size="12"></lucide-icon>
                VIP {{userProfile?.vip_level || 0}}
              </div>
            </div>
            <button class="balance-toggle" (click)="toggleBalanceVisibility()">
              <lucide-icon [img]="EyeIcon" size="18"></lucide-icon>
            </button>
          </div>
          <div class="balance-amount">
            <span class="currency">₹</span>
            <span class="amount" [class.blurred]="!showBalance">
              {{showBalance ? (userProfile?.balance | number) : '••••••'}}
            </span>
          </div>
          <div class="balance-stats">
            <div class="stat">
              <lucide-icon [img]="TrendingUpIcon" size="14"></lucide-icon>
              <span>+₹{{userProfile?.total_earned || 0 | number}} earned</span>
            </div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <div class="actions-grid">
          <button class="action-btn recharge" (click)="navigate('/recharge')">
            <div class="action-icon">
              <lucide-icon [img]="CreditCardIcon" size="20"></lucide-icon>
            </div>
            <span>Recharge</span>
          </button>
          <button class="action-btn withdraw" (click)="navigate('/withdraw')">
            <div class="action-icon">
              <lucide-icon [img]="ArrowUpRightIcon" size="20"></lucide-icon>
            </div>
            <span>Withdraw</span>
          </button>
          <button class="action-btn orders" (click)="navigate('/orders')">
            <div class="action-icon">
              <lucide-icon [img]="FileTextIcon" size="20"></lucide-icon>
            </div>
            <span>Orders</span>
          </button>
          <button class="action-btn bank" (click)="navigate('/bank')">
            <div class="action-icon">
              <lucide-icon [img]="Building2Icon" size="20"></lucide-icon>
            </div>
            <span>Bank</span>
          </button>
        </div>
      </div>

      <div class="recent-activity card">
        <div class="section-header">
          <h4>Recent Activity</h4>
          <button class="view-all-btn" (click)="navigate('/orders')">View All</button>
        </div>
        <div class="activity-list">
          <div class="activity-item" *ngFor="let transaction of recentTransactions">
            <div class="activity-icon" [class]="getTransactionIconClass(transaction.type)">
              <lucide-icon [img]="getTransactionIcon(transaction.type)" size="16"></lucide-icon>
            </div>
            <div class="activity-details">
              <p>{{getTransactionTitle(transaction.type)}}</p>
              <span>{{formatDate(transaction.created_at)}}</span>
            </div>
            <div class="activity-amount" [class]="getAmountClass(transaction.type)">
              {{getAmountPrefix(transaction.type)}}₹{{transaction.amount | number}}
            </div>
          </div>
          <div class="empty-state" *ngIf="recentTransactions.length === 0">
            <lucide-icon [img]="WalletIcon" size="32" class="empty-icon"></lucide-icon>
            <p>No recent activity</p>
            <span>Your transactions will appear here</span>
          </div>
        </div>
      </div>

      <div class="company-section card">
        <div class="company-header">
          <div class="company-logo">
            <div class="logo-gradient"></div>
            <lucide-icon [img]="ZapIcon" size="24"></lucide-icon>
          </div>
          <div class="company-info">
            <h4>Volt Capital</h4>
            <p>Powering Your Financial Future</p>
          </div>
        </div>
        
        <div class="company-description">
          <p>Volt Capital is a leading financial technology company dedicated to providing innovative investment solutions. With our cutting-edge platform, we empower individuals to achieve their financial goals through smart, secure, and profitable investment opportunities.</p>
        </div>
        
        <div class="trust-indicators">
          <div class="indicator">
            <lucide-icon [img]="ShieldIcon" size="16"></lucide-icon>
            <span>Bank-Grade Security</span>
          </div>
          <div class="indicator">
            <lucide-icon [img]="AwardIcon" size="16"></lucide-icon>
            <span>Award Winning Platform</span>
          </div>
          <div class="indicator">
            <lucide-icon [img]="TrendingUpIcon" size="16"></lucide-icon>
            <span>Consistent Returns</span>
          </div>
          <div class="indicator">
            <lucide-icon [img]="GiftIcon" size="16"></lucide-icon>
            <span>Referral Rewards</span>
          </div>
        </div>
      </div>

      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: var(--gray-50);
      padding-bottom: 80px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4);
      background: white;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-xl);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
      font-size: var(--font-size-lg);
      overflow: hidden;
    }

    .avatar-gradient {
      position: absolute;
      inset: 0;
      background: var(--gradient-primary);
      border-radius: var(--radius-xl);
    }

    .user-avatar span {
      position: relative;
      z-index: 1;
    }

    .user-details h3 {
      margin: 0;
      font-size: var(--font-size-base);
      color: var(--gray-800);
      font-weight: 500;
    }

    .user-details p {
      margin: 0;
      font-size: var(--font-size-sm);
      color: var(--gray-600);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .notification-btn,
    .profile-btn {
      position: relative;
      background: var(--gray-100);
      border: none;
      border-radius: var(--radius-xl);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--gray-600);
    }

    .notification-btn:hover,
    .profile-btn:hover {
      background: var(--gray-200);
      transform: translateY(-1px);
    }

    .notification-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--error-500);
      color: white;
      border-radius: var(--radius-full);
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-xs);
      font-weight: 600;
    }

    .profile-avatar {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-lg);
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: white;
    }

    .balance-section {
      padding: var(--space-4);
    }

    .balance-card {
      background: var(--gradient-primary);
      color: white;
      padding: var(--space-6);
      position: relative;
      overflow: hidden;
    }

    .balance-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite;
    }

    .balance-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-4);
    }

    .balance-info h4 {
      margin: 0 0 var(--space-2) 0;
      font-weight: 500;
      opacity: 0.9;
      font-size: var(--font-size-sm);
    }

    .vip-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      background: rgba(255, 255, 255, 0.2);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-weight: 600;
      backdrop-filter: blur(10px);
    }

    .balance-toggle {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: var(--radius-lg);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      transition: all var(--transition-fast);
      backdrop-filter: blur(10px);
    }

    .balance-toggle:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .balance-amount {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    .currency {
      font-size: var(--font-size-xl);
      font-weight: 600;
    }

    .amount {
      font-size: var(--font-size-4xl);
      font-weight: 800;
      letter-spacing: -0.02em;
      transition: all var(--transition-normal);
    }

    .amount.blurred {
      filter: blur(8px);
    }

    .balance-stats {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .stat {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--font-size-sm);
      opacity: 0.9;
    }

    .quick-actions {
      padding: 0 var(--space-4) var(--space-4);
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
    }

    .action-btn {
      background: white;
      border: none;
      border-radius: var(--radius-2xl);
      padding: var(--space-4);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--gray-100);
      min-height: 80px;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .action-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all var(--transition-fast);
    }

    .action-btn.recharge .action-icon {
      background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
    }

    .action-btn.withdraw .action-icon {
      background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
    }

    .action-btn.orders .action-icon {
      background: linear-gradient(135deg, var(--warning-500) 0%, var(--warning-600) 100%);
    }

    .action-btn.bank .action-icon {
      background: linear-gradient(135deg, var(--secondary-500) 0%, var(--secondary-600) 100%);
    }

    .action-btn span {
      font-size: var(--font-size-xs);
      font-weight: 600;
      color: var(--gray-700);
      text-align: center;
    }

    .recent-activity {
      margin: 0 var(--space-4) var(--space-4);
      padding: var(--space-6);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }

    .section-header h4 {
      margin: 0;
      color: var(--gray-800);
      font-size: var(--font-size-lg);
    }

    .view-all-btn {
      background: none;
      border: none;
      color: var(--primary-600);
      font-size: var(--font-size-sm);
      font-weight: 600;
      cursor: pointer;
      padding: var(--space-2);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .view-all-btn:hover {
      background: var(--primary-50);
      color: var(--primary-700);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3);
      background: var(--gray-50);
      border-radius: var(--radius-xl);
      transition: all var(--transition-fast);
    }

    .activity-item:hover {
      background: var(--gray-100);
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .activity-icon.deposit {
      background: var(--success-500);
    }

    .activity-icon.withdrawal {
      background: var(--warning-500);
    }

    .activity-icon.investment {
      background: var(--primary-500);
    }

    .activity-icon.earning {
      background: var(--secondary-500);
    }

    .activity-details {
      flex: 1;
      min-width: 0;
    }

    .activity-details p {
      margin: 0 0 var(--space-1) 0;
      font-weight: 500;
      color: var(--gray-800);
      font-size: var(--font-size-sm);
    }

    .activity-details span {
      font-size: var(--font-size-xs);
      color: var(--gray-500);
    }

    .activity-amount {
      font-weight: 600;
      font-size: var(--font-size-sm);
      flex-shrink: 0;
    }

    .activity-amount.positive {
      color: var(--success-600);
    }

    .activity-amount.negative {
      color: var(--error-600);
    }

    .empty-state {
      text-align: center;
      padding: var(--space-8) var(--space-4);
      color: var(--gray-500);
    }

    .empty-icon {
      color: var(--gray-400);
      margin-bottom: var(--space-3);
    }

    .empty-state p {
      margin: 0 0 var(--space-1) 0;
      font-weight: 500;
      color: var(--gray-600);
    }

    .empty-state span {
      font-size: var(--font-size-sm);
    }

    .company-section {
      margin: 0 var(--space-4) var(--space-4);
      padding: var(--space-6);
    }

    .company-header {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }

    .company-logo {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-2xl);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .logo-gradient {
      position: absolute;
      inset: 0;
      background: var(--gradient-primary);
      border-radius: var(--radius-2xl);
    }

    .company-info h4 {
      margin: 0 0 var(--space-1) 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--gray-800);
    }

    .company-info p {
      margin: 0;
      font-size: var(--font-size-sm);
      color: var(--gray-600);
      font-style: italic;
    }

    .company-description {
      margin-bottom: var(--space-5);
    }

    .company-description p {
      margin: 0;
      color: var(--gray-600);
      line-height: 1.7;
      font-size: var(--font-size-sm);
    }

    .trust-indicators {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-3);
    }

    .indicator {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--gray-50);
      border-radius: var(--radius-lg);
      border: 1px solid var(--gray-100);
    }

    .indicator lucide-icon {
      color: var(--primary-600);
      flex-shrink: 0;
    }

    .indicator span {
      font-size: var(--font-size-xs);
      font-weight: 500;
      color: var(--gray-700);
    }

    @media (max-width: 640px) {
      .header {
        padding: var(--space-3);
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        font-size: var(--font-size-base);
      }

      .balance-section {
        padding: var(--space-3);
      }

      .balance-card {
        padding: var(--space-5);
      }

      .amount {
        font-size: var(--font-size-3xl);
      }

      .quick-actions {
        padding: 0 var(--space-3) var(--space-3);
      }

      .actions-grid {
        gap: var(--space-2);
      }

      .action-btn {
        padding: var(--space-3);
        min-height: 70px;
      }

      .action-icon {
        width: 40px;
        height: 40px;
      }

      .recent-activity,
      .company-section {
        margin: 0 var(--space-3) var(--space-3);
        padding: var(--space-4);
      }

      .trust-indicators {
        gap: var(--space-2);
      }

      .indicator {
        padding: var(--space-2);
      }
    }

    @media (max-width: 480px) {
      .actions-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-3);
      }

      .action-btn {
        min-height: 80px;
      }

      .trust-indicators {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  userProfile: any = null;
  recentTransactions: any[] = [];
  showBalance = true;
  notificationCount = 3;
  private subscriptions: Subscription[] = [];

  // Lucide Icons
  readonly BellIcon = Bell;
  readonly EyeIcon = Eye;
  readonly CreditCardIcon = CreditCard;
  readonly ArrowUpRightIcon = ArrowUpRight;
  readonly ArrowDownLeftIcon = ArrowDownLeft;
  readonly FileTextIcon = FileText;
  readonly Building2Icon = Building2;
  readonly TrendingUpIcon = TrendingUp;
  readonly WalletIcon = Wallet;
  readonly GiftIcon = Gift;
  readonly ShieldIcon = Shield;
  readonly AwardIcon = Award;
  readonly StarIcon = Star;
  readonly ZapIcon = Zap;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    // Initialize currentUser from service
    this.supabaseService.currentUser.subscribe(user => {
      // Handle user state changes if needed
    });
  }

  async ngOnInit() {
    await this.loadUserData();
    this.setupRealtimeSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async loadUserData() {
    // Get current user from the observable
    this.supabaseService.currentUser.subscribe(async (currentUser) => {
    if (currentUser) {
      // Load user profile
      const { data: profile } = await this.supabaseService.getUserProfile(currentUser.id);
      this.userProfile = profile;

      // Load recent transactions
      const { data: transactions } = await this.supabaseService.getUserTransactions(currentUser.id);
      this.recentTransactions = transactions?.slice(0, 5) || [];
    }
    });
  }

  setupRealtimeSubscriptions() {
    this.supabaseService.currentUser.subscribe(currentUser => {
      if (currentUser) {
        // Subscribe to transaction updates
        const transactionSub = this.supabaseService.subscribeToTransactions(
          currentUser.id,
          () => this.loadUserData()
        );
        this.subscriptions.push(transactionSub as any);
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  toggleBalanceVisibility() {
    this.showBalance = !this.showBalance;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  showNotifications() {
    // Implement notification functionality
    console.log('Show notifications');
  }

  getTransactionIcon(type: string) {
    switch (type) {
      case 'deposit': return this.ArrowDownLeftIcon;
      case 'withdrawal': return this.ArrowUpRightIcon;
      case 'investment': return this.TrendingUpIcon;
      case 'earning': return this.GiftIcon;
      default: return this.WalletIcon;
    }
  }

  getTransactionIconClass(type: string): string {
    return type;
  }

  getTransactionTitle(type: string): string {
    switch (type) {
      case 'deposit': return 'Account Recharged';
      case 'withdrawal': return 'Withdrawal Processed';
      case 'investment': return 'Investment Made';
      case 'earning': return 'Daily Earning';
      case 'referral_bonus': return 'Referral Bonus';
      default: return 'Transaction';
    }
  }

  getAmountClass(type: string): string {
    return ['deposit', 'earning', 'referral_bonus'].includes(type) ? 'positive' : 'negative';
  }

  getAmountPrefix(type: string): string {
    return ['deposit', 'earning', 'referral_bonus'].includes(type) ? '+' : '-';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }
}
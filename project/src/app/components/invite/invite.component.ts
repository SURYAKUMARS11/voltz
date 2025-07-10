import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="page-container">
      <div class="header">
        <h2>Invite Friends</h2>
        <div class="earn-more">Earn More!</div>
      </div>

      <div class="invite-card">
        <div class="invite-icon">🎁</div>
        <h3>Invite Friends & Earn</h3>
        <p>Share your referral code and earn ₹100 for each friend who joins!</p>
        
        <div class="referral-code">
          <div class="code-label">Your Referral Code</div>
          <div class="code-value">
            <span>{{referralCode}}</span>
            <button class="copy-btn" (click)="copyCode()">📋</button>
          </div>
        </div>
      </div>

      <div class="share-options">
        <h4>Share via</h4>
        <div class="share-grid">
          <div class="share-item" (click)="shareVia('whatsapp')">
            <div class="share-icon whatsapp">📱</div>
            <span>WhatsApp</span>
          </div>
          <div class="share-item" (click)="shareVia('telegram')">
            <div class="share-icon telegram">✈️</div>
            <span>Telegram</span>
          </div>
          <div class="share-item" (click)="shareVia('facebook')">
            <div class="share-icon facebook">📘</div>
            <span>Facebook</span>
          </div>
          <div class="share-item" (click)="shareVia('twitter')">
            <div class="share-icon twitter">🐦</div>
            <span>Twitter</span>
          </div>
        </div>
      </div>

      <div class="referral-stats">
        <h4>Your Referral Stats</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{referralStats.totalReferrals}}</div>
            <div class="stat-label">Total Referrals</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">₹{{referralStats.totalEarned}}</div>
            <div class="stat-label">Total Earned</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{referralStats.activeReferrals}}</div>
            <div class="stat-label">Active Referrals</div>
          </div>
        </div>
      </div>

      <div class="referral-list">
        <h4>Recent Referrals</h4>
        <div class="referral-item" *ngFor="let referral of recentReferrals">
          <div class="referral-avatar">{{referral.name.charAt(0)}}</div>
          <div class="referral-info">
            <div class="referral-name">{{referral.name}}</div>
            <div class="referral-date">Joined {{referral.joinDate}}</div>
          </div>
          <div class="referral-reward">+₹{{referral.reward}}</div>
        </div>
      </div>

      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: #f5f7fa;
      padding: 0 0 80px 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .earn-more {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .invite-card {
      margin: 20px;
      padding: 32px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      color: white;
      text-align: center;
    }

    .invite-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .invite-card h3 {
      margin: 0 0 12px 0;
      font-size: 24px;
      font-weight: 700;
    }

    .invite-card p {
      margin: 0 0 24px 0;
      opacity: 0.9;
      line-height: 1.6;
    }

    .referral-code {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(10px);
    }

    .code-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 8px;
    }

    .code-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
    }

    .code-value span {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
    }

    .copy-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    .share-options {
      margin: 20px;
    }

    .share-options h4 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .share-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .share-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px 16px;
      background: white;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .share-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .share-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;
    }

    .share-icon.whatsapp {
      background: #25d366;
    }

    .share-icon.telegram {
      background: #0088cc;
    }

    .share-icon.facebook {
      background: #3b5998;
    }

    .share-icon.twitter {
      background: #1da1f2;
    }

    .share-item span {
      font-size: 12px;
      font-weight: 500;
      color: #333;
    }

    .referral-stats {
      margin: 20px;
    }

    .referral-stats h4 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .stat-item {
      background: white;
      padding: 20px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .stat-number {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
    }

    .referral-list {
      margin: 20px;
    }

    .referral-list h4 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .referral-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: white;
      border-radius: 16px;
      margin-bottom: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .referral-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
    }

    .referral-info {
      flex: 1;
    }

    .referral-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 2px;
    }

    .referral-date {
      font-size: 12px;
      color: #666;
    }

    .referral-reward {
      font-weight: 600;
      color: #4caf50;
    }
  `]
})
export class InviteComponent {
  referralCode = 'EARN2024';
  referralStats = {
    totalReferrals: 12,
    totalEarned: 1200,
    activeReferrals: 8
  };
  recentReferrals = [
    { name: 'Alice Johnson', joinDate: '2 days ago', reward: 100 },
    { name: 'Bob Smith', joinDate: '1 week ago', reward: 100 },
    { name: 'Carol Brown', joinDate: '2 weeks ago', reward: 100 }
  ];

  copyCode() {
    navigator.clipboard.writeText(this.referralCode);
    // Show success message
    console.log('Referral code copied!');
  }

  shareVia(platform: string) {
    const message = `Join me on this amazing earning app! Use my referral code: ${this.referralCode}`;
    console.log(`Sharing via ${platform}: ${message}`);
  }
}
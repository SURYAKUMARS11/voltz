import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { DataService } from '../../services/data.service';
import { User } from '../../models/investment.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="page-container">
      <div class="header">
        <h2>Profile</h2>
        <div class="edit-btn">✏️</div>
      </div>

      <div class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-icon">👤</div>
        </div>
        <h3>{{user.name}}</h3>
        <p>{{user.email}}</p>
        <div class="member-badge">VIP {{user.vipLevel || 0}} Member</div>
      </div>

      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-value">₹{{user.balance | number}}</div>
            <div class="stat-label">Current Balance</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-info">
            <div class="stat-value">₹5,200</div>
            <div class="stat-label">Total Earned</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <div class="stat-value">8</div>
            <div class="stat-label">Active Investments</div>
          </div>
        </div>
      </div>

      <div class="menu-section">
        <div class="menu-item" (click)="navigateToPersonalInfo()">
          <div class="menu-icon">📝</div>
          <div class="menu-text">Personal Information</div>
          <div class="menu-arrow">→</div>
        </div>
        <div class="menu-item" (click)="navigateToTransaction()">
          <div class="menu-icon">💳</div>
          <div class="menu-text">Transaction History</div>
          <div class="menu-arrow">→</div>
        </div>
        <div class="menu-item" (click)="navigateToSecurity()">
          <div class="menu-icon">🔒</div>
          <div class="menu-text">Security Settings</div>
          <div class="menu-arrow">→</div>
        </div>
        <div class="menu-item" (click)="navigateToSupport()">
          <div class="menu-icon">🎧</div>
          <div class="menu-text">Customer Support</div>
          <div class="menu-arrow">→</div>
        </div>
      </div>

      <div class="achievements-section">
        <h4>Achievements</h4>
        <div class="achievement-grid">
          <div class="achievement-item">
            <div class="achievement-icon">🏆</div>
            <div class="achievement-name">First Investment</div>
          </div>
          <div class="achievement-item">
            <div class="achievement-icon">⭐</div>
            <div class="achievement-name">Top Earner</div>
          </div>
          <div class="achievement-item">
            <div class="achievement-icon">🎯</div>
            <div class="achievement-name">Goal Crusher</div>
          </div>
          <div class="achievement-item locked">
            <div class="achievement-icon">🔒</div>
            <div class="achievement-name">Master Investor</div>
          </div>
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

    .edit-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .edit-btn:hover {
      background: #e0e0e0;
    }

    .profile-card {
      margin: 20px;
      padding: 32px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      color: white;
      text-align: center;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      backdrop-filter: blur(10px);
    }

    .avatar-icon {
      font-size: 36px;
    }

    .profile-card h3 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 700;
    }

    .profile-card p {
      margin: 0 0 16px 0;
      opacity: 0.9;
    }

    .member-badge {
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }

    .stats-section {
      margin: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .stat-info {
      flex: 1;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 14px;
      color: #666;
    }

    .menu-section {
      margin: 20px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .menu-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .menu-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .menu-text {
      flex: 1;
      font-weight: 500;
      color: #333;
    }

    .menu-arrow {
      color: #666;
      font-size: 18px;
    }

    .achievements-section {
      margin: 20px;
    }

    .achievements-section h4 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .achievement-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .achievement-item {
      background: white;
      padding: 20px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .achievement-item:hover {
      transform: translateY(-2px);
    }

    .achievement-item.locked {
      opacity: 0.5;
    }

    .achievement-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .achievement-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    balance: 15000,
    vipLevel: 0
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.user = this.dataService.getUser();
  }

  navigateToPersonalInfo() {
    console.log('Navigate to Personal Info');
  }

  navigateToTransaction() {
    console.log('Navigate to Transaction History');
  }

  navigateToSecurity() {
    console.log('Navigate to Security Settings');
  }

  navigateToSupport() {
    console.log('Navigate to Customer Support');
  }
}
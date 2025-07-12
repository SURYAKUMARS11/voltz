import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Info, Zap, Shield, Award, Users, TrendingUp } from 'lucide-angular';

@Component({
  selector: 'app-about-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>About App</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <div class="app-logo">
            <lucide-icon [img]="ZapIcon" size="48"></lucide-icon>
          </div>
          <h3>Volt Capital</h3>
          <p class="version">Version 1.0.0</p>
          <p class="tagline">Powering Your Financial Future</p>
        </div>

        <div class="section">
          <h3>
            <lucide-icon [img]="InfoIcon" size="16"></lucide-icon>
            About Us
          </h3>
          <p class="description">
            Volt Capital is a leading financial technology company dedicated to providing innovative investment solutions. 
            With our cutting-edge platform, we empower individuals to achieve their financial goals through smart, 
            secure, and profitable investment opportunities.
          </p>
        </div>

        <div class="section">
          <h3>Key Features</h3>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <lucide-icon [img]="ShieldIcon" size="20"></lucide-icon>
              </div>
              <div class="feature-info">
                <div class="feature-title">Bank-Grade Security</div>
                <div class="feature-description">Your investments are protected with enterprise-level security</div>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <lucide-icon [img]="TrendingUpIcon" size="20"></lucide-icon>
              </div>
              <div class="feature-info">
                <div class="feature-title">Consistent Returns</div>
                <div class="feature-description">Reliable daily earnings from your investments</div>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <lucide-icon [img]="UsersIcon" size="20"></lucide-icon>
              </div>
              <div class="feature-info">
                <div class="feature-title">Referral Rewards</div>
                <div class="feature-description">Earn commissions by inviting friends to join</div>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <lucide-icon [img]="AwardIcon" size="20"></lucide-icon>
              </div>
              <div class="feature-info">
                <div class="feature-title">VIP Benefits</div>
                <div class="feature-description">Unlock exclusive investment plans as you grow</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>Company Information</h3>
          <div class="company-info">
            <div class="info-item">
              <span class="label">Founded</span>
              <span class="value">2024</span>
            </div>
            <div class="info-item">
              <span class="label">Headquarters</span>
              <span class="value">New York, USA</span>
            </div>
            <div class="info-item">
              <span class="label">License</span>
              <span class="value">SEC Registered</span>
            </div>
            <div class="info-item">
              <span class="label">Website</span>
              <span class="value">www.voltcapital.com</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>Legal</h3>
          <div class="legal-links">
            <button class="legal-link" (click)="openTerms()">Terms of Service</button>
            <button class="legal-link" (click)="openPrivacy()">Privacy Policy</button>
            <button class="legal-link" (click)="openLicenses()">Open Source Licenses</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: var(--gray-50);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-5) var(--space-4);
      background: white;
      box-shadow: var(--shadow-sm);
    }

    .back-btn {
      background: var(--gray-100);
      border: none;
      border-radius: var(--radius-full);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--gray-600);
    }

    .back-btn:hover {
      background: var(--gray-200);
      color: var(--gray-800);
    }

    .header h2 {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--gray-800);
    }

    .content {
      padding: var(--space-4);
    }

    .section {
      background: white;
      border-radius: var(--radius-2xl);
      padding: var(--space-6);
      margin-bottom: var(--space-4);
      box-shadow: var(--shadow-sm);
      text-align: center;
    }

    .section:nth-child(n+2) {
      text-align: left;
    }

    .app-logo {
      width: 80px;
      height: 80px;
      margin: 0 auto var(--space-4);
      background: var(--gradient-primary);
      border-radius: var(--radius-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .section h3 {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin: 0 0 var(--space-4) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--gray-800);
    }

    .section:first-child h3 {
      justify-content: center;
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-2);
    }

    .version {
      color: var(--gray-500);
      font-size: var(--font-size-sm);
      margin: 0 0 var(--space-2) 0;
    }

    .tagline {
      color: var(--gray-600);
      font-style: italic;
      margin: 0;
    }

    .description {
      color: var(--gray-600);
      line-height: 1.7;
      margin: 0;
    }

    .features-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
    }

    .feature-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      background: var(--primary-100);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-600);
      flex-shrink: 0;
    }

    .feature-info {
      flex: 1;
    }

    .feature-title {
      font-weight: 500;
      color: var(--gray-800);
      margin-bottom: var(--space-1);
    }

    .feature-description {
      font-size: var(--font-size-sm);
      color: var(--gray-600);
      line-height: 1.5;
    }

    .company-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--gray-100);
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 500;
      color: var(--gray-700);
    }

    .value {
      color: var(--gray-600);
    }

    .legal-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .legal-link {
      background: none;
      border: none;
      padding: var(--space-3);
      text-align: left;
      color: var(--primary-600);
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--radius-lg);
      transition: all var(--transition-fast);
    }

    .legal-link:hover {
      background: var(--primary-50);
      color: var(--primary-700);
    }
  `]
})
export class AboutSettingsComponent {
  readonly ArrowLeftIcon = ArrowLeft;
  readonly InfoIcon = Info;
  readonly ZapIcon = Zap;
  readonly ShieldIcon = Shield;
  readonly AwardIcon = Award;
  readonly UsersIcon = Users;
  readonly TrendingUpIcon = TrendingUp;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }

  openTerms() {
    this.router.navigate(['/settings/terms']);
  }

  openPrivacy() {
    this.router.navigate(['/settings/privacy']);
  }

  openLicenses() {
    console.log('Opening open source licenses');
  }
}
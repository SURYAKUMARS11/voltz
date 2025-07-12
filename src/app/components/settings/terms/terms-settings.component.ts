import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, FileText } from 'lucide-angular';

@Component({
  selector: 'app-terms-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Terms & Conditions</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <div class="terms-header">
            <lucide-icon [img]="FileTextIcon" size="24"></lucide-icon>
            <h3>Terms of Service</h3>
            <p class="last-updated">Last updated: January 1, 2024</p>
          </div>
          
          <div class="terms-content">
            <div class="terms-section">
              <h4>1. Acceptance of Terms</h4>
              <p>
                By accessing and using Volt Capital's services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div class="terms-section">
              <h4>2. Investment Risks</h4>
              <p>
                All investments carry risk. Past performance does not guarantee future results. You should carefully 
                consider your investment objectives, level of experience, and risk appetite before making any investment decisions.
              </p>
            </div>

            <div class="terms-section">
              <h4>3. User Responsibilities</h4>
              <p>
                Users are responsible for maintaining the confidentiality of their account information and for all 
                activities that occur under their account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div class="terms-section">
              <h4>4. Prohibited Activities</h4>
              <p>
                You may not use our service for any illegal or unauthorized purpose. You agree to comply with all 
                local laws regarding online conduct and acceptable content.
              </p>
            </div>

            <div class="terms-section">
              <h4>5. Withdrawal Policy</h4>
              <p>
                Withdrawals are processed within 1-2 business days. Minimum withdrawal amount is ₹100. 
                Processing fees may apply as outlined in our fee schedule.
              </p>
            </div>

            <div class="terms-section">
              <h4>6. Referral Program</h4>
              <p>
                Our referral program allows users to earn commissions by inviting others. Commission rates are 
                subject to change with prior notice. Fraudulent referral activities will result in account termination.
              </p>
            </div>

            <div class="terms-section">
              <h4>7. Limitation of Liability</h4>
              <p>
                Volt Capital shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </div>

            <div class="terms-section">
              <h4>8. Modifications</h4>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                via email or through our platform. Continued use of the service constitutes acceptance of the modified terms.
              </p>
            </div>

            <div class="terms-section">
              <h4>9. Contact Information</h4>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at legal@voltcapital.com 
                or through our customer support channels.
              </p>
            </div>
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
      box-shadow: var(--shadow-sm);
    }

    .terms-header {
      text-align: center;
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--gray-200);
    }

    .terms-header lucide-icon {
      color: var(--primary-600);
      margin-bottom: var(--space-2);
    }

    .terms-header h3 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--font-size-2xl);
      font-weight: 700;
      color: var(--gray-800);
    }

    .last-updated {
      margin: 0;
      font-size: var(--font-size-sm);
      color: var(--gray-500);
    }

    .terms-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .terms-section h4 {
      margin: 0 0 var(--space-3) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--gray-800);
    }

    .terms-section p {
      margin: 0;
      color: var(--gray-600);
      line-height: 1.7;
    }
  `]
})
export class TermsSettingsComponent {
  readonly ArrowLeftIcon = ArrowLeft;
  readonly FileTextIcon = FileText;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Shield } from 'lucide-angular';

@Component({
  selector: 'app-privacy-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Privacy Policy</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <div class="privacy-header">
            <lucide-icon [img]="ShieldIcon" size="24"></lucide-icon>
            <h3>Privacy Policy</h3>
            <p class="last-updated">Last updated: January 1, 2024</p>
          </div>
          
          <div class="privacy-content">
            <div class="privacy-section">
              <h4>1. Information We Collect</h4>
              <p>
                We collect information you provide directly to us, such as when you create an account, make investments, 
                or contact us for support. This includes your name, email address, phone number, and financial information.
              </p>
            </div>

            <div class="privacy-section">
              <h4>2. How We Use Your Information</h4>
              <p>
                We use the information we collect to provide, maintain, and improve our services, process transactions, 
                send you technical notices and support messages, and communicate with you about products and services.
              </p>
            </div>

            <div class="privacy-section">
              <h4>3. Information Sharing</h4>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this policy. We may share information with trusted partners who assist us in operating our platform.
              </p>
            </div>

            <div class="privacy-section">
              <h4>4. Data Security</h4>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. We use encryption and secure servers to safeguard your data.
              </p>
            </div>

            <div class="privacy-section">
              <h4>5. Cookies and Tracking</h4>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. 
                You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div class="privacy-section">
              <h4>6. Your Rights</h4>
              <p>
                You have the right to access, update, or delete your personal information. You may also opt out of 
                certain communications from us. Contact us to exercise these rights.
              </p>
            </div>

            <div class="privacy-section">
              <h4>7. Data Retention</h4>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with 
                legal obligations. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </div>

            <div class="privacy-section">
              <h4>8. International Transfers</h4>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information during such transfers.
              </p>
            </div>

            <div class="privacy-section">
              <h4>9. Changes to This Policy</h4>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes 
                by posting the new policy on our platform and updating the "last updated" date.
              </p>
            </div>

            <div class="privacy-section">
              <h4>10. Contact Us</h4>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us at 
                privacy@voltcapital.com or through our customer support channels.
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

    .privacy-header {
      text-align: center;
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--gray-200);
    }

    .privacy-header lucide-icon {
      color: var(--primary-600);
      margin-bottom: var(--space-2);
    }

    .privacy-header h3 {
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

    .privacy-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .privacy-section h4 {
      margin: 0 0 var(--space-3) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--gray-800);
    }

    .privacy-section p {
      margin: 0;
      color: var(--gray-600);
      line-height: 1.7;
    }
  `]
})
export class PrivacySettingsComponent {
  readonly ArrowLeftIcon = ArrowLeft;
  readonly ShieldIcon = Shield;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }
}
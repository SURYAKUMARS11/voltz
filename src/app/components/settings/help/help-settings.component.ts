import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, HelpCircle, ChevronRight, Book, MessageCircle, Video, FileText } from 'lucide-angular';

@Component({
  selector: 'app-help-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Help & FAQ</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <h3>
            <lucide-icon [img]="HelpCircleIcon" size="16"></lucide-icon>
            Frequently Asked Questions
          </h3>
          <div class="faq-list">
            <div class="faq-item" *ngFor="let faq of faqs" (click)="toggleFaq(faq)">
              <div class="faq-question">
                <span>{{faq.question}}</span>
                <lucide-icon [img]="ChevronRightIcon" size="16" [class.rotated]="faq.expanded"></lucide-icon>
              </div>
              <div class="faq-answer" [class.expanded]="faq.expanded">
                {{faq.answer}}
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>
            <lucide-icon [img]="BookIcon" size="16"></lucide-icon>
            Help Resources
          </h3>
          <div class="resource-item" (click)="openResource('guide')">
            <div class="resource-icon">
              <lucide-icon [img]="BookIcon" size="20"></lucide-icon>
            </div>
            <div class="resource-info">
              <div class="resource-title">User Guide</div>
              <div class="resource-description">Complete guide to using Volt Capital</div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
          </div>
          <div class="resource-item" (click)="openResource('tutorials')">
            <div class="resource-icon">
              <lucide-icon [img]="VideoIcon" size="20"></lucide-icon>
            </div>
            <div class="resource-info">
              <div class="resource-title">Video Tutorials</div>
              <div class="resource-description">Step-by-step video guides</div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
          </div>
          <div class="resource-item" (click)="openResource('docs')">
            <div class="resource-icon">
              <lucide-icon [img]="FileTextIcon" size="20"></lucide-icon>
            </div>
            <div class="resource-info">
              <div class="resource-title">Documentation</div>
              <div class="resource-description">Technical documentation and API reference</div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
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

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .faq-item {
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--transition-fast);
    }

    .faq-item:hover {
      border-color: var(--primary-300);
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4);
      cursor: pointer;
      font-weight: 500;
      color: var(--gray-800);
    }

    .faq-question lucide-icon {
      transition: transform var(--transition-fast);
    }

    .faq-question lucide-icon.rotated {
      transform: rotate(90deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--transition-normal);
      background: var(--gray-50);
      color: var(--gray-600);
      line-height: 1.6;
    }

    .faq-answer.expanded {
      max-height: 200px;
      padding: var(--space-4);
    }

    .resource-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid var(--gray-100);
      margin-bottom: var(--space-2);
    }

    .resource-item:hover {
      background: var(--gray-50);
      border-color: var(--primary-200);
    }

    .resource-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      background: var(--primary-100);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-600);
    }

    .resource-info {
      flex: 1;
    }

    .resource-title {
      font-weight: 500;
      color: var(--gray-800);
      margin-bottom: var(--space-1);
    }

    .resource-description {
      font-size: var(--font-size-sm);
      color: var(--gray-600);
    }
  `]
})
export class HelpSettingsComponent {
  faqs = [
    {
      question: 'How do I start investing?',
      answer: 'To start investing, go to the Invest tab, choose a plan that suits your budget and VIP level, then follow the investment process.',
      expanded: false
    },
    {
      question: 'How do daily earnings work?',
      answer: 'Daily earnings are automatically credited to your account based on your active investments. You can view them in your transaction history.',
      expanded: false
    },
    {
      question: 'What are VIP levels?',
      answer: 'VIP levels unlock higher investment plans with better returns. You can upgrade your VIP level by completing certain investments.',
      expanded: false
    },
    {
      question: 'How does the referral system work?',
      answer: 'Share your referral link with friends. When they invest, you earn commissions: 36% for direct referrals, 9% for 2nd level, and 3% for 3rd level.',
      expanded: false
    },
    {
      question: 'How can I withdraw my earnings?',
      answer: 'Go to the Withdraw section, enter the amount you want to withdraw, and select your verified bank account. Processing takes 1-2 business days.',
      expanded: false
    }
  ];

  readonly ArrowLeftIcon = ArrowLeft;
  readonly HelpCircleIcon = HelpCircle;
  readonly ChevronRightIcon = ChevronRight;
  readonly BookIcon = Book;
  readonly MessageCircleIcon = MessageCircle;
  readonly VideoIcon = Video;
  readonly FileTextIcon = FileText;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }

  toggleFaq(faq: any) {
    faq.expanded = !faq.expanded;
  }

  openResource(type: string) {
    console.log('Opening resource:', type);
  }
}
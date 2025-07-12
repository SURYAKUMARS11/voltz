import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, ExternalLink } from 'lucide-angular';

@Component({
  selector: 'app-telegram-popup',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="popup-overlay" (click)="onClose()">
      <div class="popup-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="onClose()">
          <lucide-icon [img]="XIcon" size="20"></lucide-icon>
        </button>
        
        <div class="popup-header">
          <div class="telegram-icon">📱</div>
          <h3>Join Our Community!</h3>
          <p>Get exclusive updates, tips, and connect with other investors</p>
        </div>
        
        <div class="benefits">
          <div class="benefit-item">
            <span class="benefit-icon">💰</span>
            <span>Investment Tips & Strategies</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">📈</span>
            <span>Market Updates & Analysis</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">🎁</span>
            <span>Exclusive Bonuses & Offers</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">👥</span>
            <span>Community Support</span>
          </div>
        </div>
        
        <div class="action-buttons">
          <a 
            href="https://t.me/voltcapital" 
            target="_blank" 
            class="join-btn"
            (click)="onJoin()"
          >
            <span>Join Telegram Group</span>
            <lucide-icon [img]="ExternalLinkIcon" size="16"></lucide-icon>
          </a>
          <button class="skip-btn" (click)="onClose()">Maybe Later</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: var(--space-4);
      backdrop-filter: blur(4px);
    }

    .popup-content {
      background: white;
      border-radius: var(--radius-2xl);
      padding: var(--space-8);
      max-width: 400px;
      width: 100%;
      position: relative;
      box-shadow: var(--shadow-2xl);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .close-btn {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      background: var(--gray-100);
      border: none;
      border-radius: var(--radius-full);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--gray-600);
    }

    .close-btn:hover {
      background: var(--gray-200);
      color: var(--gray-800);
    }

    .popup-header {
      text-align: center;
      margin-bottom: var(--space-6);
    }

    .telegram-icon {
      font-size: 48px;
      margin-bottom: var(--space-3);
    }

    .popup-header h3 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--gray-800);
    }

    .popup-header p {
      margin: 0;
      color: var(--gray-600);
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }

    .benefits {
      margin-bottom: var(--space-6);
    }

    .benefit-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3);
      background: var(--gray-50);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-2);
      font-size: var(--font-size-sm);
      color: var(--gray-700);
    }

    .benefit-icon {
      font-size: var(--font-size-lg);
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .join-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-4);
      background: var(--gradient-primary);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-lg);
      font-weight: 600;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-md);
    }

    .join-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .skip-btn {
      padding: var(--space-3);
      background: transparent;
      color: var(--gray-600);
      border: none;
      border-radius: var(--radius-lg);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .skip-btn:hover {
      background: var(--gray-100);
      color: var(--gray-800);
    }

    @media (max-width: 480px) {
      .popup-content {
        padding: var(--space-6);
        margin: var(--space-4);
      }

      .telegram-icon {
        font-size: 40px;
      }

      .popup-header h3 {
        font-size: var(--font-size-lg);
      }
    }
  `]
})
export class TelegramPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() join = new EventEmitter<void>();

  readonly XIcon = X;
  readonly ExternalLinkIcon = ExternalLink;

  onClose() {
    this.close.emit();
  }

  onJoin() {
    this.join.emit();
  }
}
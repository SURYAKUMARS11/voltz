import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, MessageCircle, Mail, Phone, Send } from 'lucide-angular';

@Component({
  selector: 'app-support-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Customer Support</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <h3>
            <lucide-icon [img]="MessageCircleIcon" size="16"></lucide-icon>
            Contact Us
          </h3>
          <div class="contact-methods">
            <div class="contact-item">
              <div class="contact-icon">
                <lucide-icon [img]="MailIcon" size="20"></lucide-icon>
              </div>
              <div class="contact-info">
                <div class="contact-title">Email Support</div>
                <div class="contact-description">support@voltcapital.com</div>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <lucide-icon [img]="PhoneIcon" size="20"></lucide-icon>
              </div>
              <div class="contact-info">
                <div class="contact-title">Phone Support</div>
                <div class="contact-description">+1 (555) 123-4567</div>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <lucide-icon [img]="MessageCircleIcon" size="20"></lucide-icon>
              </div>
              <div class="contact-info">
                <div class="contact-title">Live Chat</div>
                <div class="contact-description">Available 24/7</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>Send us a Message</h3>
          <form class="support-form" (ngSubmit)="sendMessage()">
            <div class="form-group">
              <label>Subject</label>
              <select [(ngModel)]="messageSubject" name="subject" class="input">
                <option value="">Select a subject</option>
                <option value="technical">Technical Issue</option>
                <option value="account">Account Problem</option>
                <option value="investment">Investment Question</option>
                <option value="withdrawal">Withdrawal Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea 
                [(ngModel)]="messageText" 
                name="message"
                placeholder="Describe your issue or question..."
                class="input textarea"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" class="send-btn" [disabled]="!messageSubject || !messageText">
              <lucide-icon [img]="SendIcon" size="16"></lucide-icon>
              Send Message
            </button>
          </form>
        </div>

        <div class="section">
          <h3>Support Hours</h3>
          <div class="hours-info">
            <div class="hours-item">
              <span class="day">Monday - Friday</span>
              <span class="time">9:00 AM - 6:00 PM EST</span>
            </div>
            <div class="hours-item">
              <span class="day">Saturday</span>
              <span class="time">10:00 AM - 4:00 PM EST</span>
            </div>
            <div class="hours-item">
              <span class="day">Sunday</span>
              <span class="time">Closed</span>
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

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--gray-50);
      border-radius: var(--radius-lg);
    }

    .contact-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      background: var(--primary-100);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-600);
    }

    .contact-info {
      flex: 1;
    }

    .contact-title {
      font-weight: 500;
      color: var(--gray-800);
      margin-bottom: var(--space-1);
    }

    .contact-description {
      font-size: var(--font-size-sm);
      color: var(--gray-600);
    }

    .support-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .form-group label {
      font-weight: 500;
      color: var(--gray-700);
      font-size: var(--font-size-sm);
    }

    .textarea {
      resize: vertical;
      min-height: 120px;
    }

    .send-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-4);
      background: var(--gradient-primary);
      color: white;
      border: none;
      border-radius: var(--radius-lg);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .send-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .hours-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .hours-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--gray-100);
    }

    .hours-item:last-child {
      border-bottom: none;
    }

    .day {
      font-weight: 500;
      color: var(--gray-800);
    }

    .time {
      color: var(--gray-600);
    }
  `]
})
export class SupportSettingsComponent {
  messageSubject = '';
  messageText = '';

  readonly ArrowLeftIcon = ArrowLeft;
  readonly MessageCircleIcon = MessageCircle;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly SendIcon = Send;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }

  sendMessage() {
    if (this.messageSubject && this.messageText) {
      console.log('Sending message:', {
        subject: this.messageSubject,
        message: this.messageText
      });
      // Reset form
      this.messageSubject = '';
      this.messageText = '';
      alert('Message sent successfully!');
    }
  }
}
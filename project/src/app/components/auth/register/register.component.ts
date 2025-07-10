import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { LucideAngularModule, Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap, Shield } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  template: `
    <div class="auth-container">
      <div class="auth-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="auth-card fade-in">
        <div class="auth-header">
          <div class="app-logo">
            <lucide-icon [img]="ZapIcon" class="logo-icon"></lucide-icon>
          </div>
          <h1 class="gradient-text">Create Account</h1>
          <p>Join thousands earning with Volt Capital</p>
        </div>
        
        <form class="auth-form" (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-group">
            <label for="name">
              <lucide-icon [img]="UserIcon" size="16"></lucide-icon>
              Full Name
            </label>
            <input 
              type="text" 
              id="name" 
              [(ngModel)]="name" 
              name="name"
              placeholder="Enter your full name"
              class="input focus-ring"
              required
              [class.error]="nameError"
            >
            <div class="error-message" *ngIf="nameError">{{nameError}}</div>
          </div>
          
          <div class="form-group">
            <label for="email">
              <lucide-icon [img]="MailIcon" size="16"></lucide-icon>
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              [(ngModel)]="email" 
              name="email"
              placeholder="Enter your email"
              class="input focus-ring"
              required
              [class.error]="emailError"
            >
            <div class="error-message" *ngIf="emailError">{{emailError}}</div>
          </div>
          
          <div class="form-group">
            <label for="password">
              <lucide-icon [img]="LockIcon" size="16"></lucide-icon>
              Password
            </label>
            <div class="password-input">
              <input 
                [type]="showPassword ? 'text' : 'password'" 
                id="password" 
                [(ngModel)]="password" 
                name="password"
                placeholder="Create a strong password"
                class="input focus-ring"
                required
                [class.error]="passwordError"
              >
              <button 
                type="button" 
                class="password-toggle"
                (click)="togglePassword()"
              >
                <lucide-icon [img]="showPassword ? EyeOffIcon : EyeIcon" size="18"></lucide-icon>
              </button>
            </div>
            <div class="password-strength">
              <div class="strength-bar">
                <div class="strength-fill" [class]="getPasswordStrengthClass()"></div>
              </div>
              <span class="strength-text">{{getPasswordStrengthText()}}</span>
            </div>
            <div class="error-message" *ngIf="passwordError">{{passwordError}}</div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">
              <lucide-icon [img]="ShieldIcon" size="16"></lucide-icon>
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              [(ngModel)]="confirmPassword" 
              name="confirmPassword"
              placeholder="Confirm your password"
              class="input focus-ring"
              required
              [class.error]="confirmPasswordError"
            >
            <div class="error-message" *ngIf="confirmPasswordError">{{confirmPasswordError}}</div>
          </div>
          
          <div class="form-group">
            <label for="referralCode">
              Referral Code (Optional)
            </label>
            <input 
              type="text" 
              id="referralCode" 
              [(ngModel)]="referralCode" 
              name="referralCode"
              placeholder="Enter referral code"
              class="input focus-ring"
            >
          </div>
          
          <div class="terms-checkbox">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="acceptTerms" name="acceptTerms" required>
              <span class="checkmark"></span>
              I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary auth-btn"
            [disabled]="isLoading || !registerForm.valid || !acceptTerms"
          >
            <span *ngIf="!isLoading">
              Create Account
              <lucide-icon [img]="ArrowRightIcon" size="16"></lucide-icon>
            </span>
            <div *ngIf="isLoading" class="loading-spinner"></div>
          </button>
          
          <div class="error-message" *ngIf="registerError">{{registerError}}</div>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login" class="signin-link">Sign In</a></p>
        </div>
        
        <div class="security-badge">
          <div class="security-icon">🛡️</div>
          <span>Your data is protected with enterprise-grade security</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-4);
      position: relative;
      overflow: hidden;
    }

    .auth-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, var(--secondary-600) 0%, var(--primary-600) 100%);
      z-index: -1;
    }

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.3;
      animation: float 6s ease-in-out infinite;
    }

    .orb-1 {
      width: 250px;
      height: 250px;
      background: var(--success-400);
      top: -125px;
      right: -125px;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 180px;
      height: 180px;
      background: var(--warning-400);
      bottom: -90px;
      left: -90px;
      animation-delay: 3s;
    }

    .orb-3 {
      width: 120px;
      height: 120px;
      background: var(--primary-300);
      top: 30%;
      left: -60px;
      animation-delay: 1.5s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(180deg); }
    }

    .auth-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: var(--radius-2xl);
      padding: var(--space-8);
      width: 100%;
      max-width: 440px;
      box-shadow: var(--shadow-2xl);
      border: 1px solid rgba(255, 255, 255, 0.2);
      max-height: 90vh;
      overflow-y: auto;
    }

    .auth-header {
      text-align: center;
      margin-bottom: var(--space-6);
    }

    .app-logo {
      width: 70px;
      height: 70px;
      margin: 0 auto var(--space-3);
      background: var(--gradient-primary);
      border-radius: var(--radius-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
      animation: pulse 2s infinite;
    }

    .logo-icon {
      color: white;
      width: 35px;
      height: 35px;
    }

    .auth-header h1 {
      font-size: var(--font-size-2xl);
      font-weight: 800;
      margin: 0 0 var(--space-2) 0;
      letter-spacing: -0.025em;
    }

    .auth-header p {
      color: var(--gray-600);
      margin: 0;
      font-size: var(--font-size-sm);
    }

    .form-group {
      margin-bottom: var(--space-5);
    }

    .form-group label {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
      font-weight: 600;
      color: var(--gray-700);
      font-size: var(--font-size-sm);
    }

    .password-input {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: var(--space-3);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--gray-400);
      cursor: pointer;
      padding: var(--space-2);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .password-toggle:hover {
      color: var(--gray-600);
      background: var(--gray-100);
    }

    .password-strength {
      margin-top: var(--space-2);
    }

    .strength-bar {
      width: 100%;
      height: 4px;
      background: var(--gray-200);
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-bottom: var(--space-1);
    }

    .strength-fill {
      height: 100%;
      transition: all var(--transition-normal);
      border-radius: var(--radius-full);
    }

    .strength-fill.weak {
      width: 25%;
      background: var(--error-500);
    }

    .strength-fill.fair {
      width: 50%;
      background: var(--warning-500);
    }

    .strength-fill.good {
      width: 75%;
      background: var(--primary-500);
    }

    .strength-fill.strong {
      width: 100%;
      background: var(--success-500);
    }

    .strength-text {
      font-size: var(--font-size-xs);
      color: var(--gray-500);
    }

    .terms-checkbox {
      margin-bottom: var(--space-6);
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      cursor: pointer;
      color: var(--gray-600);
      font-size: var(--font-size-xs);
      line-height: 1.5;
    }

    .checkbox-label input[type="checkbox"] {
      display: none;
    }

    .checkmark {
      width: 18px;
      height: 18px;
      border: 2px solid var(--gray-300);
      border-radius: var(--radius-sm);
      position: relative;
      transition: all var(--transition-fast);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark {
      background: var(--primary-500);
      border-color: var(--primary-500);
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 12px;
      font-weight: bold;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .terms-link {
      color: var(--primary-600);
      text-decoration: none;
      font-weight: 500;
    }

    .terms-link:hover {
      text-decoration: underline;
    }

    .auth-btn {
      width: 100%;
      padding: var(--space-4);
      font-size: var(--font-size-base);
      font-weight: 600;
      margin-bottom: var(--space-4);
      position: relative;
      overflow: hidden;
    }

    .auth-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .auth-btn:hover::before {
      left: 100%;
    }

    .auth-footer {
      text-align: center;
      margin-bottom: var(--space-4);
    }

    .auth-footer p {
      color: var(--gray-600);
      margin: 0;
      font-size: var(--font-size-sm);
    }

    .signin-link {
      color: var(--primary-600);
      text-decoration: none;
      font-weight: 600;
      transition: color var(--transition-fast);
    }

    .signin-link:hover {
      color: var(--primary-700);
      text-decoration: underline;
    }

    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--gray-50);
      border-radius: var(--radius-lg);
      font-size: var(--font-size-xs);
      color: var(--gray-500);
      border: 1px solid var(--gray-200);
    }

    .security-icon {
      font-size: var(--font-size-sm);
    }

    .error-message {
      color: var(--error-600);
      font-size: var(--font-size-xs);
      margin-top: var(--space-1);
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    .input.error {
      border-color: var(--error-400);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    @media (max-width: 480px) {
      .auth-container {
        padding: var(--space-2);
      }

      .auth-card {
        padding: var(--space-6);
        max-height: 95vh;
      }

      .app-logo {
        width: 60px;
        height: 60px;
      }

      .logo-icon {
        width: 30px;
        height: 30px;
      }

      .auth-header h1 {
        font-size: var(--font-size-xl);
      }

      .form-group {
        margin-bottom: var(--space-4);
      }
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  referralCode = '';
  acceptTerms = false;
  showPassword = false;
  isLoading = false;
  
  nameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  registerError = '';

  // Lucide Icons
  readonly ZapIcon = Zap;
  readonly UserIcon = User;
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly ShieldIcon = Shield;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;
  readonly ArrowRightIcon = ArrowRight;

  private router = inject(Router);
  private supabaseService = inject(SupabaseService);

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getPasswordStrength(): number {
    let strength = 0;
    if (this.password.length >= 8) strength++;
    if (/[a-z]/.test(this.password)) strength++;
    if (/[A-Z]/.test(this.password)) strength++;
    if (/[0-9]/.test(this.password)) strength++;
    if (/[^A-Za-z0-9]/.test(this.password)) strength++;
    return strength;
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'fair';
    if (strength <= 3) return 'good';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 1) return 'Weak password';
    if (strength <= 2) return 'Fair password';
    if (strength <= 3) return 'Good password';
    return 'Strong password';
  }

  validateForm(): boolean {
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.registerError = '';

    if (!this.name.trim()) {
      this.nameError = 'Full name is required';
      return false;
    }

    if (this.name.trim().length < 2) {
      this.nameError = 'Name must be at least 2 characters';
      return false;
    }

    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }

    if (!this.email.includes('@')) {
      this.emailError = 'Please enter a valid email';
      return false;
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
      return false;
    }

    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      return false;
    }

    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      return false;
    }

    return true;
  }

  async onRegister() {
    if (!this.validateForm()) return;

    this.isLoading = true;

    try {
      const { data, error } = await this.supabaseService.signUp(
        this.email, 
        this.password, 
        this.name.trim()
      );
      
      if (error) {
        this.registerError = error.message;
      } else if (data.user) {
        // Handle referral if provided
        if (this.referralCode.trim()) {
          // TODO: Process referral code
        }
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.registerError = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
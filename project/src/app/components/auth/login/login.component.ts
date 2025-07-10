import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; 
import { SupabaseService } from '../../../services/supabase.service'; 
import { LucideAngularModule, Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-angular'; 

@Component({ 
 selector: 'app-login', 
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
     <h1 class="gradient-text">Welcome Back</h1> 
     <p>Sign in to continue your financial journey</p> 
    </div> 
     
    <form class="auth-form" (ngSubmit)="onLogin()" #loginForm="ngForm"> 
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
        placeholder="Enter your password" 
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
      <div class="error-message" *ngIf="passwordError">{{passwordError}}</div> 
     </div> 
      
     <div class="form-options"> 
      <label class="checkbox-label"> 
       <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe"> 
       <span class="checkmark"></span> 
       Remember me 
      </label> 
      <a href="#" class="forgot-link">Forgot password?</a> 
     </div> 
      
     <button 
      type="submit" 
      class="btn btn-primary auth-btn" 
      [disabled]="isLoading || !loginForm.valid" 
     > 
      <span *ngIf="!isLoading"> 
       Sign In 
       <lucide-icon [img]="ArrowRightIcon" size="16"></lucide-icon> 
      </span> 
      <div *ngIf="isLoading" class="loading-spinner"></div> 
     </button> 
      
     <div class="error-message" *ngIf="loginError">{{loginError}}</div> 
    </form> 
     
    <div class="auth-footer"> 
     <p>Don't have an account? <a routerLink="/register" class="signup-link">Create Account</a></p> 
    </div> 
     
    <div class="security-badge"> 
     <div class="security-icon">:shield:</div> 
     <span>Secured with 256-bit SSL encryption</span> 
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
   background: linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%); 
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
   width: 300px; 
   height: 300px; 
   background: var(--primary-400); 
   top: -150px; 
   left: -150px; 
   animation-delay: 0s; 
  } 

  .orb-2 { 
   width: 200px; 
   height: 200px; 
   background: var(--secondary-400); 
   bottom: -100px; 
   right: -100px; 
   animation-delay: 2s; 
  } 

  .orb-3 { 
   width: 150px; 
   height: 150px; 
   background: var(--warning-400); 
   top: 50%; 
   right: -75px; 
   animation-delay: 4s; 
  } 

  @keyframes float { 
   0%, 100% { transform: translateY(0px) rotate(0deg); } 
   50% { transform: translateY(-20px) rotate(180deg); } 
  } 

  .auth-card { 
   background: rgba(255, 255, 255, 0.95); 
   backdrop-filter: blur(20px); 
   border-radius: var(--radius-2xl); 
   padding: var(--space-8); 
   width: 100%; 
   max-width: 420px; 
   box-shadow: var(--shadow-2xl); 
   border: 1px solid rgba(255, 255, 255, 0.2); 
   position: relative; 
  } 

  .auth-header { 
   text-align: center; 
   margin-bottom: var(--space-8); 
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
   box-shadow: var(--shadow-lg); 
   animation: pulse 2s infinite; 
  } 

  .logo-icon { 
   color: white; 
   width: 40px; 
   height: 40px; 
  } 

  .auth-header h1 { 
   font-size: var(--font-size-3xl); 
   font-weight: 800; 
   margin: 0 0 var(--space-2) 0; 
   letter-spacing: -0.025em; 
  } 

  .auth-header p { 
   color: var(--gray-600); 
   margin: 0; 
   font-size: var(--font-size-base); 
  } 

  .form-group { 
   margin-bottom: var(--space-6); 
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

  .form-options { 
   display: flex; 
   justify-content: space-between; 
   align-items: center; 
   margin-bottom: var(--space-6); 
   font-size: var(--font-size-sm); 
  } 

  .checkbox-label { 
   display: flex; 
   align-items: center; 
   gap: var(--space-2); 
   cursor: pointer; 
   color: var(--gray-600); 
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

  .forgot-link { 
   color: var(--primary-600); 
   text-decoration: none; 
   font-weight: 500; 
   transition: color var(--transition-fast); 
  } 

  .forgot-link:hover { 
   color: var(--primary-700); 
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
   margin-bottom: var(--space-6); 
  } 

  .auth-footer p { 
   color: var(--gray-600); 
   margin: 0; 
   font-size: var(--font-size-sm); 
  } 

  .signup-link { 
   color: var(--primary-600); 
   text-decoration: none; 
   font-weight: 600; 
   transition: color var(--transition-fast); 
  } 

  .signup-link:hover { 
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
    font-size: var(--font-size-2xl); 
   } 
  } 
 `] 
}) 
export class LoginComponent { 
 email = ''; 
 password = ''; 
 rememberMe = false; 
 showPassword = false; 
 isLoading = false; 
 emailError = ''; 
 passwordError = ''; 
 loginError = ''; 

 // Lucide Icons 
 readonly ZapIcon = Zap; 
 readonly MailIcon = Mail; 
 readonly LockIcon = Lock; 
 readonly EyeIcon = Eye; 
 readonly EyeOffIcon = EyeOff; 
 readonly ArrowRightIcon = ArrowRight; 

 constructor( 
  private router: Router, 
  private supabaseService: SupabaseService 
 ) {} 

 togglePassword() { 
  this.showPassword = !this.showPassword; 
 } 

 validateForm(): boolean { 
  this.emailError = ''; 
  this.passwordError = ''; 
  this.loginError = ''; 

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

  return true; 
 } 

 async onLogin() { 
  if (!this.validateForm()) return; 

  this.isLoading = true; 

  try { 
   const { data, error } = await this.supabaseService.signIn(this.email, this.password); 
    
   if (error) { 
    this.loginError = error.message; 
   } else if (data.user) { 
    this.router.navigate(['/home']); 
   } 
  } catch (error: any) { 
   this.loginError = 'An unexpected error occurred. Please try again.'; 
  } finally { 
   this.isLoading = false; 
  } 
 } 
}
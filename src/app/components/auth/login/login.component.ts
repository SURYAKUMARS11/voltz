async onLogin() { 
  if (!this.validateForm()) return; 

  this.isLoading = true; 

  try { 
   const { data, error } = await this.supabaseService.signIn(this.email, this.password); 
    
   if (error) { 
    // Handle specific error cases
    if (error.message.includes('Email not confirmed')) {
      this.loginError = 'Please check your email and click the verification link before signing in.';
    } else if (error.message.includes('Invalid login credentials')) {
      this.loginError = 'Invalid email or password. Please check your credentials and try again.';
    } else {
      this.loginError = error.message;
    }

    .resend-section {
      margin-top: var(--space-4);
      padding: var(--space-4);
      background: var(--gray-50);
      border-radius: var(--radius-lg);
      border: 1px solid var(--gray-200);
      text-align: center;
    }

    .resend-text {
      margin: 0 0 var(--space-3) 0;
      color: var(--gray-600);
      font-size: var(--font-size-sm);
    }

    .resend-btn {
      width: 100%;
      padding: var(--space-3);
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-2);
    }

    .success-message {
      color: var(--success-600);
      font-size: var(--font-size-xs);
      margin: var(--space-2) 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-1);
    }
   } else if (data.user) { 
    this.router.navigate(['/home']); 
   } 
  } catch (error: any) { 
   this.loginError = 'An unexpected error occurred. Please try again.'; 
  } finally { 
   this.isLoading = false; 
  } 
 }
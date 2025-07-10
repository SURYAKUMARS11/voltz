async onLogin() { 
  if (!this.validateForm()) return; 

  this.isLoading = true; 

  try { 
   const { data, error } = await this.supabaseService.signIn(this.email, this.password); 
    
   if (error) { 
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
      this.loginError = 'Invalid email or password. Please check your credentials and try again.';
    } else {
      this.loginError = error.message;
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
@@ .. @@
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
-        this.router.navigate(['/home']);
+        // After successful signup, automatically sign in the user
+        const { data: signInData, error: signInError } = await this.supabaseService.signIn(
+          this.email,
+          this.password
+        );
+        
+        if (signInError) {
+          // If auto sign-in fails, redirect to login
+          this.router.navigate(['/login']);
+        } else {
+          this.router.navigate(['/home']);
+        }
      }
    } catch (error: any) {
      this.registerError = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
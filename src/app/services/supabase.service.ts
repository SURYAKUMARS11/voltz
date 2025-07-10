@@ .. @@
   async signOut() {
     const { error } = await this.supabase.auth.signOut();
     return { error };
   }
+
+  async resendSignUpEmail(email: string) {
+    const { data, error } = await this.supabase.auth.resend({
+      type: 'signup',
+      email: email
+    });
+    return { data, error };
+  }
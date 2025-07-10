/*
  # Disable email confirmation requirement

  1. Changes
    - Update auth settings to disable email confirmation
    - Allow users to sign in immediately after signup
*/

-- Update auth configuration to disable email confirmation
UPDATE auth.config 
SET enable_signup = true, 
    enable_confirmations = false 
WHERE id = 1;

-- If the config table doesn't exist or is empty, we'll handle this at the application level
-- by ensuring our auth flow doesn't require email confirmation
/*
  # Fix user creation trigger issue

  1. Drop and recreate the trigger function with better error handling
  2. Ensure the function has proper permissions
  3. Add better error handling for edge cases
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate the function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_referral_code text;
BEGIN
  -- Generate a unique referral code
  LOOP
    new_referral_code := 'VOLT' || LPAD(floor(random() * 10000)::text, 4, '0');
    -- Check if this code already exists
    IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE referral_code = new_referral_code) THEN
      EXIT;
    END IF;
  END LOOP;

  -- Insert into user_profiles with error handling
  INSERT INTO user_profiles (
    id, 
    full_name, 
    referral_code,
    balance,
    vip_level,
    total_earned,
    total_invested
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    new_referral_code,
    0,
    0,
    0,
    0
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating user profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Also update the generate_referral_code function to be more robust
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS text AS $$
DECLARE
  new_code text;
BEGIN
  LOOP
    new_code := 'VOLT' || LPAD(floor(random() * 10000)::text, 4, '0');
    -- Check if this code already exists
    IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE referral_code = new_code) THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
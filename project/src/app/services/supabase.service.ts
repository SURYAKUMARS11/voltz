import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase!: SupabaseClient;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    // Supabase will be initialized via the initialize method
  }

  initialize(url: string, anonKey: string) {
    // Initialize Supabase client with provided credentials
    this.supabase = createClient(url, anonKey);
    
    // Check for existing session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.currentUser$.next(session?.user ?? null);
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser$.next(session?.user ?? null);
    });
  }

  get currentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  // Auth methods
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  // User profile methods
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  }

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId);
    return { data, error };
  }

  // Investment methods
  async getInvestmentPlans() {
    const { data, error } = await this.supabase
      .from('investment_plans')
      .select('*')
      .order('invest_amount');
    return { data, error };
  }

  async createInvestment(investment: any) {
    const { data, error } = await this.supabase
      .from('user_investments')
      .insert(investment);
    return { data, error };
  }

  async getUserInvestments(userId: string) {
    const { data, error } = await this.supabase
      .from('user_investments')
      .select(`
        *,
        investment_plans (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  // Transaction methods
  async createTransaction(transaction: any) {
    const { data, error } = await this.supabase
      .from('transactions')
      .insert(transaction);
    return { data, error };
  }

  async getUserTransactions(userId: string) {
    const { data, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  // Bank account methods
  async getUserBankAccounts(userId: string) {
    const { data, error } = await this.supabase
      .from('bank_accounts')
      .select('*')
      .eq('user_id', userId);
    return { data, error };
  }

  async addBankAccount(bankAccount: any) {
    const { data, error } = await this.supabase
      .from('bank_accounts')
      .insert(bankAccount);
    return { data, error };
  }

  // Referral methods
  async getUserReferrals(userId: string) {
    const { data, error } = await this.supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId);
    return { data, error };
  }

  async createReferral(referral: any) {
    const { data, error } = await this.supabase
      .from('referrals')
      .insert(referral);
    return { data, error };
  }

  // Real-time subscriptions
  subscribeToUserInvestments(userId: string, callback: (payload: any) => void) {
    return this.supabase
      .channel('user_investments')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_investments',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  }

  subscribeToTransactions(userId: string, callback: (payload: any) => void) {
    return this.supabase
      .channel('transactions')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'transactions',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  }
}
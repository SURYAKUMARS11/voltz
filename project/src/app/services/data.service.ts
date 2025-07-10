import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Investment } from '../models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userSubject = new BehaviorSubject<User>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    balance: 15000,
    vipLevel: 0
  });

  public user$ = this.userSubject.asObservable();

  private stableInvestments: Investment[] = [
    {
      id: 1,
      investAmount: 300,
      dailyIncome: 200,
      totalDays: 35,
      totalIncome: 7000,
      type: 'stable'
    },
    {
      id: 2,
      investAmount: 1300,
      dailyIncome: 700,
      totalDays: 35,
      totalIncome: 26989,
      type: 'stable'
    }
  ];

  private dailyInvestments: Investment[] = [
    {
      id: 3,
      investAmount: 300,
      dailyIncome: 400,
      totalDays: 1,
      totalIncome: 400,
      type: 'daily'
    },
    {
      id: 4,
      investAmount: 600,
      dailyIncome: 900,
      totalDays: 1,
      totalIncome: 900,
      type: 'daily'
    }
  ];

  getUser() {
    return this.userSubject.value;
  }

  updateUser(user: User) {
    this.userSubject.next(user);
  }

  getUserVipLevel(): number {
    return this.userSubject.value.vipLevel || 0;
  }

  upgradeVipLevel() {
    const currentUser = this.userSubject.value;
    currentUser.vipLevel = (currentUser.vipLevel || 0) + 1;
    this.userSubject.next(currentUser);
  }

  getStableInvestments() {
    return this.stableInvestments;
  }

  getDailyInvestments() {
    return this.dailyInvestments;
  }

  getInvestmentById(id: number): Investment | null {
    const allInvestments = [...this.stableInvestments, ...this.dailyInvestments];
    return allInvestments.find(inv => inv.id === id) || null;
  }

  processInvestment(investment: Investment, quantity: number) {
    const currentUser = this.userSubject.value;
    const totalAmount = investment.investAmount * quantity;
    
    if (currentUser.balance >= totalAmount) {
      currentUser.balance -= totalAmount;
      
      // Upgrade VIP level if this is the first stable investment
      if (investment.type === 'stable' && investment.investAmount === 300 && currentUser.vipLevel === 0) {
        currentUser.vipLevel = 1;
      }
      
      this.userSubject.next(currentUser);
      console.log('Investment processed successfully');
    }
  }
}
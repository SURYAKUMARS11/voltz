import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InvestComponent } from './components/invest/invest.component';
import { InvestmentDetailComponent } from './components/investment-detail/investment-detail.component';
import { InviteComponent } from './components/invite/invite.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { RechargeComponent } from './components/home/recharge/recharge.component';
import { WithdrawComponent } from './components/home/withdraw/withdraw.component';
import { OrdersComponent } from './components/home/orders/orders.component';
import { BankComponent } from './components/home/bank/bank.component';

export const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'invest', component: InvestComponent },
  { path: 'investment/:id', component: InvestmentDetailComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'bank', component: BankComponent }
];
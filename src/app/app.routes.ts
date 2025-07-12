@@ .. @@
 import { RechargeComponent } from './components/home/recharge/recharge.component';
 import { WithdrawComponent } from './components/home/withdraw/withdraw.component';
 import { OrdersComponent } from './components/home/orders/orders.component';
 import { BankComponent } from './components/home/bank/bank.component';
+import { SecuritySettingsComponent } from './components/settings/security/security-settings.component';
+import { NotificationsSettingsComponent } from './components/settings/notifications/notifications-settings.component';
+import { LanguageSettingsComponent } from './components/settings/language/language-settings.component';
+import { CurrencySettingsComponent } from './components/settings/currency/currency-settings.component';
+import { HelpSettingsComponent } from './components/settings/help/help-settings.component';
+import { SupportSettingsComponent } from './components/settings/support/support-settings.component';
+import { AboutSettingsComponent } from './components/settings/about/about-settings.component';
+import { TermsSettingsComponent } from './components/settings/terms/terms-settings.component';
+import { PrivacySettingsComponent } from './components/settings/privacy/privacy-settings.component';

 export const routes: Routes = [
@@ .. @@
   { path: 'recharge', component: RechargeComponent },
   { path: 'withdraw', component: WithdrawComponent },
   { path: 'orders', component: OrdersComponent },
-  { path: 'bank', component: BankComponent }
+  { path: 'bank', component: BankComponent },
+  { path: 'settings/security', component: SecuritySettingsComponent },
+  { path: 'settings/notifications', component: NotificationsSettingsComponent },
+  { path: 'settings/language', component: LanguageSettingsComponent },
+  { path: 'settings/currency', component: CurrencySettingsComponent },
+  { path: 'settings/help', component: HelpSettingsComponent },
+  { path: 'settings/support', component: SupportSettingsComponent },
+  { path: 'settings/about', component: AboutSettingsComponent },
+  { path: 'settings/terms', component: TermsSettingsComponent },
+  { path: 'settings/privacy', component: PrivacySettingsComponent }
 ];
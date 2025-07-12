import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  isDarkMode = false;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToSecurity() {
    this.router.navigate(['/settings/security']);
  }

  navigateToNotifications() {
    this.router.navigate(['/settings/notifications']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  changeLanguage() {
    this.router.navigate(['/settings/language']);
  }

  changeCurrency() {
    this.router.navigate(['/settings/currency']);
  }

  openHelp() {
    this.router.navigate(['/settings/help']);
  }

  contactSupport() {
    this.router.navigate(['/settings/support']);
  }

  openAbout() {
    this.router.navigate(['/settings/about']);
  }

  openTerms() {
    this.router.navigate(['/settings/terms']);
  }

  openPrivacy() {
    this.router.navigate(['/settings/privacy']);
  }

  logout() {
    this.supabaseService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
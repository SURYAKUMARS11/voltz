import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Globe, Check } from 'lucide-angular';

@Component({
  selector: 'app-language-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Language</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <h3>
            <lucide-icon [img]="GlobeIcon" size="16"></lucide-icon>
            Select Language
          </h3>
          <div class="language-list">
            <div 
              class="language-item" 
              *ngFor="let language of languages"
              (click)="selectLanguage(language)"
              [class.selected]="selectedLanguage === language.code"
            >
              <div class="language-info">
                <div class="language-flag">{{language.flag}}</div>
                <div class="language-details">
                  <div class="language-name">{{language.name}}</div>
                  <div class="language-native">{{language.nativeName}}</div>
                </div>
              </div>
              <div class="language-check" *ngIf="selectedLanguage === language.code">
                <lucide-icon [img]="CheckIcon" size="20"></lucide-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: var(--gray-50);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-5) var(--space-4);
      background: white;
      box-shadow: var(--shadow-sm);
    }

    .back-btn {
      background: var(--gray-100);
      border: none;
      border-radius: var(--radius-full);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--gray-600);
    }

    .back-btn:hover {
      background: var(--gray-200);
      color: var(--gray-800);
    }

    .header h2 {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--gray-800);
    }

    .content {
      padding: var(--space-4);
    }

    .section {
      background: white;
      border-radius: var(--radius-2xl);
      padding: var(--space-6);
      box-shadow: var(--shadow-sm);
    }

    .section h3 {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin: 0 0 var(--space-4) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--gray-800);
    }

    .language-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .language-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 2px solid transparent;
    }

    .language-item:hover {
      background: var(--gray-50);
    }

    .language-item.selected {
      background: var(--primary-50);
      border-color: var(--primary-200);
    }

    .language-info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .language-flag {
      font-size: var(--font-size-2xl);
    }

    .language-details {
      flex: 1;
    }

    .language-name {
      font-weight: 500;
      color: var(--gray-800);
      margin-bottom: var(--space-1);
    }

    .language-native {
      font-size: var(--font-size-sm);
      color: var(--gray-600);
    }

    .language-check {
      color: var(--primary-600);
    }
  `]
})
export class LanguageSettingsComponent {
  selectedLanguage = 'en';
  
  languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
  ];

  readonly ArrowLeftIcon = ArrowLeft;
  readonly GlobeIcon = Globe;
  readonly CheckIcon = Check;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language.code;
    console.log('Language selected:', language);
  }
}
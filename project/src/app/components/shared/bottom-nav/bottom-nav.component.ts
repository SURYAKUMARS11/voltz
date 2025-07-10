import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bottom-nav">
      <div class="nav-item" (click)="navigate('/home')" [class.active]="isActive('/home')">
        <div class="nav-icon">🏠</div>
        <span>Home</span>
      </div>
      <div class="nav-item" (click)="navigate('/invest')" [class.active]="isActive('/invest')">
        <div class="nav-icon">📈</div>
        <span>Invest</span>
      </div>
      <div class="nav-item" (click)="navigate('/invite')" [class.active]="isActive('/invite')">
        <div class="nav-icon">👥</div>
        <span>Invite</span>
      </div>
      <div class="nav-item" (click)="navigate('/setting')" [class.active]="isActive('/setting')">
        <div class="nav-icon">⚙️</div>
        <span>Setting</span>
      </div>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      display: flex;
      justify-content: space-around;
      padding: 8px 0 max(8px, env(safe-area-inset-bottom));
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      border-top: 1px solid #f0f0f0;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 12px;
      min-width: 44px;
      min-height: 44px;
      justify-content: center;
      flex: 1;
      max-width: 80px;
    }

    .nav-item:hover {
      background: #f8f9fa;
    }

    .nav-item.active {
      background: #e3f2fd;
      color: #1976d2;
    }

    .nav-icon {
      font-size: 18px;
      margin-bottom: 4px;
    }

    .nav-item span {
      font-size: 10px;
      font-weight: 500;
      text-align: center;
      line-height: 1.1;
    }

    @media (max-width: 375px) {
      .nav-item {
        padding: 8px 4px;
        min-width: 40px;
      }

      .nav-icon {
        font-size: 16px;
        margin-bottom: 2px;
      }

      .nav-item span {
        font-size: 9px;
      }
    }

    @media (max-width: 320px) {
      .nav-item {
        padding: 6px 2px;
        min-width: 36px;
      }

      .nav-icon {
        font-size: 14px;
      }

      .nav-item span {
        font-size: 8px;
      }
    }
  `]
})
export class BottomNavComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from './app/services/supabase.service';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class App implements OnInit {
  private supabaseService = inject(SupabaseService);

  ngOnInit() {
    // Initialize Supabase with environment variables
    this.supabaseService.initialize(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});
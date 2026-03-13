import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="network-container">
      <div class="green-header-area">
        <header class="app-header">
          <button class="icon-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="header-title">Mon réseau médical</span>
          <div class="header-actions">
            <div class="notification-icon" (click)="goTo('/notifications')" style="cursor:pointer;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span class="badge"></span>
            </div>
            <div class="profile-icon" (click)="goTo('/profile')" style="cursor:pointer;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </header>
      </div>

      <div class="content-body" style="padding: 20px; background: #ffffff; min-height: 100vh; padding-bottom: 100px;">
        
        <h2 style="text-align: center; color: #1e293b; font-size: 20px; font-weight: 800; margin-bottom: 16px;">Mon network</h2>
        
        <div class="grid-container">
          <!-- Network Member 1 -->
          <div class="pro-card" (click)="goTo('/network-profile/1')" style="cursor: pointer; position: relative;">
            <div class="status-dot"></div>
            <div class="icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div class="pro-name">Dr Dawson</div>
            <div class="pro-spec">Dermatologue</div>
          </div>
          
          <!-- Network Member 2 -->
          <div class="pro-card" (click)="goTo('/network-profile/2')" style="cursor: pointer;">
            <div class="icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div class="pro-name">Sophie Martin</div>
            <div class="pro-spec">Allergologue</div>
          </div>
        </div>

        <div style="background: #f8f9fa; border-radius: 24px 24px 0 0; margin: 32px -20px -100px -20px; padding: 32px 20px 100px 20px;">
          <h2 style="text-align: center; color: #1e293b; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 16px;">Recommandations</h2>
          
          <div class="grid-container recommendations">
          
          <div class="pro-card">
            <div class="icon-circle">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="pro-name">Nutritionniste</div>
            <div class="pro-rec">Recommandé par Dr Dawson</div>
          </div>

          <div class="pro-card">
            <div class="icon-circle">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
            </div>
            <div class="pro-name">Psychologue</div>
            <div class="pro-rec">Recommandé par Dr Dawson</div>
          </div>
          
          <div class="pro-card">
            <div class="icon-circle">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
            </div>
            <div class="pro-name">Pharmacien</div>
            <div class="pro-rec">Recommandé par Sophie Martin</div>
          </div>

          <div class="pro-card">
            <div class="icon-circle">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            </div>
            <div class="pro-name">Hypnothérapeute</div>
            <div class="pro-rec">Recommandé par Dr Dawson</div>
          </div>
        
          <div class="pro-card">
            <div class="icon-circle">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div class="pro-name">Immunologue</div>
            <div class="pro-rec">Recommandé par Sophie Martin</div>
          </div>
          <div class="pro-card">
            <div class="icon-circle">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <div class="pro-name">Généraliste</div>
            <div class="pro-rec">Recommandé par Dr Dawson</div>
          </div>
        </div>

        <h2 style="text-align: center; color: #1e293b; font-size: 20px; font-weight: 800; margin-top: 32px; margin-bottom: 16px;">Étendre mon network</h2>
        
        <div class="search-bar" (click)="goTo('/network-map')" style="cursor: text;">
          <input type="text" placeholder="Entrez le nom du professionnel ou lieu" readonly style="pointer-events: none;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>

        </div>

      </div>
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .network-container { font-family: 'Rethink Sans', sans-serif; background: #ffffff; min-height: 100vh; }
    .green-header-area { background: var(--primary-color, #00af6c); color: white; padding-bottom: 20px; border-radius: 0 0 24px 24px; position:relative; z-index:10; }
    .app-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; padding-top: 50px; }
    .icon-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: white; }
    .header-title { font-weight: 700; font-size: 18px; color: white; flex:1; text-align:center; margin: 0 16px; }
    .header-actions { display: flex; gap: 12px; align-items: center; }
    .notification-icon, .profile-icon { position: relative; color: white; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
    .profile-icon { background: white; color: var(--primary-color, #00af6c); border-radius: 50%; padding: 4px; }
    .badge { position: absolute; top: 0px; right: 0px; width: 10px; height: 10px; background: #e74c3c; border-radius: 50%; border: 2px solid var(--primary-color, #00af6c); }
    
    .grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; gap: 16px; }
    .pro-card { background: white; border: 2px solid var(--primary-color, #00af6c); border-radius: 12px; padding: 12px 6px; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .status-dot { position: absolute; top: -6px; left: -6px; width: 16px; height: 16px; background: #ff6b6b; border-radius: 50%; border: 2px solid white; }
    .icon-circle { width: 40px; height: 40px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; }
    .pro-name { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
    .pro-spec { font-size: 12px; color: var(--primary-color, #00af6c); font-weight: 600; }
    
    .recommendations .pro-card { border-color: var(--primary-color, #00af6c); }
    .recommendations .pro-rec { font-size: 11px; color: var(--primary-color, #00af6c); margin-top: 4px; }
    
    .search-bar { display: flex; align-items: center; background: white; padding: 12px 16px; border-radius: 24px; border: 1px solid #d1d5db; }
    .search-bar input { flex: 1; border: none; outline: none; font-size: 14px; background: transparent; }
  `]
})
export class NetworkComponent {
  router = inject(Router);
  location = inject(Location);
  goBack() { this.location.back(); }
  goTo(route: string) { this.router.navigateByUrl(route); }
}

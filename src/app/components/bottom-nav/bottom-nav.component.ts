import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="nav-container">
      <a class="nav-item" routerLink="/monitoring" routerLinkActive="active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        <span>Monitoring</span>
      </a>
      <a class="nav-item" routerLink="/dossier" routerLinkActive="active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span>Dossier</span>
      </a>

      <a class="nav-item center-nav" routerLink="/dashboard" routerLinkActive="active">
        <div class="center-circle">
          <img src="assets/images/icone-manuderma@2x.png" alt="Home" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
      </a>

      <a class="nav-item" routerLink="/network" routerLinkActive="active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span>Network</span>
      </a>
      <a class="nav-item" routerLink="/profile" routerLinkActive="active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>Profil</span>
      </a>
    </div>
  `,
  styles: [`
    .nav-container {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      width: calc(100% - 32px);
      max-width: 400px;
      background: #ffffff;
      border-radius: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      z-index: 1000;
    }

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #9CA3AF;
      text-decoration: none;
      font-size: 10px;
      gap: 4px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      transition: all 0.2s ease;
      
    }

    .nav-item svg {
      stroke: #9CA3AF;
      transition: all 0.2s ease;
      width: 20px;
      height: 20px;
    }

    .nav-item.active {
      color: var(--primary-color, #00af6c);
      font-weight: 700;
    }

    .nav-item.active svg {
      stroke: var(--primary-color, #00af6c);
    }

    .center-nav {
      position: relative;
      top: -28px;
      flex: 1.2;
      display: flex;
      justify-content: center;
      
    }

    .center-circle {
      
      height: 50px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(0,175,108, 0.3);
      padding: 6px;
      border: 3px solid #f9fafb;
    }

    .center-circle img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `]
})
export class BottomNavComponent {}

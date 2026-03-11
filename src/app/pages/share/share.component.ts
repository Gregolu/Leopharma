import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="share-container">
      <header class="app-header">
        <button class="icon-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 class="header-title">Partager mon dossier</h1>
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
      
      <div class="page-content">
        <div class="download-card">
          <div class="download-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="stroke-primary" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <polyline points="9 14 12 17 15 14"></polyline>
            </svg>
          </div>
          <div class="download-info">
            <h2>Télécharger mon fichier</h2>
          </div>
        </div>

        <h3 class="section-title">Rechercher une clinique</h3>
        <div class="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Nom ou code postal">
        </div>

        <h3 class="section-title">Cliniques récentes</h3>
        <div class="clinics-list">
          <div class="clinic-item">
            <div class="clinic-info">
              <h4>Hôpital Saint-Louis</h4>
              <p>Dermatologie</p>
            </div>
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider round"></span>
            </label>
          </div>
          <div class="clinic-item">
            <div class="clinic-info">
              <h4>Clinique des acacias</h4>
              <p>Dermatologie</p>
            </div>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="spacer"></div>
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .share-container {
      background: #F9FAFB;
      min-height: 100vh;
      font-family: 'Rethink Sans', sans-serif;
    }
    
    .app-header {
      background: var(--primary-color, #00af6c);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      padding-top: 50px;
      position: relative;
      z-index: 5;
    }

    .icon-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .header-title {
      font-size: 20px;
      font-weight: 700;
      flex: 1;
      text-align: center;
      color: white;
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .notification-icon {
      position: relative;
    }
    .badge {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 8px;
      height: 8px;
      background: #EF4444;
      border-radius: 50%;
      border: 1px solid var(--primary-color, #00af6c);
    }

    .profile-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      color: var(--primary-color, #00af6c);
      border-radius: 50%;
      width: 28px;
      height: 28px;
      padding: 4px;
    }
    .profile-icon svg {
      width: 100%;
      height: 100%;
    }

    .page-content {
      padding: 24px 20px;
    }
    
    .download-card {
      background: #3eb574; /* Un vert un peu moins flashy */
      color: white;
      border-radius: 20px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      margin-bottom: 32px;
      cursor: pointer;
    }
    .download-icon {
      margin-bottom: 16px;
    }
    .download-icon svg {
      stroke: white;
    }
    .download-info h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: white;
      text-transform: none;
    }

    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #2D3748;
      margin: 24px 0 16px;
    }
    .search-bar {
      display: flex;
      align-items: center;
      background: white;
      padding: 12px 16px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      margin-bottom: 24px;
    }
    .search-bar input {
      border: none;
      outline: none;
      width: 100%;
      margin-left: 12px;
      font-family: inherit;
      font-size: 14px;
      color: #2D3748;
    }
    .search-bar input::placeholder {
      color: #A0AEC0;
    }

    .clinics-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .clinic-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 16px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .clinic-info h4 {
      margin: 0 0 4px 0;
      font-size: 15px;
      font-weight: 700;
      color: #2D3748;
    }
    .clinic-info p {
      margin: 0;
      font-size: 13px;
      color: #718096;
    }

    /* Toggle Switch */
    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #E2E8F0;
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
    }
    input:checked + .slider {
      background-color: var(--primary-color, #00af6c);
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }
    .slider.round {
      border-radius: 24px;
    }
    .slider.round:before {
      border-radius: 50%;
    }

    .spacer {
      height: 90px;
    }
  `]
})
export class ShareComponent {
  router = inject(Router);

  location = inject(Location);

  goBack() {
    this.location.back();
  }
  goTo(path: string) { if(this.router) this.router.navigate([path]); }
}
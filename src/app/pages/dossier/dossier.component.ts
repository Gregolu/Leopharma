import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="dossier-container">
      <div class="green-header-area">
        <header class="app-header">
          <button class="icon-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="header-title">Mon dossier patient</span>
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

        <div class="top-flex">
          <div class="flex-left">
            <h2 class="title-complete">Votre dossier est complet</h2>
            <button class="action-btn-share" (click)="goToShare()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              Télécharger et partager
            </button>
          </div>
          <div class="flex-right">
            <div class="gauge-container">
              <svg width="100" height="100" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"></circle>
                <circle cx="60" cy="60" r="54" fill="none" stroke="white" stroke-width="8" stroke-dasharray="339.29" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 60 60)"></circle>
                <text x="60" y="70" text-anchor="middle" font-size="28" font-weight="800" fill="white">100%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="dossier-body">
        
          <!-- Accordion Header -->
        <div class="category-header" (click)="isAnalyseOpen = !isAnalyseOpen" style="background: #111; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; margin: 0 0 0 0; cursor: pointer; text-transform: uppercase;">
          <h2 style="margin: 0; font-size: 16px; font-weight: 800;">Analyse</h2>
          <svg [style.transform]="isAnalyseOpen ? 'rotate(180deg)' : 'rotate(0deg)'" style="transition:0.3s;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        
        <div class="list-section" *ngIf="isAnalyseOpen" style="padding-top: 16px;">
          
          <div class="list-item" (click)="goTo('/questionnaire-detail/analyse-mains')">
            <div class="item-icon green-dot"></div>
            <div class="item-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </div>
            <div class="item-content">
              <h3>Analyse des mains</h3>
            </div>
            <div class="item-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            
        </div>
      </div>
          
          <div class="list-item" (click)="goTo('/questionnaire-detail/scan-produit')">
            <div class="item-icon green-dot"></div>
            <div class="item-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>
            </div>
            <div class="item-content">
              <h3>Scan du produit</h3>
            </div>
            <div class="item-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>

          <div class="list-item" (click)="goTo('/questionnaire-detail/autres')">
            <div class="item-icon green-dot"></div>
            <div class="item-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div class="item-content">
              <h3>Autres questionnaires</h3>
            </div>
            <div class="item-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="spacer"></div>
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .dossier-container {
      background: #F9FAFB;
      min-height: 100vh;
      font-family: 'Rethink Sans', sans-serif;
    }
    
    .green-header-area {
      background: var(--primary-color, #00af6c);
      padding-bottom: 24px;
      border-radius: 0 0 20px 20px;
    }

    .app-header {
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      padding-top: 50px;
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
    .profile-icon svg { width: 100%; height: 100%; }

    .top-flex {
      display: flex;
      align-items: center;
      padding: 20px;
      margin-top: 10px;
    }

    .flex-left {
      flex: 1;
      padding-right: 16px;
    }

    .title-complete {
      margin: 0 0 16px 0;
      font-size: 22px;
      font-weight: 800;
      color: white;
      line-height: 1.2;
    }

    .action-btn-share {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid white;
      border-radius: 30px;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      width: 100%;
    }

    .flex-right {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .gauge-container {
      position: relative;
    }

    .dossier-body {
      padding: 24px 20px;
      background: transparent;
      margin: 20px;
      border-radius: 16px;
    }

    .list-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .list-item {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      cursor: pointer;
    }

    .item-icon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .green-dot { background-color: var(--primary-color, #00af6c); }

    .item-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }

    .item-content {
      flex: 1;
    }
    .item-content h3 {
      font-size: 15px;
      margin: 0;
      color: #333;
      font-weight: 600;
    }

    .item-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spacer {
      height: 90px;
    }
  `]
})
export class DossierComponent {
  
  isAnalyseOpen = true;

  router = inject(Router);
  location = inject(Location);

  goBack() {
    this.location.back();
  }

  goToShare() {
    this.router.navigate(['/share']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="conf-container">
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

      <div class="conf-content">
        <div class="circle-container">
          <div class="circle">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle-progress"
                stroke-dasharray="100, 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="percentage">100%</div>
          </div>
        </div>

        <h1 class="conf-title" style="color:white;">Félicitations !</h1>
        
        <p class="conf-desc">
          Vous avez complété tous les questionnaires.
        </p>
        <p class="conf-desc-strong">
          <strong>Votre dossier patient<br/>est maintenant complet.</strong>
        </p>

        <div class="actions">
          <button class="primary-btn" (click)="goTo('/dossier')">Partager / Télécharger mon dossier</button>
          <button class="secondary-btn" (click)="goTo('/dashboard')">Voir mon score d'eczéma</button>
        </div>
      </div>
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .conf-container {
      background: var(--primary-color, #00af6c);
      
      min-height: 100vh;
      color: white;
      font-family: 'Rethink Sans', sans-serif;
      display: flex;
      flex-direction: column;
    }

    .app-header {
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

    .conf-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 24px;
      text-align: center;
      margin-top: -100px; /* Bring content up to separate from menu */
    }

    .circle-container {
      margin-bottom: 32px;
    }

    .circle {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }

    .circular-chart {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 250px;
    }

    .circle-bg {
      fill: var(--primary-color, #00af6c);
      stroke: rgba(255,255,255,0.2);
      stroke-width: 2;
    }

    .circle-progress {
      fill: none;
      stroke: #FFE8E8;
      stroke-width: 2;
      stroke-linecap: round;
      animation: progress 1.5s ease-out forwards;
    }
    
    @keyframes progress {
      0% { stroke-dasharray: 0, 100; }
    }

    .percentage {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      font-weight: 800;
      color: white;
    }

    .conf-title {
      font-size: 28px;
      font-weight: 800;
      margin: 0 0 16px 0;
    }

    .conf-desc {
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 10px 0;
      color: rgba(255,255,255,0.9);
    }
    
    .conf-desc-strong {
      font-size: 16px;
      line-height: 1.4;
      margin: 0 0 40px 0;
      color: white;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 320px;
    }

    .primary-btn {
      background: #FFE8E8;
      color: var(--primary-color, #00af6c);
      border: none;
      padding: 16px;
      border-radius: 30px;
      font-weight: 800;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .secondary-btn {
      background: #2D3748;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
    }
  `]
})
export class ConfirmationComponent {
  router = inject(Router);
  location = inject(Location);

  goBack() {
    this.location.back();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}

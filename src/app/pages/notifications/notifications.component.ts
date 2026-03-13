import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    
    <div class="page-container">
      <div class="green-header-area">
        <header class="app-header">
          <button class="back-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <span class="header-title">Notifications</span>
          <div style="width: 24px;"></div>
        </header>

        <div class="header-intro">
          <p>Voici l'historique de vos activités et de vos rappels.</p>
          <button (click)="goToSettings()" style="margin-top:12px; background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer;">Gérer les notifications</button>
        </div>
      </div>

      <div class="content" style="margin-top:-20px; z-index:20; position:relative;">
        <div class="alert-card critical">
          <div class="alert-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L1 21h22M12 6l7.5 13h-15M11 10v4h2v-4M11 16v2h2v-2"></path></svg>
          </div>
          <div class="alert-body">
            <h4>Alerte score d'eczéma</h4>
            <p>Votre score d'eczéma est très élevé. Il est recommandé de consulter rapidement votre médecin.</p>
          </div>
        </div>

        <div class="alert-card info">
          <div class="alert-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="alert-body">
            <h4>Rappel de suivi</h4>
            <p>Il est temps de répondre à votre questionnaire sur l'évolution de vos symptômes.</p>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .page-container { background: #FAFAFA; min-height: 100vh; display: flex; flex-direction: column; font-family: 'Rethink Sans', sans-serif; }
    .green-header-area { background: var(--primary-color, #00af6c); color: white; padding-bottom: 40px; border-radius: 0 0 24px 24px; position: relative; z-index: 10; }
    .app-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; padding-top: 50px; background: transparent; }
    .back-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: white; }
    .header-title { font-weight: 700; font-size: 1.1rem; color: white; flex:1; text-align:center; }
    .header-intro { text-align: center; padding: 0 32px 10px 32px; font-size: 0.95rem; color: rgba(255,255,255,0.9); }
    .content { padding: 0 20px; flex: 1; display: flex; flex-direction: column; gap: 16px; }
    
    .alert-card { display: flex; padding: 16px; border-radius: 16px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.06); gap: 16px; align-items: flex-start; }
    .critical { border-left: 4px solid #e74c3c; }
    .critical .alert-icon { background: #e74c3c; display: flex; }
    
    .info { border-left: 4px solid var(--primary-color, #00af6c); }
    .info .alert-icon { background: var(--primary-color, #00af6c); display: flex; }
    
    .alert-icon { min-width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 0; box-shadow:0 4px 8px rgba(0,0,0,0.1); }
    .alert-icon svg { width: 22px; height: 22px; stroke: white; display: block; margin: auto; }
    .critical .alert-icon svg { stroke: none; }
    
    .alert-body h4 { margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 800; color: #333; }
    .alert-body p { margin: 0; font-size: 0.95rem; color: #666; line-height: 1.4; }
`]
})
export class NotificationsComponent {
  router = inject(Router);

  goToSettings() {
    this.router.navigate(['/profile']);
  }

  location = inject(Location);
  
  goBack() {
    this.location.back();
  }
}

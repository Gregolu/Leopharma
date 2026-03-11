import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="app-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span class="header-title">Notifications</span>
        <div style="width: 24px;"></div>
      </header>

      <div class="content">
        <div class="alert-card critical">
          <div class="alert-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L1 21h22M12 6l7.5 13h-15M11 10v4h2v-4M11 16v2h2v-2"></path></svg>
          </div>
          <div class="alert-body">
            <h4>Alerte score d'eczéma</h4>
            <p>Votre score d'eczéma est très élevé. Il est recommandé de consulter rapidement votre médecin.</p>
          </div>
        </div>

        <div class="alert-card warning">
          <div class="alert-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="alert-body">
            <h4>Questionnaire modifié</h4>
            <p>Votre médecin a modifié un questionnaire en attente. Veuillez le compléter avant votre prochain rendez-vous.</p>
          </div>
        </div>

        <div class="alert-card info">
          <div class="alert-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="alert-body">
            <h4>Rappel de suivi</h4>
            <p>Il est temps de répondre à votre questionnaire sur l'évolution de vos symptômes.</p>
          </div>
        </div>
      </div>

      <div class="bottom-actions">
         <button class="primary-btn">Gérer les notifications</button>
      </div>
    </div>
  `,
  styles: [`
    .page-container { background: #FAFAFA; min-height: 100vh; display: flex; flex-direction: column; font-family: 'Rethink Sans', sans-serif; }
    .app-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #fff; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 10; }
    .back-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: #111; }
    .header-title { font-weight: 700; font-size: 1.1rem; color: #111; }
    .content { padding: 24px 20px; flex: 1; display: flex; flex-direction: column; gap: 16px; }
    
    .alert-card { display: flex; padding: 16px; border-radius: 12px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); gap: 16px; align-items: flex-start; }
    .critical { border-left: 4px solid #F44336; }
    .critical .alert-icon { background: #F44336; display: flex; }
    
    .warning { border-left: 4px solid #FF9800; }
    .warning .alert-icon { background: #FF9800; display: flex; }
    
    .info { border-left: 4px solid #2196F3; }
    .info .alert-icon { background: #2196F3; display: flex; }
    
    .alert-icon { min-width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 4px; }
    .alert-icon svg { width: 20px; height: 20px; stroke: white; display: block; margin: auto; }
    .critical .alert-icon svg { stroke: none; }
    
    .alert-body h4 { margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #111; }
    .alert-body p { margin: 0; font-size: 0.95rem; color: #666; line-height: 1.4; }
    
    .bottom-actions { padding: 24px 20px; display: flex; justify-content: center; margin-top: auto; padding-bottom: 40px; }
    .primary-btn { width: 100%; padding: 16px; background: #111; color: white; border: none; border-radius: 50px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
  `]
})
export class NotificationsComponent {
  location = inject(Location);
  
  goBack() {
    this.location.back();
  }
}

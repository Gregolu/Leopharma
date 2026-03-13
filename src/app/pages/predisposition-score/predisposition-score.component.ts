import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { PatientStateService } from '../../services/patient-state.service';

@Component({
  selector: 'app-predisposition-score',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="score-container">
      <img src="/assets/images/icone-manuderma@2x.png" alt="" class="bg-watermark">
      
      <div class="green-header-area" style="background: var(--primary-color, #00af6c); color: white; padding-top: 50px; padding-bottom: 20px;"><header class="s-header" style="padding: 0 20px;"><button class="s-back-btn" (click)="goBack()" style="color: white;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg></button><span class="s-header-title" style="color: white; font-size: 1.25rem;">Prédisposition Score</span><div style="width: 24px;"></div></header></div>

      <div class="centered-wrapper" style="flex:1; display:flex; flex-direction:column; justify-content:center; padding-bottom:40px;">
      <div class="s-content">
        <div class="status-badge" [ngClass]="severityClass + '-badge'">
           <ng-container [ngSwitch]="severityClass">
             <svg *ngSwitchCase="'green'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
             <svg *ngSwitchCase="'orange'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
             <svg *ngSwitchCase="'red'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
           </ng-container>
           <span>{{ getSeverityLabel() }}</span>
        </div>

        <h2 class="main-msg">{{ getScoreMessage() }}</h2>
        <p class="sub-msg">{{ getSeverityMessage() }}</p>

        <!-- Gauge 3 niveaux -->
        <div class="gauge-wrapper">
          <div class="gauge-bar">
            <div class="segment green"></div>
            <div class="segment orange"></div>
            <div class="segment red"></div>
            <div class="gauge-cursor" [style.left]="scorePercentage + '%'" [style.backgroundColor]="severityColor"></div>
          </div>
          <div class="gauge-labels">
            <span>Faible</span>
            <span>Modérée</span>
            <span>Élevée</span>
          </div>
        </div>

        <div class="recommendation-box">
          <div class="rec-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
          <p>Il est recommandé de surveiller vos symptômes et d'en parler à un professionnel.</p>
        </div>
      </div>

      <div class="s-footer" style="padding: 0 24px; margin-top:20px; display:flex; flex-direction:column; gap:12px; align-items:center;">
        <button routerLink="/auth" class="primary-btn pulse-btn">Compléter mon bilan santé</button>
        <button routerLink="/questionnaire-flash" class="secondary-btn">Refaire le test</button>
      </div>
    </div>
  `,
  styles: [`
    .score-container { display: flex; flex-direction: column; overflow: hidden; position: relative; background-color: var(--white, #FFFFFF); font-family: 'Rethink Sans', sans-serif; min-height: 100vh; padding-top: 0; }
    
    .bg-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 300px; opacity: 0.05; pointer-events: none; z-index: 0; }

    .s-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; position: relative; z-index: 10; }
    .s-back-btn { background: none; border: none; color: var(--primary-color, #00af6c); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; margin-left: -4px;}
    .s-header-title { font-weight: 800; font-size: 18px; color: #111; text-align: center; flex: 1; }

    .s-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 24px; position: relative; z-index: 10; text-align: center; }

    .status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 30px; font-weight: 800; font-size: 16px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .green-badge { background: #E8F8F5; color: #2ECC71; }
    .orange-badge { background: #FEF5E7; color: #F39C12; }
    .red-badge { background: #FDEDEC; color: #E74C3C; }

    .main-msg { font-size: 20px; font-weight: 800; color: #111; margin: 0 0 12px; line-height: 1.3; white-space: pre-line; z-index:10;}
    .sub-msg { font-size: 15px; color: #4B5563; margin: 0 0 40px; line-height: 1.4; font-weight: 500; padding: 0 10px; z-index:10;}

    .gauge-wrapper { width: 100%; margin-bottom: 40px; position: relative; z-index:10;}
    .gauge-bar { display: flex; height: 12px; border-radius: 6px; background: #EAEAEA; position: relative; margin-bottom: 12px; }
    .segment { flex: 1; opacity: 0.8; height: 100%; }
    .segment.green { background: #2ECC71; border-radius: 6px 0 0 6px; }
    .segment.orange { background: #F39C12; }
    .segment.red { background: #E74C3C; border-radius: 0 6px 6px 0; }
    
    .gauge-cursor { 
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 24px; height: 24px; border-radius: 50%; border: 4px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: left 0.5s ease-out, background-color 0.3s;
    }
    
    .gauge-labels { display: flex; justify-content: space-between; font-weight: 700; font-size: 12px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; }

    .recommendation-box { display: flex; align-items: flex-start; gap: 12px; background: rgba(243, 244, 246, 0.9); padding: 16px; border-radius: 16px; color: #374151; font-size: 13px; font-weight: 600; line-height: 1.4; width: 100%; text-align: left; }
    .rec-icon { color: var(--secondary-color-blue, #240bbe); flex-shrink: 0; }

    .s-footer { padding: 20px 24px 30px; display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 10; background: linear-gradient(to top, white 85%, transparent); }
    .primary-btn { width: 100%; background: var(--primary-color, #00af6c); color: white; border: none; padding: 16px; border-radius: 24px; font-family: 'Rethink Sans', sans-serif; font-weight: 800; font-size: 16px; cursor: pointer; }
    .pulse-btn { position: relative; }
    .pulse-btn::after { content: ''; position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; background: rgba(0,175,108,0.3); transform: translate(-50%, -50%) scale(0.9); border-radius: 24px; z-index: -1; animation: pulseObj 2s infinite; }
    @keyframes pulseObj { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0; } }
    .secondary-btn { width: 100%; background: transparent; color: #6B7280; border: 2px solid #E5E7EB; padding: 14px; border-radius: 24px; font-family: 'Rethink Sans', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; background: white;}
  `]
})
export class PredispositionScoreComponent {
  location = inject(Location);
  router = inject(Router);
  patientService = inject(PatientStateService);

  score = 15; 

  constructor() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && typeof nav.extras.state['score'] === 'number') {
      this.score = nav.extras.state['score'];
      this.patientService.updatePredisposition(this.score);
    } else {
      this.score = this.patientService.stateSubject.getValue().predispositionScore;
    }
  }

  // Clamped for layout visually
  get scorePercentage() {
    return Math.min(Math.max(this.score, 3), 97);
  }

  get severityColor() {
     if (this.score <= 33) return '#2ECC71'; 
     if (this.score <= 66) return '#F39C12'; 
     return '#E74C3C'; 
  }

  get severityClass() {
     if (this.score <= 33) return 'green';
     if (this.score <= 66) return 'orange';
     return 'red';
  }

  getSeverityLabel() {
    if (this.score <= 33) return 'Faible';
    if (this.score <= 66) return 'Modérée';
    return 'Élevée';
  }

  getSeverityMessage() {
    if (this.score <= 33) return 'Vos réponses ne suggèrent pas de signes préoccupants pour le moment.';
    if (this.score <= 66) return 'Vos réponses suggèrent certains signes pouvant correspondre à un eczéma des mains.';
    return 'Vos réponses mettent en évidence des symptômes caractéristiques nécessitant un avis médical.';
  }

  getScoreMessage(): string {
    if (this.score <= 33) return 'Votre prédisposition est faible.\nContinuez à prendre soin de vos mains !';
    if (this.score <= 66) return 'Votre prédisposition est modérée.\nSoyez attentif aux premiers signes.';
    return "Votre prédisposition est élevée.\nNous vous conseillons d'utiliser la carte pour trouver un spécialiste.";
  }

  goBack() {
    this.location.back();
  }
}

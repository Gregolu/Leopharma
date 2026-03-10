import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-predisposition-score',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="score-container">
      <header class="q-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h1 class="header-title">Prédisposition d'Eczéma</h1>
      </header>

      <div class="green-score-header">
        <h2>Score de prédisposition</h2>
        <p class="score-message">{{ getScoreMessage() }}</p>
      </div>

      <div class="result-card">
        
        <div class="gauge-container">
          <div class="gauge-bar">
            <div class="gauge-segment green" [class.active-segment]="severityClass === 'green'"></div>
            <div class="gauge-segment orange" [class.active-segment]="severityClass === 'orange'"></div>
            <div class="gauge-segment red" [class.active-segment]="severityClass === 'red'"></div>
            <div class="gauge-cursor" [style.left]="scorePercentage + '%'" [style.background-color]="severityColor"></div>
          </div>
          
          <div class="gauge-labels">
            <span>Faible</span>
            <span>Possible</span>
            <span>Élevée</span>
          </div>
        </div>

        <div class="result-content">
          <div class="status-badge" [ngClass]="severityClass + '-badge'">
            <span class="icon">{{ getSeverityIcon() }}</span> {{ getSeverityLabel() }}
          </div>
          <p class="result-text">
            {{ getSeverityMessage() }}
          </p>
        </div>

      </div>

      <div class="action-section">
        <p class="action-context">Il est recommandé de surveiller vos symptômes et d'en parler à un professionnel au besoin.</p>
        <button routerLink="/auth" class="primary-btn pulse-btn" style="width:100%; border:none; padding:16px; border-radius:24px; font-family:'Gilroy-Bold',sans-serif; font-size:16px; background:#204131; color:white; margin-bottom:10px;">Compléter mon bilan santé</button>
        <button routerLink="/questionnaire-flash" class="secondary-btn">Refaire le questionnaire</button>
      </div>

    </div>
  `,
  styles: [`
    .score-container {
      display: flex;
      flex-direction: column;
      padding: 16px 24px 120px 24px;
      min-height: 100%;
      box-sizing: border-box;
      background-color: var(--white);
      font-family: 'Gilroy-Medium', sans-serif;
    }

    .q-header {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      background: transparent;
    }
    
    .back-btn { 
      background: none; 
      border: none; 
      color: #204131; 
      display: flex; 
      align-items: center; 
      cursor: pointer; 
      padding: 0; 
    }

    .header-title {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 20px;
      color: #204131;
      margin: 0 0 0 16px;
      line-height: 1;
    }

    .green-score-header {
      background-color: #204131;
      color: white;
      padding: 24px 20px;
      margin: 0 -24px 30px -24px;
      text-align: center;
    }
    .green-score-header h2 {
      color: white;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 18px;
      margin: 0 0 8px 0;
    }
    .green-score-header .score-message {
      font-size: 15px;
      color: white;
      opacity: 0.9;
      margin: 0;
      line-height: 1.4;
    }

    .result-card {
      background: #FAFAFA;
      border-radius: 24px;
      padding: 32px 20px;
      border: 1px solid #EAEAEA;
      margin-bottom: 40px;
    }

    .gauge-container {
      margin-bottom: 32px;
      position: relative;
    }

    .gauge-bar {
      display: flex;
      height: 12px;
      border-radius: 6px;
      background: #EAEAEA;
      position: relative;
      margin-bottom: 8px;
    }

    .gauge-segment {
      flex: 1;
      opacity: 0.3;
      transition: all 0.3s ease;
    }

    .gauge-segment.green { background-color: #2ECC71; }
    .gauge-segment.orange { background-color: #F39C12; }
    .gauge-segment.red { background-color: #E74C3C; }

    .gauge-segment:first-child { border-radius: 6px 0 0 6px; }
    .gauge-segment:last-child { border-radius: 0 6px 6px 0; }

    .gauge-segment.active-segment {
      opacity: 1;
    }

    .gauge-cursor {
      position: absolute;
      top: -6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #2ECC71;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transform: translateX(-50%);
      z-index: 10;
      transition: left 0.5s ease, background-color 0.5s ease;
    }

    .gauge-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-family: 'Gilroy-Bold', sans-serif;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .gauge-labels span {
      flex: 1;
      text-align: center;
    }

    .result-content {
      text-align: center;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 30px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      margin-bottom: 16px;
    }
    .green-badge {
      background-color: rgba(46, 204, 113, 0.15);
      color: #27AE60;
    }
    .orange-badge {
      background-color: rgba(243, 156, 18, 0.15);
      color: #D68910;
    }
    .red-badge {
      background-color: rgba(231, 76, 60, 0.15);
      color: #C0392B;
    }

    .result-text {
      color: #3f4756;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
    }

    .action-section {
      text-align: center;
      margin-top: auto;
    }

    .action-context {
      font-size: 13px;
      color: #888;
      margin-bottom: 20px;
    }

    .pulse-btn {
      position: relative;
      overflow: hidden;
    }
    
    .pulse-btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.2);
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(0.95); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }

    .secondary-btn {
      background: transparent;
      color: #999;
      border: 1px solid #EAEAEA;
      cursor: pointer;
      padding: 12px 24px;
      border-radius: 30px;
      margin-top: 10px;
      font-family: 'Gilroy-Medium', sans-serif;
      width: 100%;
    }
    .secondary-btn:hover {
      background: #F9F9F9;
      color: #3f4756;
      border-color: #CCC;
    }
  `]
})
export class PredispositionScoreComponent {
  location = inject(Location);
  router = inject(Router);

  score = 15; // default

  constructor() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && typeof nav.extras.state['score'] === 'number') {
      this.score = nav.extras.state['score'];
    }
  }

  get scorePercentage() {
    return Math.min(Math.max(this.score, 0), 100);
  }

  get severityColor() {
     if (this.score <= 33) return '#2ECC71'; // Green
     if (this.score <= 66) return '#F39C12'; // Orange
     return '#E74C3C'; // Red
  }

  get severityClass() {
     if (this.score <= 33) return 'green';
     if (this.score <= 66) return 'orange';
     return 'red';
  }

  getSeverityIcon() {
    if (this.score <= 33) return '✅';
    if (this.score <= 66) return '⚠️';
    return '🚨';
  }

  getSeverityLabel() {
    if (this.score <= 33) return 'Prédisposition faible';
    if (this.score <= 66) return 'Prédisposition possible';
    return 'Prédisposition élevée';
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

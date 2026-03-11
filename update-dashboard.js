const fs = require('fs');

const tsCode = `import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="dashboard-container">
      <header class="dash-header">
        <img src="assets/images/logo-manuderma@2x.png" alt="ManuDerma" class="logo">
        <div class="user-info">
          <div class="avatar">G</div>
        </div>
      </header>

      <section class="dossier-section">
        <div class="dossier-header">
          <h2 class="dossier-title">Votre dossier<br/>est complété</h2>
          <span class="dossier-percent">100%</span>
        </div>
        <button class="btn-dossier" (click)="goTo('/dossier')">
          Accéder à mon dossier
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </section>

      <h3 class="section-title">Scores actuels</h3>

      <div class="scores-grid">
        <!-- Predisposition Score Card -->
        <div class="score-card predispo-card">
          <h4>Score de prédisposition</h4>
          
          <div class="gauge-wrapper">
            <svg class="gauge-svg" viewBox="0 0 100 60">
              <path class="gauge-bg" d="M 10 50 A 40 40 0 0 1 90 50" />
              <path class="gauge-progress orange" [attr.stroke-dasharray]="gaugeDasharray(60)" d="M 10 50 A 40 40 0 0 1 90 50" />
            </svg>
            <div class="gauge-label">
              <span class="gauge-text" style="color: #F39C12">Modérée</span>
            </div>
          </div>
          <p class="score-desc">Vos réponses suggèrent certains signes de prédisposition.</p>
        </div>

        <!-- Eczema Score Card -->
        <div class="score-card eczema-card">
          <h4>Score d'eczéma</h4>
          <div class="eczema-content">
            <div class="circle-score">
              <span class="circle-val">80</span>
              <span class="circle-max">/100</span>
            </div>
            <div class="eczema-status">
              <span class="status-badge alert">Urgent</span>
              <p>Évolution à surveiller de près.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 class="section-title">Monitoring</h3>
      <div class="monitoring-card">
        <div class="chart-container">
          <div class="bar-col">
            <div class="bar-wrapper"><div class="bar" style="height: 60%"></div></div>
            <span class="day">Lun</span>
          </div>
          <div class="bar-col">
            <div class="bar-wrapper"><div class="bar" style="height: 80%"></div></div>
            <span class="day">Mar</span>
          </div>
          <div class="bar-col">
            <div class="bar-wrapper"><div class="bar" style="height: 40%"></div></div>
            <span class="day">Mer</span>
          </div>
          <div class="bar-col active">
            <div class="bar-wrapper"><div class="bar" style="height: 90%"></div></div>
            <span class="day">Jeu</span>
          </div>
        </div>
      </div>

      <div class="spacer"></div>
    </div>
  \`,
  styles: [\`
    .dashboard-container {
      background: #F9FAFB;
      min-height: 100vh;
      font-family: 'Rethink Sans', sans-serif;
      padding-bottom: 100px;
    }

    .dash-header {
      background: white;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
      border-radius: 0 0 24px 24px;
      margin-bottom: 24px;
    }

    .logo {
      height: 32px;
      object-fit: contain;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background: var(--primary-color, #00af6c);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }

    .dossier-section {
      margin: 0 24px 32px;
      background: linear-gradient(135deg, #00af6c 0%, #008f58 100%);
      border-radius: 20px;
      padding: 24px;
      color: white;
      box-shadow: 0 10px 25px rgba(0,175,108,0.25);
    }

    .dossier-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .dossier-title {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .dossier-percent {
      font-size: 32px;
      font-weight: 900;
      background: rgba(255,255,255,0.2);
      padding: 8px 16px;
      border-radius: 16px;
      backdrop-filter: blur(5px);
    }

    .btn-dossier {
      width: 100%;
      background: white;
      color: #00af6c;
      border: none;
      padding: 14px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn-dossier:active { opacity: 0.8; }

    .section-title {
      margin: 0 24px 16px;
      font-size: 18px;
      font-weight: 800;
      color: #111;
    }

    .scores-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 0 24px 32px;
    }

    .score-card {
      background: white;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    }

    .score-card h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 700;
      color: #374151;
    }

    /* GAUGE */
    .gauge-wrapper {
      position: relative;
      width: 180px;
      margin: 0 auto;
    }
    .gauge-svg {
      width: 100%;
      overflow: visible;
    }
    .gauge-bg {
      fill: none;
      stroke: #E5E7EB;
      stroke-width: 12;
      stroke-linecap: round;
    }
    .gauge-progress {
      fill: none;
      stroke-width: 12;
      stroke-linecap: round;
      transition: stroke-dasharray 1s ease-out;
    }
    .gauge-progress.orange { stroke: #F39C12; }
    
    .gauge-label {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      text-align: center;
    }
    .gauge-text {
      font-size: 20px;
      font-weight: 800;
    }
    .score-desc {
      text-align: center;
      font-size: 13px;
      color: #6B7280;
      margin: 12px 0 0 0;
      line-height: 1.4;
    }

    /* ECZEMA SCORE */
    .eczema-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .circle-score {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #FFF5F5;
      border: 4px solid #EF4444;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .circle-val {
      font-size: 24px;
      font-weight: 900;
      color: #EF4444;
      line-height: 1;
    }
    .circle-max {
      font-size: 12px;
      color: #9CA3AF;
      font-weight: 600;
    }
    .eczema-status {
      flex: 1;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .status-badge.alert {
      background: #FEE2E2;
      color: #DC2626;
    }
    .eczema-status p {
      margin: 0;
      font-size: 14px;
      color: #4B5563;
      line-height: 1.4;
    }

    .monitoring-card {
      margin: 0 24px;
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    }
    .chart-container {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 140px;
    }
    .bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    .bar-wrapper {
      width: 12px;
      height: 100px;
      background: #F3F4F6;
      border-radius: 6px;
      display: flex;
      align-items: flex-end;
    }
    .bar {
      width: 100%;
      background: #D1D5DB;
      border-radius: 6px;
      transition: height 0.3s;
    }
    .bar-col.active .bar {
      background: var(--primary-color, #00af6c);
    }
    .day {
      font-size: 13px;
      color: #9CA3AF;
      font-weight: 600;
    }
    .bar-col.active .day {
      color: #111;
      font-weight: 700;
    }

    .spacer { height: 40px; }
  \`]
})
export class DashboardComponent {
  router = inject(Router);

  gaugeDasharray(percentage: number): string {
    const circumference = 125.6; 
    const dash = (percentage / 100) * circumference;
    return \`\${dash}, 125.6\`;
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
`;

fs.writeFileSync('/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/dashboard/dashboard.component.ts', tsCode, 'utf8');
console.log('Dashboard updated');

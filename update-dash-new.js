const fs = require('fs');

const dashboardCode = `import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: \`
    <div class="dashboard-wrapper">
      <!-- Health overview Header -->
      <header class="header-banner">
        <div class="header-top">
          <div class="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="badge"></span>
          </div>
          <h1 class="header-title">Aperçu général</h1>
          <div class="profile-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        </div>
        <div class="hello-text">
          <h2>Bonjour !</h2>
        </div>
        <div class="heartbeat-line">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,15 20,15 25,5 35,25 45,15 100,15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
          </svg>
        </div>
      </header>

      <div class="dashboard-content">

        <!-- Update File Section -->
        <section class="section-block">
          <h3 class="section-heading">Mettre à jour mon dossier</h3>
          <div class="update-card" (click)="goTo('/questionnaire')">
            <div class="update-info">
              <span class="update-number">5</span>
              <span class="update-desc">Vous avez des questionnaires à compléter.</span>
            </div>
            <div class="update-icon">
              <!-- Check-list icon -->
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div class="notification-dot"></div>
          </div>
          <button class="primary-btn center-btn" (click)="goTo('/dossier')">Historique de mon dossier</button>
        </section>

        <!-- Score Section -->
        <section class="section-block">
          <h3 class="section-heading">Mon score</h3>
          
          <div class="score-slider">
            <div class="slider-track">
              <div class="segment green"></div>
              <div class="segment orange"></div>
              <div class="segment red"></div>
              <div class="slider-thumb" style="left: 75%"></div>
            </div>
            <div class="slider-labels">
              <span class="label green">Faible<br/>prédisposition</span>
              <span class="label orange">Prédisposition<br/>possible</span>
              <span class="label red">Forte<br/>prédisposition</span>
            </div>
          </div>

          <div class="score-details">
            <div class="score-text">
              <p>Consultez un professionnel de santé au plus vite. Votre score indique un risque élevé.</p>
              <p class="strict-monitoring">Un suivi strict est essentiel.</p>
            </div>
            <div class="score-circle">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="circle-progress"
                  stroke-dasharray="80, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="score-value">80</div>
            </div>
          </div>

          <button class="primary-btn center-btn" (click)="goTo('/dossier')">Voir mon dossier</button>
        </section>

        <!-- Monitoring Section -->
        <section class="section-block">
          <h3 class="section-heading">Mon suivi</h3>
          
          <div class="monitoring-card">
            <div class="monitoring-header">
              <h4>Notes comportementales</h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            
            <div class="monitoring-chart-area">
              <div class="y-labels">
                <span>Démangeaisons</span>
                <span>Rougeurs</span>
                <span>Sécheresse</span>
                <span>Sommeil perturbé</span>
              </div>
              <div class="chart-grid">
                <div class="month-col"><span>Mai</span><div class="dot orange" style="top: 25%">2</div><div class="dot orange" style="top: 50%">2</div></div>
                <div class="month-col"><span>Juin</span><div class="dot yellow" style="top: 75%">3</div></div>
                <div class="month-col"><span>Juil</span><div class="dot orange" style="top: 75%">2</div></div>
              </div>
            </div>

            <div class="legend">
              <span class="legend-item"><div class="dot-sm yellow"></div>Alerte mineure</span>
              <span class="legend-item"><div class="dot-sm orange"></div>Alerte moyenne</span>
              <span class="legend-item"><div class="dot-sm red"></div>Alerte majeure</span>
            </div>
          </div>

          <div class="monitoring-card mt-3">
            <div class="monitoring-header">
              <h4>Fréquence (SCORAD)</h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            
            <div class="line-chart-area">
              <svg viewBox="0 0 100 50" class="line-svg">
                <polyline points="0,20 20,20 25,40 40,40 100,40" fill="none" stroke="var(--primary-color)" stroke-width="2" />
                <circle cx="20" cy="20" r="2" fill="var(--primary-color)" />
                <circle cx="25" cy="40" r="2" fill="var(--primary-color)" />
                <circle cx="40" cy="40" r="2" fill="var(--primary-color)" />
              </svg>
            </div>
          </div>
        </section>

      </div>
      
      <app-bottom-nav></app-bottom-nav>
    </div>
  \`,
  styles: [\`
    .dashboard-wrapper {
      background: #FFF5F5;
      min-height: 100vh;
      font-family: 'Rethink Sans', sans-serif;
      padding-bottom: 90px;
    }

    .header-banner {
      background: var(--primary-color, #00af6c);
      padding: 50px 24px 30px;
      color: white;
      border-radius: 0 0 40px 40px;
      position: relative;
      overflow: hidden;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      position: relative;
      z-index: 2;
    }

    .header-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }

    .icon-btn, .profile-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .profile-icon {
      background: white;
      color: var(--primary-color, #00af6c);
      border-radius: 50%;
    }

    .icon-btn {
      position: relative;
    }

    .badge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 10px;
      height: 10px;
      background: #EF4444;
      border-radius: 50%;
      border: 2px solid var(--primary-color, #00af6c);
    }

    .hello-text h2 {
      font-size: 28px;
      font-weight: 800;
      margin: 0;
      position: relative;
      z-index: 2;
    }

    .heartbeat-line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80px;
      z-index: 1;
      opacity: 0.5;
    }
    .heartbeat-line svg {
      width: 100%;
      height: 100%;
    }

    .dashboard-content {
      padding: 24px;
    }

    .section-block {
      margin-bottom: 40px;
    }

    .section-heading {
      text-align: center;
      font-size: 22px;
      font-weight: 800;
      color: #2D3748;
      margin-bottom: 20px;
    }

    /* Update Card */
    .update-card {
      background: #FFF;
      border-radius: 20px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      margin-bottom: 16px;
      position: relative;
      cursor: pointer;
    }
    
    .update-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .update-number {
      font-size: 48px;
      font-weight: 800;
      color: #FF5A5A;
      line-height: 1;
    }

    .update-desc {
      font-size: 14px;
      color: #4A5568;
      max-width: 140px;
      line-height: 1.3;
    }

    .update-icon {
      color: #4A5568;
    }

    .notification-dot {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 12px;
      height: 12px;
      background: #FF5A5A;
      border-radius: 50%;
    }

    .center-btn {
      display: block;
      margin: 0 auto;
      background: var(--primary-color, #00af6c);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,175,108,0.2);
    }

    /* Score Slider */
    .score-slider {
      margin-bottom: 24px;
    }

    .slider-track {
      display: flex;
      height: 12px;
      border-radius: 6px;
      overflow: visible;
      position: relative;
      margin-bottom: 12px;
    }
    .segment {
      flex: 1;
    }
    .segment.green { background: #68D391; border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    .segment.orange { background: #F6AD55; }
    .segment.red { background: #FC8181; border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
    
    .slider-thumb {
      position: absolute;
      top: -4px;
      width: 20px;
      height: 20px;
      background: white;
      border: 3px solid #FC8181;
      border-radius: 50%;
      transform: translateX(-50%);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      text-align: center;
      line-height: 1.2;
      font-weight: 600;
    }
    .label.green { color: #68D391; }
    .label.orange { color: #DD6B20; }
    .label.red { color: #E53E3E; }

    /* Score Details */
    .score-details {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .score-text {
      flex: 1;
      font-size: 13px;
      color: #4A5568;
      line-height: 1.4;
    }
    .strict-monitoring {
      color: var(--primary-color, #00af6c);
      font-weight: 800;
      margin-top: 8px;
    }

    .score-circle {
      position: relative;
      width: 100px;
      height: 100px;
    }

    .circular-chart {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100px;
    }

    .circle-bg {
      fill: none;
      stroke: #E2E8F0;
      stroke-width: 3;
    }

    .circle-progress {
      fill: none;
      stroke: #FF5A5A;
      stroke-width: 3;
      stroke-linecap: round;
    }

    .score-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-weight: 800;
      color: #FF5A5A;
    }

    /* Monitoring */
    .monitoring-card {
      background: white;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .mt-3 { margin-top: 16px; }

    .monitoring-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid #EDF2F7;
      padding-bottom: 12px;
    }
    .monitoring-header h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: #2D3748;
    }

    .monitoring-chart-area {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }
    .y-labels {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 11px;
      color: #718096;
      width: 80px;
      padding-top: 10px;
    }
    .chart-grid {
      flex: 1;
      display: flex;
      justify-content: space-between;
      position: relative;
      border-left: 1px dashed #CBD5E0;
    }
    .month-col {
      flex: 1;
      position: relative;
      height: 120px;
      border-right: 1px dashed #CBD5E0;
    }
    .month-col span {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      color: #718096;
    }

    .dot {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 700;
    }
    .yellow { background: #ECC94B; }
    .orange { background: #ED8936; }
    .red { background: #E53E3E; }
    
    .legend {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #718096;
      margin-top: 24px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .dot-sm {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .line-chart-area {
      height: 100px;
      position: relative;
    }
    .line-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    
  \`]
})
export class DashboardComponent {
  router = inject(Router);

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
\`;

fs.writeFileSync('/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/dashboard/dashboard.component.ts', dashboardCode);
console.log('Dashboard rewritten!');

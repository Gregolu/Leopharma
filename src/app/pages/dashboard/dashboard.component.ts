import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { PatientStateService, PatientState } from '../../services/patient-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="dashboard-wrapper">
      <!-- Health overview Header -->
      <header class="header-banner" style="padding-top: 50px; padding-bottom: 50px;">
        <div class="header-top" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px;">
          <div class="icon-btn" (click)="goTo('/notifications')" style="cursor:pointer; position: relative; color: white;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="badge"></span>
          </div>
          
          <h1 class="header-title" style="margin: 0; font-size: 20px; font-weight: 700; color: white;">Vue générale</h1>
          
          <div class="profile-icon" (click)="goTo('/profile')" style="cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; position: relative;">
          <h2 style="margin: 0; font-size: 28px; font-weight: 700; color: white;">Bonjour !</h2>
          <!-- Removed hardcoded image name to match visuel-main, previously: icone-manuderma@2x.png -->
          <img src="assets/images/hand-dashboard-visual.png" alt="Hand" style="width: 120px; height: auto; object-fit: contain; filter: brightness(0) invert(1); position: absolute; right: -24px; top: 50%; transform: translateY(-50%);" />
        </div>
      </header>

      <div class="dashboard-content" style="position: relative; z-index: 10; margin-top: -30px;">

        <!-- Update File Section -->
        <section class="section-block">
          <div class="update-card" (click)="goTo('/questionnaire')">
            <div class="update-info">
              <span class="update-number" style="font-size: 28px;">
                <ng-container *ngIf="remainingQuestionnaires > 0">{{ remainingQuestionnaires }} </ng-container>
                <span *ngIf="remainingQuestionnaires === 0" style="color: #00af6c; font-size: 24px;">Félicitations !</span>
              </span>
              <span class="update-desc" *ngIf="remainingQuestionnaires > 0">Vous avez des questionnaires à compléter.</span>
              <span class="update-desc" *ngIf="remainingQuestionnaires === 0">Vous avez complété l’ensemble des questionnaires.</span>
            </div>
            <div class="update-icon">
              <!-- Check-list icon -->
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div class="notification-dot" *ngIf="remainingQuestionnaires > 0"></div>
          </div>
          <button class="primary-btn center-btn mt-3" style="background:#111; color:white; border:none; width:100%; border-radius:30px; font-weight:700; padding:16px; margin-top:20px; cursor:pointer;" (click)="goTo('/questionnaire')">Mettre à jour mon dossier</button>
        </section>

        <!-- Score Section -->
        <section class="section-block">
          <h3 class="section-heading" style="position:relative; z-index: 1;"> Prédisposition score <img src="assets/images/icone-manuderma@2x.png" style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); height:80px; opacity:0.07; pointer-events:none; z-index:-1;"></h3>
      
          
          <div class="score-slider">
            <div class="slider-track" style="background: #EAEAEA;"><div class="slider-thumb" [style.left.%]="predispositionScore" style="border: 4px solid;" [style.borderColor]="getScoreColor(predispositionScore)"></div></div>
            <div class="slider-labels">
              <span class="label" style="flex:1; color:#68D391;">Faible<br/>prédisposition</span>
              <span class="label" style="flex:1; color:#DD6B20;">Prédisposition<br/>possible</span>
              <span class="label" style="flex:1; color:#E53E3E;">Forte<br/>prédisposition</span>
            </div>
          </div>

          <div class="score-details">
            <div class="score-text">
              <p>Consultez un professionnel de santé au plus vite. Votre score indique un risque élevé d'eczéma.</p>
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
                  [attr.stroke-dasharray]="predispositionScore + ', 100'"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="score-value">{{ predispositionScore }}</div>
              <div class="thumb-on-circle"></div>
            </div>
          </div>

          <button class="primary-btn center-btn mt-4" style="background:#00af6c; color:white; border:none; width:100%; border-radius:30px; font-weight:700; padding:16px; margin-top:20px; cursor:pointer;" (click)="goTo('/dossier')">Voir mon dossier</button>
        </section>

        <!-- Monitoring Section -->
        <section class="section-block">
          <h3 class="section-heading" style="position:relative; z-index: 1;"> Monitoring <img src="assets/images/icone-manuderma@2x.png" style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); height:80px; opacity:0.07; pointer-events:none; z-index:-1;"></h3>
      
          
                    <div class="monitoring-card" style="margin-top: 20px;">
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

          <div class="monitoring-card mt-3" style="margin-top: 20px; margin-bottom: 20px;">
            <div class="monitoring-header">
              <h4>Fréquence (SCORAD)</h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            
            <div class="line-chart-area">
              <span class="y-axis-label top">45</span>
              <span class="y-axis-label mid">30</span>
              <span class="y-axis-label bot">15</span>
              <div class="chart-grid-lines">
                <div class="grid-line" style="top:0"></div>
                <div class="grid-line" style="top:50%; border-top: 1px dashed #E53E3E"></div>
                <div class="grid-line" style="top:100%"></div>
              </div>
              
              <svg viewBox="0 0 100 50" class="line-svg mt-2" preserveAspectRatio="none" style="overflow: visible;">
                <polyline points="0,20 20,20 25,40 40,40" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2" />
                <circle cx="20" cy="20" r="2" fill="var(--primary-color, #00af6c)" />
                <circle cx="25" cy="40" r="2" fill="var(--primary-color, #00af6c)" />
                <circle cx="40" cy="40" r="2" fill="var(--primary-color, #00af6c)" />
                <circle cx="100" cy="40" r="2" fill="#E53E3E" stroke="white" stroke-width="1" />
              </svg>

              <div class="x-axis-labels">
                <span>01.05.25</span>
                <span>30.06.25</span>
              </div>
            </div>
          </div>
<button class="primary-btn center-btn mt-4" (click)="goTo('/monitoring')">Voir tout mon monitoring</button>

        </section>

                      <section class="section-block mt-4" style="margin-top: 24px; padding: 0 20px;">
          <div class="clinical-studies-home-section" style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 800;">Aider à faire avancer <span style="color:var(--primary-color);">la science</span></h2>
            
            <div style="display:flex; flex-direction:row; gap:1rem; margin-bottom: 1.5rem; align-items:center;">
              <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin: 0; flex: 1;">
                Votre expérience est précieuse. En participant à une étude clinique, vous contribuez à une meilleure compréhension de la maladie de l'eczéma et faites progresser la recherche.
              </p>
              <div style="width:100px; height:100px; border-radius:12px; overflow:hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); flex-shrink: 0;">
                <img src="/assets/images/labo.png" alt="Scientifique" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5e478546f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'" />
              </div>
            </div>

            <div class="studies-list" style="display:flex; flex-direction:column; gap:12px;">
              <!-- Single Study for compact view -->
              <div class="study-card" style="background:#fff; border-radius:16px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <div style="display:flex; align-items:center; gap:12px; flex:1;">
                  <div style="width:10px; height:10px; border-radius:50%; background:#e74c3c;"></div>
                  <div>
                    <h3 style="margin:0; font-size:14px; font-weight:800; color:#333;">Étude clinique</h3>
                    <p style="margin:0; font-size:12px; color:#666; font-weight:500;">Étude Atopia-CARE</p>
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <button style="background:rgba(0,175,108,0.1); color:var(--primary-color, #00af6c); border:none; padding:8px 16px; border-radius:20px; font-weight:700; font-size:13px; cursor:pointer;" (click)="goTo('/clinical-study')">Participer</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
      .section-divider {
        width: 100%;
        margin-top: 8px;
        margin-bottom: 16px;
        display: block;
      }
    
    .dashboard-wrapper {
      background: #F5F7FA;
      min-height: 100vh;
      font-family: 'Rethink Sans', sans-serif;
      padding-bottom: 90px;
    }

    .header-banner {
      background: var(--primary-color, #00af6c);
      padding: 50px 24px 30px;
      color: white;
      border-radius: 0 0 60px 60px;
      position: relative;
      overflow: hidden;
      margin-bottom: 24px;
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
      color: white;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }

    .icon-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      color: white;
    }
    
    .profile-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: white;
      color: var(--primary-color, #00af6c);
      border-radius: 50%;
      padding: 4px;
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
      color: white;
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
      padding: 0 24px 30px;
    }

    .section-block {
      margin-bottom: 40px;
    }

    .section-heading {
      text-align: center;
      font-size: 22px;
      font-weight: 800;
      color: #2D3748;
      margin-bottom: 24px;
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
      position: relative;
      cursor: pointer;
      z-index: 2;
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
      font-weight: 500;
    }

    .update-icon {
      color: #2D3748;
    }

    .notification-dot {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      background: #FF5A5A;
      border-radius: 50%;
      border: 3px solid #FFF5F5;
    }

    .center-btn {
      display: block;
      margin: 0 auto;
      background: var(--primary-color, #00af6c);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,175,108,0.2);
    }
    .mt-3 { margin-top: -10px; position: relative; z-index: 1; padding-top: 24px; }
    .mt-4 { margin-top: 20px; }
    .mt-2 { margin-top: 10px; }

    /* Score Slider */
    .score-slider {
      margin-bottom: 30px;
    }

    .slider-track {
      background: #EAEAEA;
      display: flex;
      height: 12px;
      border-radius: 6px;
      position: relative;
      margin-bottom: 8px;
    }
    .segment {
      flex: 1;
    }
    .segment.green { background: #68D391; border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    .segment.orange { background: #F6AD55; }
    .segment.red { background: #FC8181; border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
    
    .slider-thumb {
      border-color: #E53E3E !important;
      position: absolute;
      top: -6px;
      width: 24px;
      height: 24px;
      background: white;
      border: 4px solid #F6AD55;
      border-radius: 50%;
      transform: translateX(-50%);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      text-align: center;
      line-height: 1.2;
      font-weight: 700;
    }
    .label { flex: 1; }
    .label.green { color: #68D391; }
    .label.orange { color: #DD6B20; }
    .label.red { color: #E53E3E; }

    /* Score Details */
    .score-details {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .score-text {
      flex: 1;
      font-size: 13px;
      color: #4A5568;
      line-height: 1.5;
    }
    .strict-monitoring {
      color: var(--primary-color, #00af6c);
      font-weight: 800;
      margin-top: 12px;
      font-size: 13px;
    }

    .score-circle {
      position: relative;
      width: 110px;
      height: 110px;
    }

    .circular-chart {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 110px;
    }

    .circle-bg {
      fill: none;
      stroke: #FFE8E8;
      stroke-width: 3.5;
    }

    .circle-progress {
      fill: none;
      /* stroke set dynamically */
      stroke-width: 3.5;
      stroke-linecap: round;
      animation: progressDash 1.5s ease-out forwards;
    }

    @keyframes progressDash {
      0% { stroke-dasharray: 0, 100; }
    }

    .score-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 28px;
      font-weight: 800;
      color: #FF5A5A;
    }

    .thumb-on-circle {
      position: absolute;
      top: 25px;
      right: -2px;
      width: 14px;
      height: 14px;
      background: #2D3748;
      border-radius: 50%;
      border: 2px solid white;
    }

    /* Monitoring */
    .monitoring-card {
      background: white;
      border-radius: 16px;
      padding: 20px 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      margin-bottom: 16px;
    }

    .monitoring-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .monitoring-header h4 {
      margin: 0;
      font-size: 15px;
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
      width: 90px;
      padding-top: 10px;
      font-weight: 500;
    }
    .chart-grid {
      flex: 1;
      display: flex;
      justify-content: space-between;
      position: relative;
    }
    .month-col {
      flex: 1;
      position: relative;
      height: 120px;
      border-left: 1px dashed #CBD5E0;
    }
    .month-col span {
      position: absolute;
      bottom: -24px;
      left: 0;
      transform: translateX(-50%);
      font-size: 11px;
      color: #718096;
      font-weight: 600;
    }

    .dot {
      position: absolute;
      left: 0;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 11px;
      font-weight: 800;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 2;
    }
    .yellow { background: #ECC94B; }
    .orange { background: #ED8936; }
    .red { background: #E53E3E; }
    
    .legend {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #718096;
      margin-top: 30px;
      font-weight: 600;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot-sm {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .line-chart-area {
      position: relative;
      height: 120px;
      margin-top: 10px;
    }
    .y-axis-label {
      position: absolute;
      left: 0;
      font-size: 10px;
      color: var(--primary-color, #00af6c);
      font-weight: 700;
    }
    .y-axis-label.top { top: -6px; }
    .y-axis-label.mid { top: 50%; transform: translateY(-50%); }
    .y-axis-label.bot { bottom: -6px; }

    .chart-grid-lines {
      position: absolute;
      top: 0; left: 30px; right: 0; bottom: 0;
    }
    .grid-line {
      position: absolute;
      left: 0; right: 0;
      border-top: 1px solid #E2E8F0;
    }

    .line-svg {
      position: absolute;
      top: 0; left: 30px; right: 0; bottom: 0;
      width: calc(100% - 30px);
      height: 100%;
      overflow: visible;
      z-index: 2;
    }
    
    .x-axis-labels {
      position: absolute;
      bottom: -24px;
      left: 30px;
      right: 0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #718096;
      font-weight: 600;
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  router = inject(Router);
  patientService = inject(PatientStateService);
  
  predispositionScore = 80;
  remainingQuestionnaires = 0;
  eczemaScore = 67;

  getScoreColor(score: number): string {
    if (score < 40) return '#68D391';
    if (score < 70) return '#DD6B20';
    return '#E53E3E';
  }
  sub!: Subscription;

  ngOnInit() {
    this.sub = this.patientService.state$.subscribe(state => {
      this.predispositionScore = state.predispositionScore;
      this.eczemaScore = state.eczemaScore;
      
      const steps = ['photo', 'scan', 'anamnese', 'exposition', 'symptomes', 'impact', 'qvt', 'stigmatisation', 'traitement'];
      let answered = 0;
      steps.forEach(stepId => {
         if (state.questionnaires && state.questionnaires[stepId] && state.questionnaires[stepId].length > 0) {
            answered++;
         }
      });
      this.remainingQuestionnaires = this.patientService.getCompletionStats().remainingQuestionnaires;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}

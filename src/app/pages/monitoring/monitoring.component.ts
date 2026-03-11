import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="monitoring-container">
      <header class="app-header">
        <button class="icon-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span class="header-title">Monitoring</span>
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
              <span class="y-axis-label top">45</span>
              <span class="y-axis-label mid">30</span>
              <span class="y-axis-label bot">15</span>
              <div class="chart-grid-lines">
                <div class="grid-line" style="top:0"></div>
                <div class="grid-line" style="top:50%; border-top: 1px dashed #E53E3E"></div>
                <div class="grid-line" style="top:100%"></div>
              </div>
              
              <svg viewBox="0 0 100 50" class="line-svg mt-2" preserveAspectRatio="none">
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

      </div>
      
      <div class="spacer"></div>
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .monitoring-container {
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
      padding: 32px 20px 24px;
    }

    /* Monitoring Cards from Dashboard */
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
      justify-content: center;
      gap: 12px;
      margin-top: 24px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #4A5568;
      font-weight: 600;
    }
    .dot-sm {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .mt-3 { margin-top: 24px; }
    .mt-2 { margin-top: 10px; }

    /* Line Chart */
    .line-chart-area {
      position: relative;
      padding-left: 20px;
      height: 120px;
      margin-bottom: 24px;
    }
    
    .y-axis-label {
      position: absolute;
      left: 0;
      font-size: 10px;
      color: #A0AEC0;
      font-weight: 600;
      transform: translateY(-50%);
    }
    .y-axis-label.top { top: 0; }
    .y-axis-label.mid { top: 50%; }
    .y-axis-label.bot { top: 100%; }

    .chart-grid-lines {
      position: absolute;
      top: 0; left: 20px; right: 0; bottom: 0;
    }
    .grid-line {
      position: absolute;
      left: 0; right: 0;
      border-top: 1px dashed #E2E8F0;
    }

    .line-svg {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      overflow: visible;
    }

    .x-axis-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      margin-left: 20px;
      font-size: 11px;
      color: #718096;
      font-weight: 600;
    }
    
    .spacer {
      height: 90px;
    }
  `]
})
export class MonitoringComponent {
  router = inject(Router);
  location = inject(Location);

  goBack() {
    this.location.back();
  }
  goTo(path: string) { if(this.router) this.router.navigate([path]); }
}
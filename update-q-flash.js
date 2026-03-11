const fs = require('fs');

const content = `import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-flash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div class="q-wrapper">
      <!-- Header -->
      <header class="q-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <div class="progress-container">
          <div class="progress-bar" [style.width]="(currentStep / 5) * 100 + '%' "></div>
        </div>
        <div class="step-counter">{{ currentStep }}/5</div>
      </header>

      <div class="q-content">
        <!-- STEP 1 -->
        <ng-container *ngIf="currentStep === 1">
          <h2 class="step-title">Lésions sur les mains et poignets uniquement ?</h2>
          <p class="step-subtitle">L’eczéma chronique des mains est spécifique à cette zone.</p>
          
          <div class="cards-row">
            <button class="choice-card" [class.active]="answers[1] === 'Oui'" (click)="answers[1] = 'Oui'">
              <div class="icon-wrap ui-blue">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                </svg>
              </div>
              <span class="choice-text">Oui</span>
            </button>
            
            <button class="choice-card" [class.active]="answers[1] === 'Non'" (click)="answers[1] = 'Non'">
              <div class="icon-wrap ui-dark">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </div>
              <span class="choice-text">Non</span>
            </button>
          </div>
        </ng-container>

        <!-- STEP 2 -->
        <ng-container *ngIf="currentStep === 2">
          <h2 class="step-title">Quels sont vos symptômes durant les crises ?</h2>
          <p class="step-subtitle">Sélectionnez tous ceux qui s'appliquent.</p>
          
          <div class="tags-grid">
            <button class="tag-pill" *ngFor="let sym of symptomsList"
                    [class.active]="answers[2].includes(sym)"
                    (click)="toggleSymptom(sym)">
              <span class="pill-icon" *ngIf="answers[2].includes(sym)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              {{ sym }}
            </button>
          </div>
        </ng-container>

        <!-- STEP 3 -->
        <ng-container *ngIf="currentStep === 3">
          <h2 class="step-title">Depuis combien de temps les lésions sont présentes ?</h2>
          
          <div class="timeline-container">
             <button class="timeline-btn" [class.active]="answers[3] === '< 3 mois'" (click)="answers[3] = '< 3 mois'">
               <div class="tl-circle"></div>
               <span class="tl-text">< 3 mois</span>
             </button>
             <button class="timeline-btn" [class.active]="answers[3] === '3-12 mois'" (click)="answers[3] = '3-12 mois'">
               <div class="tl-circle"></div>
               <span class="tl-text">3 - 12 mois</span>
             </button>
             <button class="timeline-btn" [class.active]="answers[3] === '+ 1 an'" (click)="answers[3] = '+ 1 an'">
               <div class="tl-circle"></div>
               <span class="tl-text">+ 1 an</span>
             </button>
          </div>
        </ng-container>

        <!-- STEP 4 -->
        <ng-container *ngIf="currentStep === 4">
          <h2 class="step-title">Combien de poussées avez-vous eu (12 derniers mois) ?</h2>
          
          <div class="numbers-row">
            <button class="num-card" [class.active]="answers[4] === '0'" (click)="answers[4] = '0'">0</button>
            <button class="num-card" [class.active]="answers[4] === '1'" (click)="answers[4] = '1'">1</button>
            <button class="num-card" [class.active]="answers[4] === '2 ou plus'" (click)="answers[4] = '2 ou plus'">2+</button>
          </div>
        </ng-container>

        <!-- STEP 5 -->
        <ng-container *ngIf="currentStep === 5">
          <h2 class="step-title">Impact sur votre vie quotidienne ?</h2>
          <p class="step-subtitle">Sur une échelle de 1 (Aucun) à 5 (Très fort)</p>

          <div class="jauge-container">
            <div class="jauge-track">
              <div class="jauge-fill" [style.width]="((answers[5] - 1) / 4) * 100 + '%' "></div>
            </div>
            <div class="jauge-points">
              <button class="jauge-pt" *ngFor="let pt of [1,2,3,4,5]"
                      [class.active]="answers[5] === pt"
                      [class.filled]="answers[5] >= pt"
                      (click)="answers[5] = pt">
                <span class="pt-lbl" *ngIf="answers[5] === pt">{{ pt }}</span>
              </button>
            </div>
          </div>
          
          <div class="jauge-labels">
            <span>Aucun</span>
            <span>Modéré</span>
            <span>Très fort</span>
          </div>
        </ng-container>
      </div>

      <div class="q-footer">
        <button class="btn-prev" (click)="prevStep()" *ngIf="currentStep > 1">Retour</button>
        <button class="btn-next" (click)="nextStep()" *ngIf="currentStep < 5" [disabled]="!isStepValid()">Continuer</button>
        <button class="btn-next validate" (click)="calculateScore()" *ngIf="currentStep === 5" [disabled]="!isStepValid()">Confirmer</button>
      </div>
    </div>
  \`,
  styles: [\`
    .q-wrapper {
      background: #FFFFFF;
      height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: 'Rethink Sans', sans-serif;
      overflow: hidden; /* No scroll! */
    }
    
    .q-header {
      display: flex;
      align-items: center;
      padding: 24px 20px;
      gap: 20px;
    }
    
    .back-btn {
      background: none; border: none;
      color: var(--primary-color, #00af6c);
      padding: 8px; margin-left: -8px;
      cursor: pointer;
    }

    .progress-container {
      flex: 1;
      height: 8px;
      background: #F3F4F6;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-bar {
      height: 100%;
      background: var(--primary-color, #00af6c);
      transition: width 0.4s ease;
      border-radius: 4px;
    }

    .step-counter {
      font-size: 15px;
      color: #6B7280;
      font-weight: 700;
    }

    .q-content {
      flex: 1;
      padding: 10px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center; /* Center content vertically */
    }

    .step-title {
      font-size: 26px;
      font-weight: 800;
      color: #000000;
      margin: 0 0 12px 0;
      line-height: 1.25;
      text-align: center;
    }
    .step-subtitle {
      font-size: 16px;
      color: #6B7280;
      margin: 0 0 40px 0;
      text-align: center;
      font-weight: 500;
    }

    /* STEP 1: Choice Cards */
    .cards-row {
      display: flex;
      gap: 20px;
    }
    .choice-card {
      flex: 1;
      background: #FAFAFA;
      border: 3px solid transparent;
      border-radius: 24px;
      padding: 40px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .choice-card.active {
      background: rgba(0, 175, 108, 0.05); /* very light primary */
      border-color: var(--primary-color, #00af6c);
      transform: translateY(-4px);
    }
    .icon-wrap {
      width: 72px; height: 72px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white;
      transition: all 0.3s;
    }
    .ui-blue { background: var(--secondary-color-blue, #240bbe); }
    .ui-dark { background: #000000; }
    
    .choice-card.active .ui-blue, .choice-card.active .ui-dark {
      background: var(--primary-color, #00af6c);
    }
    .choice-text {
      font-size: 20px;
      font-weight: 800;
      color: #111827;
      font-family: 'Rethink Sans', sans-serif;
    }

    /* STEP 2: Tags Grid */
    .tags-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }
    .tag-pill {
      background: #FAFAFA;
      border: 2px solid #E5E7EB;
      padding: 14px 20px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 600;
      color: #4B5563;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Rethink Sans', sans-serif;
      display: flex; align-items: center; gap: 8px;
    }
    .tag-pill.active {
      background: var(--primary-color, #00af6c);
      color: white;
      border-color: var(--primary-color, #00af6c);
      box-shadow: 0 4px 12px rgba(0,175,108,0.25);
    }
    .pill-icon { display: flex; align-items: center; }

    /* STEP 3: Timeline */
    .timeline-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0 10px;
    }
    .timeline-btn {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #FAFAFA;
      border: 3px solid transparent;
      padding: 24px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .timeline-btn.active {
      background: rgba(0, 175, 108, 0.05);
      border-color: var(--primary-color, #00af6c);
    }
    .tl-circle {
      width: 28px; height: 28px;
      border-radius: 50%;
      border: 3px solid #D1D5DB;
      background: white;
      transition: all 0.3s;
    }
    .timeline-btn.active .tl-circle {
      border-color: var(--primary-color, #00af6c);
      border-width: 8px;
      transform: scale(1.1);
    }
    .tl-text {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      font-family: 'Rethink Sans', sans-serif;
    }
    .timeline-btn.active .tl-text {
      color: var(--primary-color, #00af6c);
    }

    /* STEP 4: Numbers row */
    .numbers-row {
      display: flex;
      gap: 20px;
      padding: 0 10px;
    }
    .num-card {
      flex: 1;
      aspect-ratio: 1;
      border-radius: 24px;
      background: #FAFAFA;
      border: 3px solid transparent;
      font-size: 36px;
      font-weight: 800;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'Rethink Sans', sans-serif;
    }
    .num-card.active {
      background: var(--primary-color, #00af6c);
      color: white;
      border-color: var(--primary-color, #00af6c);
      box-shadow: 0 8px 24px rgba(0,175,108,0.3);
      transform: scale(1.05);
    }

    /* STEP 5: Jauge (Gauge) */
    .jauge-container {
      position: relative;
      padding: 50px 0;
      margin: 40px 10px 20px 10px;
    }
    .jauge-track {
      position: absolute;
      top: 50%;
      left: 14px;
      right: 14px;
      height: 12px;
      background: #E5E7EB;
      border-radius: 6px;
      transform: translateY(-50%);
    }
    .jauge-fill {
      height: 100%;
      background: var(--primary-color, #00af6c);
      border-radius: 6px;
      transition: width 0.4s ease;
    }
    .jauge-points {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .jauge-pt {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #E5E7EB;
      border: 5px solid white;
      padding: 0;
      cursor: pointer;
      position: relative;
      transition: all 0.3s;
    }
    .jauge-pt.filled {
      background: var(--primary-color, #00af6c);
    }
    .jauge-pt.active {
      transform: scale(1.6);
      background: var(--primary-color, #00af6c);
      border-color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .pt-lbl {
      position: absolute;
      bottom: -36px;
      left: 50%;
      transform: translateX(-50%) scale(0.625);
      font-weight: 800;
      font-size: 20px;
      color: var(--primary-color, #00af6c);
    }
    .jauge-labels {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      font-weight: 700;
      font-size: 15px;
      color: #9CA3AF;
    }

    /* Footer Navigation */
    .q-footer {
      display: flex;
      gap: 16px;
      padding: 24px;
      background: white;
    }
    .btn-prev {
      background: #F3F4F6;
      color: #4B5563;
      border: none;
      padding: 18px 28px;
      border-radius: 30px;
      font-weight: 800;
      font-size: 16px;
      font-family: 'Rethink Sans', sans-serif;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .btn-prev:active { opacity: 0.7; }
    
    .btn-next {
      flex: 1;
      background: #000000;
      color: white;
      border: none;
      padding: 18px;
      border-radius: 30px;
      font-weight: 800;
      font-size: 16px;
      font-family: 'Rethink Sans', sans-serif;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btn-next.validate {
      background: var(--primary-color, #00af6c);
      box-shadow: 0 4px 16px rgba(0,175,108,0.4);
    }
    .btn-next:disabled {
      background: #E5E7EB;
      color: #9CA3AF;
      box-shadow: none;
      cursor: not-allowed;
    }
    .btn-next:not(:disabled):active {
      transform: scale(0.97);
    }
  \`]
})
export class QuestionnaireFlashComponent {
  router = inject(Router);
  
  currentStep = 1;

  symptomsList = [
    'Rougeurs', 'Fissures', 'Gonflement', 
    'Épaississement', 'Sécheresse', 'Peau qui pèle', 
    'Démangeaisons', 'Douleurs', 'Brûlures'
  ];

  answers: Record<number, any> = { 1: null, 2: [], 3: null, 4: null, 5: 3 };

  goBack() { 
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/home']); 
    }
  }

  nextStep() {
    if (this.currentStep < 5 && this.isStepValid()) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(): boolean {
    if (this.currentStep === 1) return this.answers[1] !== null;
    if (this.currentStep === 2) return this.answers[2].length > 0;
    if (this.currentStep === 3) return this.answers[3] !== null;
    if (this.currentStep === 4) return this.answers[4] !== null;
    if (this.currentStep === 5) return this.answers[5] !== null;
    return false;
  }

  toggleSymptom(sym: string) {
    const list = this.answers[2];
    const idx = list.indexOf(sym);
    if (idx > -1) list.splice(idx, 1);
    else list.push(sym);
  }

  calculateScore() {
    let score = 0;
    if (this.answers[1] === 'Oui') score += 20;
    if (this.answers[2] && this.answers[2].length > 0) score += (this.answers[2].length * 5);
    if (this.answers[3] === '3-12 mois') score += 10;
    if (this.answers[3] === '+ 1 an') score += 20;
    if (this.answers[4] === '1') score += 10;
    if (this.answers[4] === '2 ou plus') score += 20;
    
    // Scale 1 to 5 mapping
    if (this.answers[5] === 3) score += 10;
    if (this.answers[5] >= 4) score += 20;
    
    score = Math.min(score, 100);
    this.router.navigate(['/predisposition-score'], { state: { score: score } });
  }
}
`;

fs.writeFileSync('/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/questionnaire-flash/questionnaire-flash.component.ts', content);

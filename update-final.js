const fs = require('fs');

const pathFlash = '/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/questionnaire-flash/questionnaire-flash.component.ts';
const pathScore = '/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/predisposition-score/predisposition-score.component.ts';

const flashCode = `import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-flash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div class="q-wrapper">
      <header class="q-header black-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <div class="header-title">Questionnaire Flash</div>
        <div style="width:24px"></div> <!-- Placeholder for centering -->
      </header>

      <div class="q-content">
        
        <div class="question-block">
          <h2 class="step-title">Lésions sur les mains et poignets uniquement ?</h2>
          <p class="step-subtitle">L’eczéma chronique des mains est spécifique à cette zone.</p>
          
          <div class="cards-row">
            <button class="choice-card" [class.active]="answers[1] === 'Oui'" (click)="answers[1] = 'Oui'">
              <div class="icon-wrap ui-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>
              </div>
              <span class="choice-text">Oui</span>
            </button>
            <button class="choice-card" [class.active]="answers[1] === 'Non'" (click)="answers[1] = 'Non'">
              <div class="icon-wrap ui-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
              </div>
              <span class="choice-text">Non</span>
            </button>
          </div>
        </div>

        <hr class="divider" />

        <div class="question-block">
          <h2 class="step-title">Quels sont vos symptômes durant les crises ?</h2>
          <p class="step-subtitle">Sélectionnez tous ceux qui s'appliquent.</p>
          <div class="tags-grid">
            <button class="tag-pill" *ngFor="let sym of symptomsList"
                    [class.active]="answers[2].includes(sym)"
                    (click)="toggleSymptom(sym)">
              <span class="pill-icon" *ngIf="answers[2].includes(sym)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              {{ sym }}
            </button>
          </div>
        </div>

        <hr class="divider" />

        <div class="question-block">
          <h2 class="step-title">Depuis combien de temps les lésions sont présentes ?</h2>
          <div class="timeline-container">
             <button class="timeline-btn" [class.active]="answers[3] === '< 3 mois'" (click)="answers[3] = '< 3 mois'">
                <div class="tl-circle"></div><span class="tl-text">< 3 mois</span>
             </button>
             <button class="timeline-btn" [class.active]="answers[3] === '3-12 mois'" (click)="answers[3] = '3-12 mois'">
                <div class="tl-circle"></div><span class="tl-text">3 - 12 mois</span>
             </button>
             <button class="timeline-btn" [class.active]="answers[3] === '+ 1 an'" (click)="answers[3] = '+ 1 an'">
                <div class="tl-circle"></div><span class="tl-text">+ 1 an</span>
             </button>
          </div>
        </div>

        <hr class="divider" />

        <div class="question-block">
          <h2 class="step-title">Combien de poussées avez-vous eu (12 derniers mois) ?</h2>
          <div class="numbers-row">
            <button class="num-card" [class.active]="answers[4] === '0'" (click)="answers[4] = '0'">0</button>
            <button class="num-card" [class.active]="answers[4] === '1'" (click)="answers[4] = '1'">1</button>
            <button class="num-card" [class.active]="answers[4] === '2 ou plus'" (click)="answers[4] = '2 ou plus'">2+</button>
          </div>
        </div>

        <hr class="divider" />

        <div class="question-block">
          <h2 class="step-title">Impact sur votre vie quotidienne ?</h2>
          <p class="step-subtitle">Sur une échelle de 1 (Aucun) à 5 (Très fort)</p>
          <div class="jauge-container">
            <div class="jauge-track"><div class="jauge-fill" [style.width]="((answers[5] - 1) / 4) * 100 + '%'"></div></div>
            <div class="jauge-points">
              <button class="jauge-pt" *ngFor="let pt of [1,2,3,4,5]" [class.active]="answers[5] === pt" [class.filled]="answers[5] >= pt" (click)="answers[5] = pt">
                <span class="pt-lbl" *ngIf="answers[5] === pt">{{ pt }}</span>
              </button>
            </div>
          </div>
          <div class="jauge-labels"><span>Aucun</span><span>Modéré</span><span>Très fort</span></div>
        </div>

      </div>

      <div class="q-footer">
        <button class="btn-next validate" (click)="calculateScore()" [disabled]="!isFormValid()">Confirmer mes réponses</button>
      </div>
    </div>
  \`,
  styles: [\`
    .q-wrapper { background: #FFFFFF; height: 100vh; display: flex; flex-direction: column; font-family: 'Rethink Sans', sans-serif; overflow: hidden; }
    
    .q-header.black-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #000000; color: #FFFFFF; z-index: 10; }
    .header-title { font-weight: 800; font-size: 16px; text-align: center; }
    .back-btn { background: none; border: none; color: #FFFFFF; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; margin-left: -4px;}
    
    .divider { border: 0; height: 1px; background: #F3F4F6; margin: 12px 0 16px; }

    .q-content { flex: 1; padding: 20px 20px 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
    .question-block { display: flex; flex-direction: column; }
    
    .step-title { font-size: 16px; font-weight: 800; color: #111; margin: 0 0 4px 0; line-height: 1.3;}
    .step-subtitle { font-size: 13px; color: #6B7280; margin: 0 0 12px 0; font-weight: 500;}
    
    .cards-row { display: flex; gap: 12px; flex-direction: row; }
    .choice-card { flex: 1; background: #FAFAFA; border: 2px solid transparent; border-radius: 12px; padding: 12px; display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: 0.2s;}
    .choice-card.active { border-color: var(--primary-color, #00af6c); background: rgba(0,175,108,0.05); }
    .icon-wrap { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; transition: 0.2s; flex-shrink: 0; }
    .ui-blue { background: var(--secondary-color-blue, #240bbe); }
    .ui-dark { background: #000; }
    .choice-card.active .ui-blue, .choice-card.active .ui-dark { background: var(--primary-color, #00af6c); }
    .choice-text { font-size: 15px; font-weight: 800; font-family: 'Rethink Sans', sans-serif;}
    
    .tags-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start; }
    .tag-pill { background: #FAFAFA; border: 1px solid #E5E7EB; padding: 8px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; font-family: 'Rethink Sans', sans-serif; display: flex; align-items: center; color: #4B5563;}
    .tag-pill.active { background: var(--primary-color, #00af6c); border-color: var(--primary-color, #00af6c); color: white; }
    .pill-icon { margin-right: 6px; display: flex; }
    
    .timeline-container { display: flex; flex-direction: row; gap: 8px; }
    .timeline-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; background: #FAFAFA; border: 2px solid transparent; padding: 12px 8px; border-radius: 12px; cursor: pointer; transition: 0.2s; text-align: center;}
    .timeline-btn.active { border-color: var(--primary-color, #00af6c); background: rgba(0,175,108,0.05); }
    .tl-circle { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #D1D5DB; background: white; transition: 0.2s; }
    .timeline-btn.active .tl-circle { border-color: var(--primary-color, #00af6c); border-width: 5px; }
    .tl-text { font-size: 13px; font-weight: 700; font-family: 'Rethink Sans', sans-serif;}
    
    .numbers-row { display: flex; gap: 12px; flex-direction: row;}
    .num-card { flex: 1; height: 48px; background: #FAFAFA; border: 2px solid transparent; border-radius: 12px; font-size: 20px; font-weight: 800; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; font-family: 'Rethink Sans', sans-serif;}
    .num-card.active { border-color: var(--primary-color, #00af6c); background: var(--primary-color, #00af6c); color: white; }
    
    .jauge-container { position: relative; padding: 25px 0 10px; margin: 0 10px; }
    .jauge-track { position: absolute; top: 50%; left: 0; right: 0; height: 6px; background: #E5E7EB; border-radius: 3px; transform: translateY(-50%); }
    .jauge-fill { height: 100%; background: var(--primary-color, #00af6c); border-radius: 3px; transition: 0.3s; }
    .jauge-points { position: relative; display: flex; justify-content: space-between; align-items: center; }
    .jauge-pt { width: 20px; height: 20px; border-radius: 50%; background: #E5E7EB; border: 3px solid white; cursor: pointer; position: relative; transition: 0.3s; padding:0;}
    .jauge-pt.filled { background: var(--primary-color, #00af6c); }
    .jauge-pt.active { transform: scale(1.4); background: var(--primary-color, #00af6c); border-color: white; }
    .pt-lbl { position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%) scale(0.8); font-weight: 800; font-size: 14px; color: var(--primary-color, #00af6c); }
    .jauge-labels { display: flex; justify-content: space-between; font-weight: 600; font-size: 12px; color: #9CA3AF; margin-top: 8px;}
    
    .q-footer { padding: 16px 20px 24px; background: white; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); z-index: 10; }
    .btn-next { width: 100%; background: var(--primary-color, #00af6c); color: white; border: none; padding: 16px; border-radius: 24px; font-weight: 800; font-size: 16px; font-family: 'Rethink Sans', sans-serif; cursor: pointer; transition: 0.2s;}
    .btn-next:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; }
  \`]
})
export class QuestionnaireFlashComponent {
  router = inject(Router);

  symptomsList = ['Rougeurs', 'Fissures', 'Gonflement', 'Épaississement', 'Sécheresse', 'Peau qui pèle', 'Démangeaisons', 'Douleurs', 'Brûlures'];
  answers: Record<number, any> = { 1: null, 2: [], 3: null, 4: null, 5: 3 };

  goBack() { this.router.navigate(['/home']); }

  isFormValid(): boolean {
    return this.answers[1] !== null && this.answers[2].length > 0 && this.answers[3] !== null && this.answers[4] !== null && this.answers[5] !== null;
  }

  toggleSymptom(sym: string) {
    const idx = this.answers[2].indexOf(sym);
    if (idx > -1) this.answers[2].splice(idx, 1);
    else this.answers[2].push(sym);
  }

  calculateScore() {
    let score = 0;
    if (this.answers[1] === 'Oui') score += 20;
    if (this.answers[2].length > 0) score += (this.answers[2].length * 5);
    if (this.answers[3] === '3-12 mois') score += 10;
    if (this.answers[3] === '+ 1 an') score += 20;
    if (this.answers[4] === '1') score += 10;
    if (this.answers[4] === '2 ou plus') score += 20;
    if (this.answers[5] === 3) score += 10;
    if (this.answers[5] >= 4) score += 20;
    score = Math.min(score, 100);
    this.router.navigate(['/predisposition-score'], { state: { score } });
  }
}
`;

const scoreCode = `import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-predisposition-score',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: \`
    <div class="score-container">
      <img src="/assets/images/icone-manuderma@2x.png" alt="" class="bg-watermark">
      
      <header class="s-header">
        <button class="s-back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <span class="s-header-title">Prédisposition Score</span>
        <div style="width: 24px;"></div>
      </header>

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

      <div class="s-footer">
        <button routerLink="/auth" class="primary-btn pulse-btn">Compléter mon bilan santé</button>
        <button routerLink="/questionnaire-flash" class="secondary-btn">Refaire le test</button>
      </div>
    </div>
  \`,
  styles: [\`
    .score-container { display: flex; flex-direction: column; height: 100vh; overflow: hidden; position: relative; background-color: var(--white, #FFFFFF); font-family: 'Rethink Sans', sans-serif; }
    
    .bg-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 300px; opacity: 0.05; pointer-events: none; z-index: 0; }

    .s-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; position: relative; z-index: 10; }
    .s-back-btn { background: none; border: none; color: var(--primary-color, #00af6c); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; margin-left: -4px;}
    .s-header-title { font-weight: 800; font-size: 18px; color: #000; text-align: center; flex: 1; }

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
  \`]
})
export class PredispositionScoreComponent {
  location = inject(Location);
  router = inject(Router);

  score = 15; 

  constructor() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && typeof nav.extras.state['score'] === 'number') {
      this.score = nav.extras.state['score'];
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
    if (this.score <= 33) return 'Votre prédisposition est faible.\\nContinuez à prendre soin de vos mains !';
    if (this.score <= 66) return 'Votre prédisposition est modérée.\\nSoyez attentif aux premiers signes.';
    return "Votre prédisposition est élevée.\\nNous vous conseillons d'utiliser la carte pour trouver un spécialiste.";
  }

  goBack() {
    this.location.back();
  }
}
`;

fs.writeFileSync(pathFlash, flashCode);
fs.writeFileSync(pathScore, scoreCode);
console.log('Final polish done.');

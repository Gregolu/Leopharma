import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-flash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="q-wrapper">
      <div class="green-header-area">
        <header class="app-header">
          <button class="back-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div class="header-title">Questionnaire Flash</div>
          <div style="width:24px"></div>
        </header>

        <div class="intro-section" style="background:transparent; padding: 0px 20px 20px 20px; text-align: center;">
          <h1 class="intro-title" style="color:white;">Mes mains sont-elles à risque ?</h1>
          <p class="intro-text" style="color:white;">L’eczéma chronique des mains touche environ 4,9 % de la population adulte en France.</p>
        </div>
      </div>

      <div class="q-content" style="margin-top: 0px; position:relative; z-index:20; background: white;">

        <div class="question-block">
          <h2 class="step-title">1. Lésions sur les mains et poignets uniquement ?</h2>
          <div class="cards-row">
            <button class="choice-card" [class.active]="answers[1] === 'Oui'" (click)="answers[1] = 'Oui'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span class="choice-text">Oui</span>
            </button>
            <button class="choice-card" [class.active]="answers[1] === 'Non'" (click)="answers[1] = 'Non'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-icon"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <span class="choice-text">Non</span>
            </button>
          </div>
        </div>

        <div class="question-block">
          <h2 class="step-title">2. Quels sont vos symptômes durant les crises ?</h2>
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

        <div class="question-block">
          <h2 class="step-title">3. Depuis combien de temps les lésions sont présentes ?</h2>
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

        <div class="question-block">
          <h2 class="step-title">4. Combien de poussées avez-vous eu (12 derniers mois) ?</h2>
          <div class="numbers-row">
            <button class="num-card" [class.active]="answers[4] === '0'" (click)="answers[4] = '0'">0</button>
            <button class="num-card" [class.active]="answers[4] === '1'" (click)="answers[4] = '1'">1</button>
            <button class="num-card" [class.active]="answers[4] === '2 ou plus'" (click)="answers[4] = '2 ou plus'">2+</button>
          </div>
        </div>

        <div class="question-block">
          <h2 class="step-title">5. Impact sur votre vie quotidienne ?</h2>
          <p class="step-subtitle">Sur une échelle de 1 (Aucun) à 5 (Très fort)</p>
          <div class="jauge-container">
            <div class="jauge-track"><div class="jauge-fill" [style.width]="((answers[5] - 1) / 4) * 100 + '%' "></div></div>
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
  `,
  styles: [`

    .green-header-area { background: var(--primary-color, #00af6c); color: white; padding-bottom: 20px; border-radius: 0 0 24px 24px; position: relative; z-index: 10; }
    .app-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; padding-top: 50px; background: transparent; }
    .header-title { font-weight: 700; font-size: 1.1rem; color: white; flex:1; text-align:center; }
    .back-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: white; margin-left: -4px;}

    .q-wrapper { background: #FFFFFF;  display: flex; flex-direction: column; font-family: 'Rethink Sans', sans-serif; overflow: hidden; }
    
    
    
    
    
    .q-content { flex: 1; padding: 16px 20px 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
    
    
    .intro-title { font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px; line-height: 1.2; text-align: center; }
    .intro-text { font-size: 14px; color: #F3F4F6; margin: 0; line-height: 1.4; font-weight: 500; text-align: center;}

    .question-block { display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; }
    
    .step-title { font-size: 15px; font-weight: 800; color: #111; margin: 0; line-height: 1.3;}
    .step-subtitle { font-size: 12px; color: #6B7280; margin: 0; font-weight: 500;}
    
    .cards-row { display: flex; gap: 8px; flex-direction: row; }
    .choice-card { flex: 1; background: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;}
    .choice-card.active { border-color: var(--primary-color, #00af6c); background: rgba(0,175,108,0.08); color: var(--primary-color, #00af6c); }
    .choice-text { font-size: 14px; font-weight: 800; font-family: 'Rethink Sans', sans-serif;}
    
    .tags-grid { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-start; }
    .tag-pill { background: #FAFAFA; border: 1px solid #E5E7EB; padding: 8px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; font-family: 'Rethink Sans', sans-serif; display: flex; align-items: center; color: #4B5563;}
    .tag-pill.active { background: var(--primary-color, #00af6c); border-color: var(--primary-color, #00af6c); color: white; }
    .pill-icon { margin-right: 6px; display: flex; }
    
    .timeline-container { display: flex; flex-direction: row; gap: 6px; }
    .timeline-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; background: #FAFAFA; border: 1px solid #E5E7EB; padding: 10px 4px; border-radius: 8px; cursor: pointer; transition: 0.2s; text-align: center;}
    .timeline-btn.active { border-color: var(--primary-color, #00af6c); background: rgba(0,175,108,0.08); }
    .tl-circle { width: 14px; height: 14px; border-radius: 50%; border: 2px solid #D1D5DB; background: white; transition: 0.2s; }
    .timeline-btn.active .tl-circle { border-color: var(--primary-color, #00af6c); border-width: 4px; }
    .tl-text { font-size: 12px; font-weight: 700; font-family: 'Rethink Sans', sans-serif; color: #4B5563; }
    .timeline-btn.active .tl-text { color: var(--primary-color, #00af6c); }
    
    .numbers-row { display: flex; gap: 8px; flex-direction: row;}
    .num-card { flex: 1; height: 40px; background: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; font-family: 'Rethink Sans', sans-serif; color: #4B5563;}
    .num-card.active { border-color: var(--primary-color, #00af6c); background: var(--primary-color, #00af6c); color: white; }
    
    .jauge-container { position: relative; padding: 20px 0 5px; margin: 0 10px; }
    .jauge-track { position: absolute; top: 50%; left: 0; right: 0; height: 6px; background: #E5E7EB; border-radius: 3px; transform: translateY(-50%); }
    .jauge-fill { height: 100%; background: var(--primary-color, #00af6c); border-radius: 3px; transition: 0.3s; }
    .jauge-points { position: relative; display: flex; justify-content: space-between; align-items: center; }
    .jauge-pt { width: 18px; height: 18px; border-radius: 50%; background: #E5E7EB; border: 3px solid white; cursor: pointer; position: relative; transition: 0.3s; padding:0;}
    .jauge-pt.filled { background: var(--primary-color, #00af6c); }
    .jauge-pt.active { transform: scale(1.3); background: var(--primary-color, #00af6c); border-color: white; }
    .pt-lbl { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%) scale(0.8); font-weight: 800; font-size: 13px; color: var(--primary-color, #00af6c); }
    .jauge-labels { display: flex; justify-content: space-between; font-weight: 600; font-size: 11px; color: #9CA3AF; margin-top: 6px;}
    
    .q-footer { padding: 16px 20px 24px; background: white; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); z-index: 10; }
    .btn-next { width: 100%; background: var(--primary-color, #00af6c); color: white; border: none; padding: 14px; border-radius: 24px; font-weight: 800; font-size: 16px; font-family: 'Rethink Sans', sans-serif; cursor: pointer; transition: 0.2s;}
    .btn-next:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; }
  `]
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

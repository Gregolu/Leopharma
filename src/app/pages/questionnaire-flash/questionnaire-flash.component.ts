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
      <header class="q-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h1 class="header-title">Questionnaire flash</h1>
      </header>

      <div class="info-banner">
        <h2>Mes mains sont-elles à risque ?</h2>
        <p>L’eczéma chronique des mains touche environ 4,9 % de la population adulte en France.</p>
      </div>

      <div class="q-content">
        <div class="q-item">
          <div class="q-text">1. Avez-vous des lésions uniquement sur les mains et les poignets ?</div>
          <div class="q-options">
            <button class="btn-opt" [class.active]="answers[1] === 'Oui'" (click)="answers[1] = 'Oui'">Oui</button>
            <button class="btn-opt" [class.active]="answers[1] === 'Non'" (click)="answers[1] = 'Non'">Non</button>
          </div>
        </div>

        <div class="q-item">
          <div class="q-text">2. Quels symptômes durant les crises ?</div>
          <div class="tags-container">
            <button class="tag-opt" *ngFor="let sym of symptomsList"
                    [class.active]="answers[2].includes(sym)"
                    (click)="toggleSymptom(sym)">
              {{ sym }}
            </button>
          </div>
        </div>

        <div class="q-item">
          <div class="q-text">3. Depuis combien de temps les lésions sont-elles présentes ?</div>
          <div class="q-options">
            <button class="btn-opt" [class.active]="answers[3] === '< 3 mois'" (click)="answers[3] = '< 3 mois'">Moins 3 mois</button>
            <button class="btn-opt" [class.active]="answers[3] === '3-12 mois'" (click)="answers[3] = '3-12 mois'">3 à 12 mois</button>
            <button class="btn-opt" [class.active]="answers[3] === '+ 1 an'" (click)="answers[3] = '+ 1 an'">+ 1 an</button>
          </div>
        </div>

        <div class="q-item">
          <div class="q-text">4. Au cours des 12 derniers mois, combien de poussées avez-vous eu ?</div>
          <div class="q-options">
            <button class="btn-opt" [class.active]="answers[4] === '0'" (click)="answers[4] = '0'">0</button>
            <button class="btn-opt" [class.active]="answers[4] === '1'" (click)="answers[4] = '1'">1</button>
            <button class="btn-opt" [class.active]="answers[4] === '2 ou plus'" (click)="answers[4] = '2 ou plus'">2 ou plus</button>
          </div>
        </div>

        <div class="q-item">
          <div class="q-text">5. Quel est le retentissement de ce problème dans votre vie quotidienne ?</div>
          <div class="q-options">
            <button class="btn-opt" [class.active]="answers[5] === 'Beaucoup'" (click)="answers[5] = 'Beaucoup'">Beaucoup</button>
            <button class="btn-opt" [class.active]="answers[5] === 'Un peu'" (click)="answers[5] = 'Un peu'">Un peu</button>
            <button class="btn-opt" [class.active]="answers[5] === 'Non'" (click)="answers[5] = 'Non'">Non</button>
          </div>
        </div>
      </div>

      <div class="q-footer">
        <button class="submit-btn" (click)="calculateScore()">Terminer</button>
      </div>
    </div>
  `,
  styles: [`
    .q-wrapper {
      background: #FAFAFA;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      font-family: 'Gilroy-Medium', sans-serif;
    }
    
    .q-header {
      display: flex; align-items: center; padding: 12px 20px;
    }
    .back-btn { background: none; border: none; color: #204131; display: flex; align-items: center; cursor: pointer; padding: 0; }
    
    .header-title { font-family: 'Gilroy-Bold', sans-serif; font-size: 20px; color: #204131; margin: 0 0 0 16px; line-height: 1; }

    .info-banner {
      background-color: #204131;
      color: white;
      margin: 0 0 16px 0; /* Full width now */
      padding: 20px;
    }
    .info-banner h2 {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 18px;
      color: #FFFFFF;
      margin: 0 0 10px 0;
      line-height: 1.3;
    }
    .info-banner p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      opacity: 0.95;
    }

    .q-content {
      flex: 1;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      gap: 12px; /* Reduced gap to fit more to screen */
    }

    .q-item {
      background: white;
      border-radius: 16px; /* Slightly smaller radius */
      padding: 16px; /* Reduced padding */
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .q-text {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 15px; /* Reduced from 16px */
      color: #111827;
      margin-bottom: 12px; /* Reduced from 16px */
      line-height: 1.3;
    }

    .q-options {
      display: flex;
      gap: 8px; /* Reduced gap for options */
    }

    .btn-opt {
      flex: 1;
      padding: 10px 6px; /* Tighter padding */
      font-size: 13px; /* Slightly smaller font */
      border: 2px solid #F3F4F6;
      border-radius: 10px;
      background: #FFFFFF;
      color: #4B5563;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Gilroy-Medium', sans-serif;
    }
    .btn-opt.active {
      background: rgba(32, 65, 49, 0.05);
      border-color: #204131;
      color: #204131;
      font-family: 'Gilroy-Bold', sans-serif;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px; /* Much tighter gap for tags */
    }
    .tag-opt {
      padding: 6px 12px; /* Much smaller pill padding */
      font-size: 13px; /* Smaller font text */
      border: 2px solid #F3F4F6;
      border-radius: 16px;
      background: #FFFFFF;
      color: #4B5563;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Gilroy-Medium', sans-serif;
    }
    .tag-opt.active {
      background: rgba(32, 65, 49, 0.05);
      border-color: #204131;
      color: #204131;
      font-family: 'Gilroy-Bold', sans-serif;
    }

    .q-footer {
      padding: 16px 20px 24px;
      position: sticky;
      bottom: 0;
      background: linear-gradient(to top, #FAFAFA 80%, rgba(250,250,250,0) 100%);
    }
    .submit-btn {
      width: 100%;
      background: #204131;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 24px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(32, 65, 49, 0.3);
      cursor: pointer;
      transition: transform 0.1s;
    }
    .submit-btn:active {
      transform: scale(0.98);
    }
  `]
})
export class QuestionnaireFlashComponent {
  router = inject(Router);
  
  symptomsList = [
    'Rougeurs', 'Fissures', 'Gonflement', 
    'Épaississement', 'Sécheresse', 'Peau qui pèle', 
    'Démangeaisons', 'Douleurs', 'Brûlures'
  ];

  answers: Record<number, any> = { 1: null, 2: [], 3: null, 4: null, 5: null };

  goBack() { this.router.navigate(['/photo-analysis']); }

  toggleSymptom(sym: string) {
    const list = this.answers[2];
    const idx = list.indexOf(sym);
    if (idx > -1) list.splice(idx, 1);
    else list.push(sym);
  }

  calculateScore() {
    let score = 0;
    if (this.answers[1] === 'Oui') score += 20;
    
    if (this.answers[2] && this.answers[2].length > 0) {
      score += (this.answers[2].length * 5);
    }
    
    if (this.answers[3] === '3-12 mois') score += 10;
    if (this.answers[3] === '+ 1 an') score += 20;
    
    if (this.answers[4] === '1') score += 10;
    if (this.answers[4] === '2 ou plus') score += 20;
    
    if (this.answers[5] === 'Un peu') score += 10;
    if (this.answers[5] === 'Beaucoup') score += 20;
    
    // Normalize to 0-100 max
    score = Math.min(score, 100);
    this.router.navigate(['/predisposition-score'], { state: { score: score } });
  }
}

const fs = require('fs');
const file = '/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/questionnaire/questionnaire.component.ts';
let code = fs.readFileSync(file, 'utf8');

const regexListHTML = /<main class=\"question-list-view\">[\s\S]*?<\/main>/m;

const newListHTML = `<main class="question-list-view" style="padding: 16px;">
        <div class="accordion-header" (click)="isListOpen = !isListOpen">
          <span>À compléter ({{ totalSteps }})</span>
          <svg [class.open]="isListOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div class="accordion-body" *ngIf="isListOpen">
          <div class="list-item" *ngFor="let step of getAllSteps()" (click)="goToStep(step.index)">
            <div class="item-icon" [ngClass]="isAnswered(step.index) ? 'green-dot' : 'red-dot'"></div>
            <div class="item-icon-wrap" style="font-size: 20px; margin-left:12px;">
              {{ step.index === 0 ? '📸' : step.index === 1 ? '🔍' : '📝' }}
            </div>
            <div class="item-content" style="flex:1; margin-left: 12px;">
              <h3 style="font-size: 14px; margin: 0; color: #333; font-weight: 500;">{{ step.title }}</h3>
            </div>
            <div class="item-arrow" style="display:flex; align-items:center; justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </main>`;

code = code.replace(regexListHTML, newListHTML);

const oldStyles = /\.item-content p \{[\s\S]*?\}/m;

const newStyles = `.item-content p {
      margin: 0;
      font-size: 14px;
      color: #777;
    }
    .accordion-header {
      background: #000;
      color: #FFF;
      padding: 16px 20px;
      font-family: 'Rethink Sans', sans-serif;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .accordion-header svg {
      transition: transform 0.3s ease;
    }
    .accordion-header svg.open {
      transform: rotate(180deg);
    }
    .accordion-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .list-item {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-radius: 12px;
      background: white;
      cursor: pointer;
    }`;

code = code.replace(oldStyles, newStyles);

if (!code.includes('isListOpen = true;')) {
    code = code.replace(/get healthScore\(\): number \{/, `
  isListOpen = true;

  getAllSteps() {
    return [
      { index: 0, title: 'Analyse par photo' },
      { index: 1, title: 'Scan Produit' },
      ...this.questions.map((q, i) => ({ index: i + 2, title: q.text }))
    ];
  }

  goToStep(index: number) {
    this.currentStep = index;
    this.viewMode = 'step';
  }

  isAnswered(stepIndex: number): boolean {
    if (stepIndex === 0) return this.markers && this.markers.length > 0;
    if (stepIndex === 1) return this.scannerState === 'result';
    const qIndex = stepIndex - 2;
    if (qIndex < 0 || !this.questions || qIndex >= this.questions.length) return false;
    const q = this.questions[qIndex];
    if (!this.state || !this.state.answers) return false;
    const ans = this.state.answers[q.id];
    return ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : !!ans);
  }

  get healthScore(): number {`);
}

fs.writeFileSync(file, code);
console.log("Updated questionnaire component!");

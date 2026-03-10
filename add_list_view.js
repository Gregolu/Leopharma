const fs = require('fs');
const file = 'src/app/pages/questionnaire/questionnaire.component.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('viewMode:')) {
  // Add viewMode property
  code = code.replace(/currentStep\s*=\s*0;/, "viewMode: 'list' | 'step' = 'list';\n  currentStep = 0;");
  
  // Replace the template with wrapped viewMode checks
  code = code.replace(/<div class="stepper-app-container">/, `<div class="stepper-app-container" *ngIf="viewMode === 'step'">`);

  // Inject the list view HTML
  const listViewHtml = `
    <div class="stepper-app-container" *ngIf="viewMode === 'list'">
      <!-- GREEN HEADER -->
      <div class="patient-header">
        <div class="header-top" style="justify-content: center;">
          <h1 class="header-title">Mes bilans santé</h1>
        </div>
      </div>
      
      <main class="question-list-view">
        <div class="list-item" (click)="viewMode = 'step'">
          <div class="item-icon green-dot"></div>
          <div class="item-content">
            <h3>Bilan D.A.</h3>
            <p>12 questions, 2 min</p>
          </div>
          <div class="item-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c5e53" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
        
        <div class="list-item locked">
          <div class="item-icon red-dot"></div>
          <div class="item-content">
            <h3>Bilan Psoriasis</h3>
            <p>Bientôt disponible</p>
          </div>
        </div>
      </main>
    </div>
  `;
  code = code.replace(/template:\s*`\s*/, 'template: `\n' + listViewHtml + '\n');

  // Update goBack logic
  code = code.replace(/goBack\(\)\s*\{[\s\S]*?this\.location\.back\(\);\s*\}\s*\}/, `goBack() {\n    if (this.currentStep > 0) {\n      this.prev();\n    } else {\n      this.viewMode = 'list';\n    }\n  }`);
  
  // And the CSS
  code = code.replace(/styles:\s*\[`/, "styles: [`\n" + `
    .question-list-view {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .list-item {
      background: white;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      cursor: pointer;
    }
    .list-item.locked {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .item-icon {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .green-dot {
      background-color: #4CAF50;
    }
    .red-dot {
      background-color: #F44336;
    }
    .item-content {
      flex: 1;
    }
    .item-content h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      color: #333;
    }
    .item-content p {
      margin: 0;
      font-size: 14px;
      color: #777;
    }
  ` + "\n");

  fs.writeFileSync(file, code);
  console.log('List view structure added');
} else {
  console.log('Already added');
}

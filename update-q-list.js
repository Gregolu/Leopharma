const fs = require('fs');
const file = '/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app/pages/questionnaire/questionnaire.component.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace main wrapper
code = code.replace('<main class="question-list-view" style="padding: 16px;">', '<main class="question-list-view" style="padding: 0;">');

// Add padding to accordion body
code = code.replace('<div class="accordion-body" *ngIf="isListOpen">', '<div class="accordion-body" *ngIf="isListOpen" style="padding: 16px;">');

// Replace Emojis with SVGs
const emojiHtmlRegex = /<div class="item-icon-wrap" style="font-size: 20px; margin-left:12px;">\s*\{\{\s*step\.index\s*===\s*0\s*\?\s*'📸'\s*:\s*step\.index\s*===\s*1\s*\?\s*'🔍'\s*:\s*'📝'\s*\}\}\s*<\/div>/;

const svgHtml = `<div class="item-icon-wrap" style="display:flex; align-items:center; justify-content:center; margin-left:12px; color: #2c5e53;">
              <ng-container [ngSwitch]="step.index">
                <svg *ngSwitchCase="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <svg *ngSwitchCase="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>
                <svg *ngSwitchDefault width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </ng-container>
            </div>`;

code = code.replace(emojiHtmlRegex, svgHtml);

// Fix accordion header CSS
code = code.replace(/border-radius: 12px;\s*margin-bottom: 12px;/, `border-radius: 0;
      margin-bottom: 0;`);

fs.writeFileSync(file, code);
console.log("Emojis replaced and header stuck!");
const fs = require('fs');
const path = require('path');

// 1. Home component adjustments
const homePath = path.join(__dirname, 'src', 'app', 'pages', 'home', 'home.component.ts');
if (fs.existsSync(homePath)) {
  let homeCode = fs.readFileSync(homePath, 'utf8');

  homeCode = homeCode.replace(
    /\.image-wrapper\s*\{[\s\S]*?position:\s*relative;\s*\}/,
    `.image-wrapper {
        width: calc(100% + 24px);
        height: 250px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        margin-top: -10px;
        margin-left: -24px;
        position: relative;
      }`
  );

  homeCode = homeCode.replace(
    /\.main-image\s*\{[\s\S]*?transform-origin:\s*bottom right;\s*\}/,
    `.main-image {
        height: 160%;
        object-fit: contain;
        transform: translate(-10px, 35px); 
        transform-origin: bottom left;
      }`
  );
  fs.writeFileSync(homePath, homeCode, 'utf8');
}

// 2. Questionnaire adjustments
const qPath = path.join(__dirname, 'src', 'app', 'pages', 'questionnaire', 'questionnaire.component.ts');
if (fs.existsSync(qPath)) {
  let qCode = fs.readFileSync(qPath, 'utf8');

  qCode = qCode.replace(
    /<div class="score-panel">\s*<div class="score-title">Santé de la peau<\/div>\s*<div class="score-value" \[class\.warning\]="healthScore < 50">{{ healthScore }} \/ 100<\/div>\s*<\/div>/,
    `<div style="display:flex; width: 100%; gap: 10px; justify-content: center; align-items:center; margin-bottom: 16px;">
              <div class="score-panel" style="margin-bottom:0; width:60%;">
                <div class="score-title">Santé de la peau</div>
                <div class="score-value" [class.warning]="healthScore < 50">{{ healthScore }} / 100</div>
              </div>
              <button style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:none; border:1px solid #EAEAEA; border-radius:12px; padding:10px; cursor:pointer;" (click)="retakePhoto()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#204131" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span style="font-size:10px; margin-top:4px; font-family:'Gilroy-Bold',sans-serif; color:#204131;">Reprendre</span>
              </button>
            </div>`
  );

  if (!qCode.includes('retakePhoto(')) {
    qCode = qCode.replace(
      /takePhoto\(\) \{\s*this\.photoState = 'analyze';\s*\}/,
      `takePhoto() {\n    this.photoState = 'analyze';\n  }\n\n  retakePhoto() {\n    this.photoState = 'capture';\n    this.markers = [];\n  }`
    );
  }

  // Change the svg structure of step 2 to use questionnaire2-produit.png
  qCode = qCode.replace(
    /<svg width="120" height="120"([^>]*)>\s*<path([^>]*)>\s*<\/svg>/,
    `<img src="/assets/images/questionnaire2-produit.png" alt="Scan produit" style="width: 100%; height: 100%; object-fit: contain; pointer-events:none;">`
  );

  fs.writeFileSync(qPath, qCode, 'utf8');
}

console.log('Adjustments applied');

const fs = require('fs');

// PART 1: HOME PAGE IMAGE
const homeFile = 'src/app/pages/home/home.component.ts';
let homeCode = fs.readFileSync(homeFile, 'utf8');

// Baisser la main
homeCode = homeCode.replace('bottom: -40px;', 'bottom: -60px;');
fs.writeFileSync(homeFile, homeCode);
console.log('Home image adjusted');

// PART 2: PRODUCT SCAN REDESIGN
const qFile = 'src/app/pages/questionnaire/questionnaire.component.ts';
let qCode = fs.readFileSync(qFile, 'utf8');

const htmlStart = `<div class="product-result-card">`;
const htmlEnd = `<button class="action-btn-styled" style="margin-top: 20px; font-family:'Gilroy-Bold',sans-serif;" (click)="scanNewProduct()">`;

if (qCode.includes(htmlStart) && qCode.includes(htmlEnd)) {
  const currentHtml = qCode.substring(qCode.indexOf(htmlStart), qCode.indexOf(htmlEnd));
  
  const newHtml = `<div class="modern-result-card">
            <!-- Top header with badge -->
            <div class="mrc-header">
              <div class="mrc-risk-badge">
                <span class="mrc-risk-icon">⚠️</span> SCORE : 89/100 - RISQUE ÉLEVÉ
              </div>
            </div>
            
            <!-- Content area -->
            <div class="mrc-body">
              <div class="mrc-product-overview">
                <div class="mrc-img-wrapper">
                  <img src="/assets/images/questionnaire2-produit.png" alt="Produit scanné">
                </div>
                <div class="mrc-product-names">
                  <h3 class="mrc-title">Nettoyant Multi-usages</h3>
                  <p class="mrc-brand">Onaxa Corp</p>
                </div>
              </div>

              <!-- Divider -->
              <div class="mrc-divider"></div>

              <!-- Allergens list -->
              <div class="mrc-allergens-section">
                <h4 class="mrc-section-title">Allergènes détectés :</h4>
                <div class="mrc-allergen-list">
                  <div class="mrc-allergen-item">
                    <div class="mrc-dot critical"></div>
                    <div class="mrc-allergen-info">
                      <span class="mrc-allergen-name">Kathon CG</span>
                      <span class="mrc-allergen-gravity">Gravité : Sévère</span>
                    </div>
                  </div>
                  <div class="mrc-allergen-item">
                    <div class="mrc-dot moderate"></div>
                    <div class="mrc-allergen-info">
                       <span class="mrc-allergen-name">Glycol</span>
                       <span class="mrc-allergen-gravity">Gravité : Modérée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          `;
          
  qCode = qCode.replace(currentHtml, newHtml);
  console.log('HTML replaced');
} else {
  console.log('HTML NOT replaced!!');
}

const cssStart = `.product-result-card {`;
const cssEndStart = `.pr-allergen-item span {`;

if (qCode.includes(cssStart)) {
  let startIndex = qCode.indexOf(cssStart);
  let cssEndIndex = qCode.indexOf('}', qCode.indexOf(cssEndStart)) + 1;
  const currentCss = qCode.substring(startIndex, cssEndIndex);
  
  const newCss = `.modern-result-card {
      width: 100%;
      background: #FFFFFF;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.08);
      margin-top: 10px;
      margin-bottom: 20px;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .mrc-header {
      background-color: #FE3B3B;
      padding: 16px;
      text-align: center;
    }
    .mrc-risk-badge {
      color: #FFFFFF;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .mrc-risk-icon {
      font-size: 20px;
    }
    .mrc-body {
      padding: 24px;
    }
    .mrc-product-overview {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .mrc-img-wrapper {
      width: 70px;
      height: 70px;
      background: #F5F5F5;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }
    .mrc-img-wrapper img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
    .mrc-product-names {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
    .mrc-title {
      margin: 0 0 4px 0;
      color: #204131;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 20px;
      line-height: 1.2;
    }
    .mrc-brand {
      margin: 0;
      color: #666;
      font-family: 'Gilroy-Medium', sans-serif;
      font-size: 14px;
    }
    .mrc-divider {
      height: 1px;
      background: #EAEAEA;
      margin: 20px 0;
    }
    .mrc-allergens-section {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    .mrc-section-title {
      margin: 0 0 16px 0;
      color: #000;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
    }
    .mrc-allergen-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .mrc-allergen-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #F8F9FA;
      padding: 12px 16px;
      border-radius: 12px;
    }
    .mrc-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .mrc-dot.critical {
      background-color: #FE3B3B;
    }
    .mrc-dot.moderate {
      background-color: #FBB03B;
    }
    .mrc-allergen-info {
      display: flex;
      flex-direction: column;
    }
    .mrc-allergen-name {
      color: #000;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 15px;
    }
    .mrc-allergen-gravity {
      color: #666;
      font-family: 'Gilroy-Medium', sans-serif;
      font-size: 12px;
      margin-top: 2px;
    }`;
  
  qCode = qCode.replace(currentCss, newCss);
  console.log('CSS replaced');
} else {
  console.log('CSS NOT replaced!!');
}

fs.writeFileSync(qFile, qCode);

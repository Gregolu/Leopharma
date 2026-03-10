import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-photo-analysis',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="analysis-container">
      <header class="a-header">
        <button class="back-btn" routerLink="/auth">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <span class="header-title">Analyse par photo</span>
      </header>
      
      <div class="hand-map-hero">
        <img src="/assets/images/hand.png" alt="Hand illustration" class="bg-hand-img" onerror="this.src='https://images.unsplash.com/photo-1616858599423-7db4c8fb232a?w=500&auto=format&fit=crop&q=60'">

        <div class="callout callout-tl callout-green">
          <div class="callout-box">
            <div class="callout-title">Bout des doigts</div>
            <div class="callout-value green-text">10%</div>
          </div>
          <div class="connector-line"></div>
          <div class="connector-dot"></div>
        </div>

        <div class="callout callout-bl callout-orange">
          <div class="callout-box">
            <div class="callout-title">Dos de la main</div>
            <div class="callout-value orange-text">50%</div>
          </div>
          <div class="connector-line"></div>
          <div class="connector-dot"></div>
        </div>

        <div class="callout callout-mr callout-red">
          <div class="callout-box">
            <div class="callout-title">Doigts</div>
            <div class="callout-value red-text">83%</div>
          </div>
          <div class="connector-line"></div>
          <div class="connector-dot"></div>
        </div>

        <div class="callout callout-br callout-green">
          <div class="callout-box">
            <div class="callout-title">Poignet</div>
            <div class="callout-value green-text">5%</div>
          </div>
          <div class="connector-line"></div>
          <div class="connector-dot"></div>
        </div>
      </div>

      <div class="actions" style="margin-top: 40px; padding: 0 24px;">
        <button class="btn-cta-green" routerLink="/questionnaire-flash">Continuer le bilan</button>
      </div>
    </div>
  `,
  styles: [`
    .analysis-container {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background-color: #F8F9FA;
      padding-top: 16px;
      padding-bottom: 40px;
    }
    .a-header { display: flex; align-items: center; padding: 0 24px; margin-bottom: 24px; }
    .back-btn { background: none; border: none; padding: 0; margin-right: 16px; color: #204131; cursor: pointer; }
    .header-title { font-family: 'Gilroy-Bold', sans-serif; font-size: 18px; color: #204131; }
    
    .hand-map-hero {
      position: relative;
      width: 100%;
      height: 520px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      margin-top: 10px;
    }
    
    .bg-hand-img {
      height: 100%;
      width: auto;
      max-width: 100%;
      object-fit: contain;
      object-position: center;
    }

    .callout { position: absolute; z-index: 10; }
    .callout-box { background: white; padding: 10px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; border-radius: 4px; }
    .callout-title { font-family: 'Gilroy-Medium', sans-serif; font-size: 12px; color: #444; margin-bottom: 4px; white-space: nowrap; }
    .callout-value { font-family: 'Gilroy-Bold', sans-serif; font-size: 20px; }

    /* Colors */
    .callout-green .callout-box { border: 2px solid #2ECC71; }
    .green-text { color: #2ECC71; }
    
    .callout-orange .callout-box { border: 2px solid #F39C12; }
    .orange-text { color: #F39C12; }
    
    .callout-red .callout-box { border: 2px solid #E74C3C; }
    .red-text { color: #E74C3C; }

    .connector-line { position: absolute; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
    .connector-dot { position: absolute; width: 8px; height: 8px; background: white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }

    /* Bout des doigts */
    .callout-tl { top: 12%; left: 4%; transform: scale(0.9); }
    .callout-tl .connector-line { height: 2px; width: 45px; top: 50%; left: 100%; }
    .callout-tl .connector-dot { top: calc(50% - 3px); left: calc(100% + 40px); }

    /* Dos de la main */
    .callout-bl { bottom: 25%; left: 4%; transform: scale(0.9); }
    .callout-bl .connector-line { height: 2px; width: 55px; top: 50%; left: 100%; }
    .callout-bl .connector-dot { top: calc(50% - 3px); left: calc(100% + 50px); }

    /* Doigts */
    .callout-mr { top: 35%; right: 4%; transform: scale(0.9); }
    .callout-mr .connector-line { height: 2px; width: 40px; top: 50%; right: 100%; }
    .callout-mr .connector-dot { top: calc(50% - 3px); right: calc(100% + 35px); }

    /* Poignet */
    .callout-br { bottom: 10%; right: 4%; transform: scale(0.9); }
    .callout-br .connector-line { height: 2px; width: 50px; top: 50%; right: 100%; }
    .callout-br .connector-dot { top: calc(50% - 3px); right: calc(100% + 45px); }

    .btn-cta-green { background: #204131; color: white; border: none; padding: 16px 32px; border-radius: 30px; font-family: 'Gilroy-Bold', sans-serif; font-size: 16px; width: 100%; cursor: pointer; display: block; text-align: center; text-decoration: none; }
  `]
})
export class PhotoAnalysisComponent {}

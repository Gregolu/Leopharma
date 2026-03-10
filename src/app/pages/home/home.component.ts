import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BottomNavComponent],
  template: `
    <div class="home-wrapper">
      <header class="app-header">
        <div class="logo-box">
          <img src="/assets/images/Logo-manuderma.png" alt="Manuderma Logo" class="header-logo">
        </div>
        <div class="user-avatar" routerLink="/auth">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </header>

      <div class="main-content">
        <h1 class="greeting">Eczéma <span class="highlight">des mains</span></h1>
        
        <p class="subtitle">
          L’eczéma des mains est une affection cutanée fréquente pouvant provoquer sécheresse, rougeurs et démangeaisons.
        </p>
        
        <div class="cta-wrapper">
          <p class="question-text">
            <strong>Est-ce que cela pourrait concerner vos mains ?</strong><br>
            Évaluez votre situation en quelques minutes.
          </p>
          <button routerLink="/questionnaire-flash" class="hero-btn">Évaluer mon risque</button>
        </div>

        <div class="image-wrapper">
          <img src="/assets/images/hand.png" alt="Main" class="main-image">
        </div>
      </div>

      <app-bottom-nav></app-bottom-nav>


      <div class="bottom-panel">
        <h2>Commencer le bilan de mes mains</h2>
        <p>Commencez à surveiller la santé de vos mains grâce à des questionnaires et à un suivi personnalisé.</p>
        <button routerLink="/auth" class="panel-btn">Commencer mon bilan santé</button>
      </div>

      <div class="symptoms-section">
        <h2 class="section-title">Les symptômes fréquents</h2>
        
        <div class="symptom-row">
          <div class="symptom-text">
            <h3>Rougeurs et irritations</h3>
            <p>La peau peut devenir rouge, enflée et particulièrement irritée par endroits.</p>
          </div>
          <div class="symptom-image">
            <img src="/assets/images/rougeur.png" alt="Rougeurs" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;">
          </div>
        </div>
        
        <div class="symptom-row reverse">
          <div class="symptom-text">
            <h3>Sécheresse et fissures</h3>
            <p>Une sécheresse extrême peut entraîner des fissures profondes et douloureuses.</p>
          </div>
          <div class="symptom-image">
            <img src="/assets/images/fissure.png" alt="Sécheresse et fissures" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;">
          </div>
        </div>

        <div class="symptom-row">
          <div class="symptom-text">
            <h3>Démangeaisons</h3>
            <p>Le besoin de se gratter peut être intense et gêner le sommeil, surtout la nuit.</p>
          </div>
          <div class="symptom-image">
            <img src="/assets/images/démengeaison.png" alt="Démangeaisons" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;">
          </div>
        </div>

        <div class="symptom-row reverse">
          <div class="symptom-text">
            <h3>Peau qui pèle</h3>
            <p>Des squames ou une desquamation peuvent apparaître de manière récurrente sur vos mains.</p>
          </div>
          <div class="symptom-image">
            <img src="/assets/images/Sécheresse.png" alt="Peau qui pèle" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;">
          </div>
        </div>
      </div>

      <div class="benefits-section">
        <h2 class="section-title">Pourquoi utiliser l’application ?</h2>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <div class="benefit-text">
            <h3>Détection précoce</h3>
            <p>Identifiez rapidement les signes pouvant évoquer un eczéma des mains.</p>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <div class="benefit-text">
            <h3>Accélérer le parcours de soins</h3>
            <p>Préparez votre consultation avec des informations utiles pour les professionnels de santé.</p>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
          </div>
          <div class="benefit-text">
            <h3>Suivi personnalisé</h3>
            <p>Améliorez votre santé grâce à un parcours adapté à votre situation.</p>
          </div>
        </div>
      </div>

      
      
    </div>
  `,
  styles: [`
    .home-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      overflow-x: hidden;
      background-color: var(--white);
      padding-bottom: 96px;
    }

    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      margin-top: 16px;
    }
    
    .logo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      transform: translateX(22px);
    }

    .header-logo {
      height: 55px;
      object-fit: contain;
    }

    .user-avatar {
      width: 44px;
      height: 44px;
      background: var(--white);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
    }

    .main-content {
      text-align: center;
      padding: 16px 24px 0 24px;
      position: relative;
    }

    .greeting {
      font-size: 32px;
      line-height: 1.2;
      margin: 0 0 16px 0;
      color: var(--secondary-color);
    }
    
    .highlight {
      color: #204131;
    }

    .subtitle {
      color: var(--secondary-color);
      font-size: 14px;
      line-height: 1.5;
      margin: 0 auto 24px auto;
      max-width: 90%;
    }

    .cta-wrapper {
      margin-bottom: 0px;
    }

    .question-text {
      color: #204131;
      font-size: 14px;
      margin: 0 0 16px 0;
    }

    .hero-btn {
      background: var(--secondary-color);
      color: var(--white);
      border: none;
      padding: 16px 32px;
      border-radius: 30px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      position: relative;
      z-index: 10;
    }

    .image-wrapper {
        width: 100%;
        height: 250px;
        position: relative;
        margin-top: -10px;
      }

    .main-image {
        position: absolute;
        bottom: -60px;
        left: -24px;
        height: 180%;
        object-fit: contain;
        transform-origin: bottom left;
      }

    .section-title {
      font-size: 22px;
      color: var(--primary-color);
      margin: 0 0 30px 0;
      text-align: center;
    }

    .symptoms-section {
      background: #F9F9F9;
      padding: 60px 24px 40px 24px;
      position: relative;
      z-index: 5;
      margin-top: -50px; 
      border-radius: 30px;
    }

    .symptom-row {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 16px;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .symptom-row.reverse {
      grid-template-columns: 0.8fr 1.2fr;
    }
    
    .symptom-row.reverse .symptom-text {
      grid-column: 2;
      grid-row: 1;
    }

    .symptom-row.reverse .symptom-image {
      grid-column: 1;
      grid-row: 1;
    }

    .symptom-text h3 {
      font-size: 16px;
      color: #204131;
      margin: 0 0 8px 0;
    }
    
    .symptom-text p {
      font-size: 13px;
      color: var(--secondary-color);
      margin: 0;
      line-height: 1.4;
    }

    .symptom-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .placeholder-img {
      background: var(--white);
      border-radius: 20px;
      height: 100px;
      width: 100px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      margin: 0 auto;
    }

    .benefits-section {
      padding: 40px 24px;
      background: var(--white);
    }

    .benefit-card {
      display: flex;
      gap: 16px;
      background: var(--bg-color);
      padding: 20px;
      border-radius: 20px;
      margin-bottom: 16px;
    }

    .benefit-icon {
      background: var(--white);
      color: #204131;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .benefit-text h3 {
      font-size: 16px;
      color: var(--primary-color);
      margin: 0 0 8px 0;
    }

    .benefit-text p {
      font-size: 13px;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    .bottom-panel {
      background-color: #204131;
      color: var(--white);
      border-radius: 0;
      padding: 50px 24px;
      margin: 16px 0 30px 0;
      text-align: center;
      position: relative;
      z-index: 10;
      width: 100%;
      box-sizing: border-box;
    }

    .bottom-panel h2 {
      color: var(--white);
      font-size: 24px;
      margin: 0 0 16px 0;
    }

    .bottom-panel p {
      font-size: 15px;
      line-height: 1.5;
      margin: 0 0 24px 0;
      opacity: 0.9;
    }

    .panel-btn {
      background: var(--secondary-color);
      color: var(--white);
      border: none;
      padding: 16px 32px;
      border-radius: 30px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
    }
  `]
})
export class HomeComponent {}

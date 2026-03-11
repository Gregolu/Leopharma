import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-wrapper">
      <header class="app-header">
        <div class="logo-box">
          <img src="/assets/images/logo-manuderma2@2x.png" alt="Manuderma Logo" class="header-logo">
        </div>
        <div class="user-avatar" routerLink="/auth">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </header>

      <div class="main-content">
        <h1 class="greeting">Une démangeaison, <span class="highlight">
         une rougeur ?</span></h1>
        
        <p class="subtitle">
          L’eczéma des mains est une affection cutanée fréquente pouvant provoquer sécheresse, rougeurs et démangeaisons.
        </p>
        
        <div class="cta-wrapper">
          <p class="question-text">
            <strong>Est-ce que cela pourrait concerner vos mains ?</strong><br>
            Évaluez votre situation en quelques minutes.
          </p>
          <button routerLink="/questionnaire-flash" class="hero-btn">Réaliser mon bilan dermatologique</button>
        </div>

        <div class="image-wrapper">
          <img src="/assets/images/visuel-main.png" alt="Main" class="main-image">
        </div>
      </div> 
 
      <div class="login-section" style="margin-top: 2rem; padding: 1.5rem; background: #F5F7FA; border-radius: 12px; text-align: center; border: 1px solid #EDEDED;">
        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem; font-weight: 600;">Vous avez déjà un compte ?</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Connectez-vous pour retrouver votre dossier médical, suivre l'évolution de vos symptômes et gérer vos alertes dermatologiques.</p>
        <button routerLink="/auth" style="background: none; border: 1px solid var(--primary-color); color: var(--primary-color); padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 1rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 100%; transition: all 0.2s;">
          Se connecter
        </button>
      </div>


      


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

      
      
    

      <div class="science-section" style="margin: 3rem 24px 5rem; padding: 2rem 1.5rem; text-align: center; background: #FFF; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <h2 style="font-size: 1.5rem; color: #1A4D2E; margin-bottom: 1rem; font-weight: 700;">Application scientifique</h2>
        <p style="font-size: 1.05rem; color: #555; line-height: 1.5; margin-bottom: 2rem;">Découvrez des conseils personnalisés prodigués par des experts certifiés, explorez différentes solutions pour faciliter et améliorer votre santé.</p>
        <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <img src="https://images.unsplash.com/photo-1584308666744-24d5e478546f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3" alt="Mains scientifiques" style="width: 100%; height: auto; display: block;" />
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
      height: 35px;
      object-fit: contain;
    }

    .user-avatar {
      width: 44px;
      height: 44px;
      background: var(--white);
      border: 1px solid var(--primary-color, #00af6c);
      color: var(--primary-color, #00af6c);
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
    
    .main-content::before {
      content: '';
      position: absolute;
      top: 10%; 
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      background-image: url('/assets/images/icone-manuderma@2x.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      opacity: 0.07;
      pointer-events: none;
      z-index: 0;
    }
    
    .greeting, .subtitle, .cta-wrapper {
      position: relative;
      z-index: 1;
    }

    .greeting {
      font-size: 32px;
      line-height: 1.2;
      margin: 0 0 16px 0;
      color: var(--secondary-color);
    }
    
    .highlight {
      color: var(--primary-color, #00af6c);
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
      color: var(--primary-color, #00af6c);
      font-size: 14px;
      margin: 0 0 16px 0;
    }

    .hero-btn {
      background: #00af6c;
      color: var(--white);
      border: none;
      padding: 16px 32px;
      border-radius: 30px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
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
        bottom: -70px;
        left: 50%;
        transform: translateX(-50%);
        height: 140%;
        object-fit: contain;
      }

    .section-title {
      font-size: 22px;
      color: var(--primary-color, #00af6c);
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
      color: var(--primary-color, #00af6c);
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
      color: var(--primary-color, #00af6c);
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
      color: var(--primary-color, #111);
      margin: 0 0 8px 0;
    }

    .benefit-text p {
      font-size: 13px;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    .bottom-panel {
      background-color: #111;
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
      background: var(--primary-color, #00af6c);
      color: #FFFFFF;
      border: none;
      padding: 16px 32px;
      border-radius: 30px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
    }
  `]
})
export class HomeComponent {}

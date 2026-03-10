import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-wrapper">
      
      <!-- HEADER -->
      <header class="q-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span class="q-title" *ngIf="viewState === 'landing'">Connexion</span>
        <span class="q-title" *ngIf="viewState === 'login'">Connexion</span>
        <span class="q-title" *ngIf="viewState === 'register'">Inscription</span>
      </header>

      <!-- VIEW: LANDING -->
      <div class="view-container" *ngIf="viewState === 'landing'">
        <div class="top-banner">
          <h2>Créez votre compte ou connectez-vous</h2>
          <p>Pour sauvegarder votre progression et continuer l'analyse de vos symptômes de manière sécurisée.</p>
        </div>
        
        <div class="landing-content">
          <p class="login-hint"><strong>Inscrivez-vous</strong> ou <strong>connectez-vous</strong> pour faire votre bilan.</p>
          
          <div class="illustration-box">
             <img src="/assets/images/hand.png" alt="Illustration" class="auth-illustration">
          </div>

          <div class="action-buttons">
            <button class="btn-primary" (click)="viewState = 'login'">Se connecter</button>
            <button class="btn-secondary" (click)="viewState = 'register'">S'inscrire</button>
          </div>

          <div class="security-note">
            <p class="sec-title">La sécurité de <span>vos données</span></p>
            <p class="sec-text">Manuderma vous permet de stocker et partager vos données de santé dans un environnement sécurisé. Vous restez maître de vos informations.</p>
            <p class="sec-text">Vous pouvez demander la suppression de votre compte et de vos données à tout moment.</p>
          </div>
        </div>
      </div>

      <!-- VIEW: LOGIN -->
      <div class="view-container" *ngIf="viewState === 'login'">
        <div class="top-banner">
          <h2>Connectez-vous à votre compte</h2>
          <p>Pour sauvegarder votre progression et continuer votre bilan en profondeur.</p>
        </div>
        
        <div class="form-content">
          
          <div class="form-group">
            <label>Pays</label>
            <div class="input-wrap">
              <span class="flag">🇫🇷</span>
              <select>
                <option>France</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>E-mail</label>
            <input type="email" placeholder="Votre e-mail">
          </div>

          <div class="form-group">
            <label>Mot de passe</label>
            <div class="input-wrap">
              <input type="password" placeholder="Votre mot de passe">
              <span class="eye-icon">👁</span>
            </div>
            <div class="forgot-pwd">
              <a href="javascript:void(0)">Mot de passe oublié ?</a>
            </div>
          </div>

          <div class="action-buttons mt-30">
            <button class="btn-primary" (click)="login()">Se connecter</button>
            <button class="btn-secondary" (click)="viewState = 'register'">S'inscrire</button>
          </div>
        </div>
      </div>

      <!-- VIEW: REGISTER -->
      <div class="view-container" *ngIf="viewState === 'register'">
        <div class="top-banner">
          <h2>Créez votre compte</h2>
          <p>Pour sauvegarder votre progression et continuer votre suivi.</p>
          <p class="sub-link">Vous avez déjà un compte ? <a (click)="viewState = 'login'">Se connecter</a></p>
        </div>
        
        <div class="form-content">
          
          <div class="form-group">
            <label>Pays</label>
            <div class="input-wrap">
              <span class="flag">🇫🇷</span>
              <select>
                <option>France</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Nom*</label>
            <input type="text" placeholder="Votre nom">
          </div>
          <div class="form-group">
            <label>Prénom*</label>
            <input type="text" placeholder="Votre prénom">
          </div>
          
          <div class="form-group">
            <label>E-mail*</label>
            <input type="email" placeholder="Votre e-mail">
          </div>

          <div class="form-group">
            <label>Mot de passe*</label>
            <div class="input-wrap">
              <input type="password" placeholder="Votre mot de passe">
              <span class="eye-icon">👁</span>
            </div>
          </div>
          
          <div class="form-group">
            <label>Confirmez votre mot de passe*</label>
            <div class="input-wrap">
              <input type="password" placeholder="Confirmez">
              <span class="eye-icon">👁</span>
            </div>
          </div>

          <div class="form-group">
            <label>Numéro de téléphone</label>
            <div class="input-wrap flex-input">
              <div class="phone-prefix">🇫🇷 ^</div>
              <input type="tel" placeholder="Votre téléphone">
            </div>
          </div>

          <div class="row-inputs">
            <div class="form-group flex-1">
              <label>Code Postal</label>
              <input type="text" placeholder="Code">
            </div>
            <div class="form-group flex-1">
              <label>Ville</label>
              <input type="text" placeholder="Ville">
            </div>
          </div>

          <div class="form-group">
            <label>Adresse</label>
            <input type="text" placeholder="Adresse">
          </div>

          <div class="terms-group">
            <input type="checkbox" id="terms">
            <label for="terms">J'accepte les conditions générales de Manuderma. <a href="javascript:void(0)">Voir conditions</a></label>
          </div>

          <div class="action-buttons my-20">
            <button class="btn-secondary w-100 dark-bg" (click)="viewState = 'success'">M'inscrire</button>
          </div>
          
          <div class="legal-text">
            <p>En créant mon compte :</p>
            <p>Je comprends que Manuderma n'est pas un professionnel de santé mais un service d'information.</p>
            <p>J'autorise Manuderma à conserver et traiter mes données dans le cadre du service.</p>
          </div>

        </div>
      </div>

      <!-- VIEW: SUCCESS -->
      <div class="view-container split-view" *ngIf="viewState === 'success'">
        <div class="top-half-white">
          <img src="/assets/images/Logo-manuderma.png" alt="Manuderma Logo" class="big-logo" onerror="this.src='/assets/images/Logo-manuderma.png'">
          <h2>Merci d'avoir créé votre compte Manuderma.</h2>
        </div>
        <div class="bottom-half-green">
          <div class="success-icon-container" style="margin-bottom: 20px;">
            <svg width="74" height="74" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>Votre profil Manuderma a été créé avec succès.</h3>
          <p>Pour continuer, veuillez remplir le questionnaire sur la santé de vos mains afin de commencer à surveiller son état.</p>
          <div class="spacer"></div>
          <button class="btn-cta-white" routerLink="/questionnaire">Compléter mon bilan santé</button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .split-view {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 0;
      padding: 0;
      background: var(--white);
    }
    .top-half-white {
      flex: 1;
      background: var(--white);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }
    .top-half-white h2 {
      color: #204131;
      font-size: 24px;
      font-family: 'Gilroy-Bold', sans-serif;
      margin-top: 30px;
    }
    .big-logo {
      width: 200px;
      height: auto;
    }
    .bottom-half-green {
      flex: 1;
      background: #204131;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      text-align: center;
      color: var(--white);
      border-radius:40px 40px 0 0;
    }
    .bottom-half-green h3 {
      font-size: 22px;
      font-family: 'Gilroy-Bold', sans-serif;
      margin-bottom: 24px;
      color: #ffffff;
    }
    .bottom-half-green p {
      font-size: 16px;
      line-height: 1.5;
      opacity: 0.9;
    }
    .spacer {
      flex-grow: 1;
    }
    .btn-cta-white {
      background: var(--white);
      color: #204131;
      border: none;
      padding: 16px 32px;
      border-radius: 30px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      max-width: 300px;
      margin-bottom: 20px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .auth-wrapper {
      background: var(--white);
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      font-family: 'Gilroy-Medium', sans-serif;
    }
    
    .q-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 24px;
      position: relative;
    }
    
    .back-btn {
      position: absolute;
      left: 24px;
      background: none;
      border: none;
      color: #204131;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0;
    }
    
    .q-title {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 18px;
      color: #204131;
    }

    .view-container {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .top-banner {
      background: #204131;
      color: white;
      padding: 30px 24px 40px 24px;
      border-radius: 0 0 40px 40px;
      text-align: center;
      margin-bottom: 20px;
    }
    .top-banner h2 {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 20px;
      margin: 0 0 10px 0;
      color: #ffffff;
    }
    .top-banner p {
      font-size: 14px;
      margin: 0;
      opacity: 0.9;
      line-height: 1.4;
    }
    .sub-link {
      margin-top: 10px !important;
      font-size: 13px;
    }
    .sub-link a {
      font-family: 'Gilroy-Bold', sans-serif;
      color: white;
      text-decoration: underline;
      cursor: pointer;
    }

    /* Landing Content */
    .landing-content {
      padding: 0 24px 40px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .login-hint {
      color: #204131;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .illustration-box {
      margin-bottom: 30px;
      width: 100%;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .auth-illustration {
      max-height: 100%;
      object-fit: contain;
    }
    
    .security-note {
      margin-top: 40px;
      text-align: left;
    }
    .sec-title {
      font-family: 'Gilroy-Bold', sans-serif;
      color: #204131;
      font-size: 15px;
      margin-bottom: 10px;
    }
    .sec-title span { color: #000000; }
    .sec-text {
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
      line-height: 1.5;
    }

    /* Form Content */
    .form-content {
      padding: 0 30px 40px 30px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    .form-group label {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 13px;
      color: #204131;
      margin-bottom: 2px;
    }
    
    .form-group input, .form-group select {
      padding: 8px 16px;
      border-radius: 10px;
      border: 1px solid transparent;
      background: #F4F7F6;
      font-family: 'Gilroy-Medium', sans-serif;
      font-size: 14px;
      color: #333;
      width: 100%;
      box-sizing: border-box;
      outline: none;
    }
    
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-wrap input, .input-wrap select {
      width: 100%;
    }
    .input-wrap select {
      padding-left: 40px;
      appearance: none;
    }
    .flag {
      position: absolute;
      left: 12px;
      z-index: 2;
    }
    .eye-icon {
      position: absolute;
      right: 16px;
      color: #204131;
      cursor: pointer;
    }
    .flex-input {
      display: flex;
      background: #F4F7F6;
      border-radius: 12px;
      overflow: hidden;
    }
    .flex-input input {
      background: transparent;
      border-radius: 0;
    }
    .phone-prefix {
      background: #E8EDEC;
      color: #204131;
      padding: 0 12px;
      display: flex;
      align-items: center;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 14px;
    }

    .forgot-pwd {
      text-align: right;
      margin-top: 6px;
    }
    .forgot-pwd a {
      font-size: 12px;
      color: #204131;
      text-decoration: none;
    }

    .row-inputs {
      display: flex;
      gap: 10px;
    }
    .flex-1 { flex: 1; }

    .terms-group {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 10px;
    }
    .terms-group input {
      margin-top: 3px;
    }
    .terms-group label {
      font-size: 12px;
      color: #444;
      line-height: 1.4;
    }
    .terms-group a {
      color: #000000;
      font-family: 'Gilroy-Bold', sans-serif;
      text-decoration: none;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    .btn-primary {
      width: 100%;
      background: #000000; /* Teal accent like the example */
      color: white;
      border: none;
      padding: 16px;
      border-radius: 30px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      cursor: pointer;
    }
    .btn-secondary {
      width: 100%;
      background: #204131; /* Dark green */
      color: white;
      border: none;
      padding: 16px;
      border-radius: 30px;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 16px;
      cursor: pointer;
    }
    .dark-bg {
      background: #1A2E35;
    }
    .w-100 { width: 100%; }
    .mt-30 { margin-top: 30px; }
    .my-20 { margin: 20px 0; }

    .legal-text {
      font-size: 10px;
      color: #888;
      line-height: 1.4;
      text-align: left;
    }
    .legal-text p {
      margin: 0 0 6px 0;
    }
  `]
})
export class AuthComponent {
  router = inject(Router);
  viewState: 'landing' | 'login' | 'register' | 'success' = 'landing';

  goBack() {
    if (this.viewState === 'landing') {
      this.router.navigate(['/']);
    } else {
      this.viewState = 'landing';
    }
  }

  login() {
    // Fausse action : retourne à l'accueil
    this.router.navigate(['/']);
  }
}

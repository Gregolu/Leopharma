import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="auth-wrapper">
      
      <!-- HEADER -->
      <header class="auth-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div class="lang-selector" *ngIf="activeTab !== 'success'">
          <button class="lang-btn">Français</button>
        </div>
      </header>

      <div class="auth-content">
        
        <!-- LOGO & TABS (Only for login and register) -->
        <ng-container *ngIf="activeTab === 'login' || activeTab === 'register'">
          <div class="logo-container" style="display:flex; justify-content:center; align-items:center; margin: 20px auto 24px auto; background: rgba(0, 133, 77, 0.08); border-radius: 50%; width: 80px; height: 80px;">
            <img src="/assets/images/icone-manuderma@2x.png" alt="Manuderma" class="auth-logo" style="width: 40px; height: auto; object-fit: contain; margin: 0 auto; display: block;">
          </div>

          <div class="tabs-container">
            <div class="tabs">
              <button class="tab-btn" [class.active]="activeTab === 'login'" (click)="activeTab = 'login'">Connexion</button>
              <button class="tab-btn" [class.active]="activeTab === 'register'" (click)="activeTab = 'register'">Inscription</button>
            </div>
          </div>
        </ng-container>

        <!-- Login Section -->
        <div class="form-section" *ngIf="activeTab === 'login'">
          <h1 class="section-title">Connexion</h1>
          <form (ngSubmit)="onLogin()">
            
            <div class="form-group">
              <label>Adresse e-mail</label>
              <input type="email" class="form-control" placeholder="votre@email.com">
            </div>
            
            <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            
            <button type="button" class="submit-btn" (click)="onLogin()">Se connecter</button>
          </form>
        </div>

        <!-- Register Section -->
        <div class="form-section" *ngIf="activeTab === 'register'">
          <h1 class="section-title">Créer un compte</h1>
          
          <form (ngSubmit)="onRegister()">
            <div class="form-group">
              <label>Pays</label>
              <div class="input-wrap">
                <span class="flag">🇫🇷</span>
                <select class="form-control select-flag">
                  <option>France</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Nom*</label>
                <input type="text" placeholder="Votre nom" class="form-control">
              </div>
              <div class="form-group half">
                <label>Prénom*</label>
                <input type="text" placeholder="Votre prénom" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label>E-mail*</label>
              <input type="email" placeholder="Votre e-mail" class="form-control">
            </div>

            <div class="form-group">
              <label>Mot de passe*</label>
              <input type="password" placeholder="Votre mot de passe" class="form-control">
            </div>

            <div class="form-group">
              <label>Date de naissance*</label>
              <input type="date" class="form-control">
            </div>

            <div class="form-group">
              <label>Sexe*</label>
              <select class="form-control">
                 <option>Homme</option>
                 <option>Femme</option>
                 <option>Autre</option>
              </select>
            </div>

            <div class="agreements">
              <label class="cb-container">
                <input type="checkbox">
                <span class="checkmark"></span>
                <p>J'accepte de partager de manière anonyme et cryptée le résumé de mon bilan. <a href="#">En savoir plus</a></p>
              </label>
              <label class="cb-container mt-15">
                <input type="checkbox">
                <span class="checkmark"></span>
                <p>Je souhaite recevoir des communications et offres LEO Pharma.</p>
              </label>
              <label class="cb-container mt-15">
                <input type="checkbox">
                <span class="checkmark"></span>
                <p>J'ai lu et j'accepte les <a href="#">conditions d'utilisation</a>.</p>
              </label>
            </div>

            <button type="button" class="submit-btn" (click)="onRegister()">Continuer</button>
          </form>
        </div>

        <!-- Success Section (Post-Auth) -->
        <div class="success-section" *ngIf="activeTab === 'success'">
          <div class="success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 class="success-title">Votre compte a été<br><strong>créé avec succès</strong></h1>
          <p class="success-desc">Pour commencer votre suivi, nous avons préparé un questionnaire rapide pour vous.</p>
          
          <button class="submit-btn full" (click)="goToQuestionnaire()">Compléter mon bilan</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper { min-height: 100vh; 
      background: #FAFAFA; 
      display: flex; 
      flex-direction: column; 
      font-family: 'Rethink Sans', sans-serif; 
      overflow-y: auto; 
      
      
    }
    
    .auth-header { 
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 16px 20px; 
      z-index: 10; 
      background: #FAFAFA;
    }
    .back-btn { 
      background: none; border: none; color: #111; cursor: pointer; padding: 4px;
      display: flex; align-items: center; justify-content: center; margin-left: -4px;
    }
    
    .lang-btn {
      background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 20px; 
      padding: 6px 16px; font-size: 13px; font-weight: 600; color: #4B5563; 
      cursor: pointer; font-family: 'Rethink Sans', sans-serif; 
    }

    .auth-content { 
      flex: 1; padding: 0 24px 60px; display: flex; flex-direction: column; 
      width: 100%; box-sizing: border-box;
    }
    
    .auth-logo { width: 40px; height: auto; object-fit: contain;  margin: 0 auto; display: block; }
    .logo-container { 
      display: flex; justify-content: center; align-items: center; margin-bottom: 24px; padding: 20px; 
      background: rgba(0, 175, 108, 0.08); border-radius: 50%; width: 80px; height: 80px; 
      box-sizing: border-box; margin-top: 10px;
    }
    
    .tabs-container {
       display: flex; justify-content: center; margin-bottom: 32px;
    }
    .tabs { 
      display: flex; background: #E5E7EB; border-radius: 12px; padding: 4px; 
    }
    .tab-btn { 
      flex: 1; padding: 12px; border: none; background: transparent; border-radius: 8px; 
      font-size: 15px; font-weight: 700; color: #6B7280; cursor: pointer; transition: 0.2s; 
      font-family: 'Rethink Sans', sans-serif;
    }
    .tab-btn.active { 
      background: #FFFFFF; color: #111; box-shadow: 0 2px 4px rgba(0,0,0,0.05); 
    }
    
    .form-section { 
      display: flex; flex-direction: column;  animation: fadeIn 0.3s ease; 
    }
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(5px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    
    .section-title { 
      font-size: 24px; font-weight: 800; color: #111; margin: 0 0 24px; line-height: 1.2; text-align: center;
    }
    
    form { display: flex; flex-direction: column; gap: 16px;  }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-row { display: flex; gap: 12px; }
    .half { flex: 1; min-width: 0; }

    label { font-size: 13px; font-weight: 700; color: #374151; }
    
    .form-control { 
      background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 14px 16px; 
      font-size: 15px; font-family: 'Rethink Sans', sans-serif; color: #111; outline: none; 
      transition: 0.2s; width: 100%; box-sizing: border-box;
    }
    .form-control::placeholder { color: #9CA3AF; }
    .form-control:focus { 
      border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(0,175,108,0.1); 
    }

    .input-wrap { position: relative; display: flex; align-items: center;  }
    .input-wrap .select-flag { padding-left: 48px; }

    .flag { position: absolute; left: 16px; font-size: 18px; pointer-events: none; }

    .agreements { margin-top: 8px; margin-bottom: 8px; }
    .cb-container {
      display: flex; position: relative; padding-left: 28px; cursor: pointer; 
      font-size: 13px; line-height: 1.4; color: #4B5563; user-select: none; align-items: flex-start;
    }
    .cb-container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
    .checkmark {
      position: absolute; top: 2px; left: 0; height: 18px; width: 18px; 
      background-color: #fff; border: 1px solid #D1D5DB; border-radius: 4px; transition: 0.2s;
    }
    .cb-container input:checked ~ .checkmark { 
      background-color: var(--primary-color); border-color: var(--primary-color); 
    }
    .checkmark:after { content: ""; position: absolute; display: none; }
    .cb-container input:checked ~ .checkmark:after { display: block; }
    .cb-container .checkmark:after {
      left: 6px; top: 2px; width: 4px; height: 10px; border: solid white; 
      border-width: 0 2px 2px 0; transform: rotate(45deg);
    }
    .cb-container a { color: var(--primary-color); text-decoration: underline; font-weight: 600;}
    .cb-container p { margin: 0; }
    .mt-15 { margin-top: 16px; }

    .submit-btn { 
      margin-top: 16px;  color: #FFF; 
      border: none; padding: 16px; border-radius: 24px; font-weight: 800; font-size: 16px; 
      font-family: 'Rethink Sans', sans-serif; cursor: pointer; transition: 0.2s; 
      background: var(--primary-color); 
    }
    .submit-btn:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; }

    /* Success Section */
    .success-section {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; margin-top: 60px; 
    }
    .success-icon {
      background: var(--primary-color); width: 80px; height: 80px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      margin-bottom: 24px; box-shadow: 0 10px 25px rgba(0,175,108,0.3);
    }
    .success-title {
      font-size: 20px; color: #111; line-height: 1.4; margin: 0 0 16px 0; font-weight: 500;
    }
    .success-title strong {
      font-weight: 800; display: block; font-size: 24px;
    }
    .success-desc {
      font-size: 15px; color: #6B7280; line-height: 1.5; margin: 0 0 40px 0; max-width: 300px;
    }
  `]
})
export class AuthComponent {
  router = inject(Router);

  activeTab: 'login' | 'register' | 'success' = 'login';
  
  goBack() {
    if (this.activeTab === 'success') {
       this.activeTab = 'register';
    } else {
       this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.router.navigate(['/dashboard']);
  }
  oldOnLogin() {
    this.router.navigate(['/questionnaire']);
  }
  
  onRegister() {
    this.activeTab = 'success';
  }

  goToQuestionnaire() { this.router.navigate(['/questionnaire'], { queryParams: { start: 'true' } }); }
}

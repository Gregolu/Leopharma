const fs = require('fs');
const path = require('path');

const root = '/Users/gginer/Documents/Manuderma/Leo-Pharma/src/app';

const files = {
  '../styles.scss': `
@import url('https://fonts.cdnfonts.com/css/gilroy-bold');
@import url('https://fonts.cdnfonts.com/css/gilroy-regular');

:root {
  --primary-color: #204131;
  --secondary-color: #000000;
  --bg-color: #F5F5F5;
  --white: #FFFFFF;
}

body {
  margin: 0;
  padding: 0;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Gilroy-Regular', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Gilroy-Bold', sans-serif;
  color: var(--primary-color);
}

.mobile-container {
  width: 100%;
  max-width: 390px;
  height: 844px;
  background-color: var(--white);
  border-radius: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  padding-bottom: 80px;
}

.content-area.no-scroll {
  overflow: hidden !important;
}

.primary-btn {
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 20px;
  padding: 16px;
  width: 100%;
  font-family: 'Gilroy-Bold', sans-serif;
  font-size: 16px;
  cursor: pointer;
  margin-top: 24px;
  display: block;
  text-align: center;
  text-decoration: none;
}

.primary-btn:hover {
  opacity: 0.9;
}

.secondary-btn {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  padding: 16px;
  width: 100%;
  text-align: center;
  display: block;
  text-decoration: none;
  margin-top: 12px;
}

.card {
  background-color: var(--bg-color);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 16px;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Gilroy-Regular', sans-serif;
  box-sizing: border-box;
}

.nav-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--white);
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  padding: 12px 0 24px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  color: var(--secondary-color);
  text-decoration: none;
}
  `,
  'app.ts': `
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent],
  template: \`
    <div class="mobile-container">
      <router-outlet></router-outlet>
      <app-bottom-nav></app-bottom-nav>
    </div>
  \`
})
export class AppComponent {}
  `,
  'app.routes.ts': `
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireFlashComponent } from './pages/questionnaire-flash/questionnaire-flash.component';
import { PredispositionScoreComponent } from './pages/predisposition-score/predisposition-score.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'questionnaire-flash', component: QuestionnaireFlashComponent },
  { path: 'predisposition-score', component: PredispositionScoreComponent },
  { path: 'auth', component: AuthComponent }
];
  `,
  'components/bottom-nav/bottom-nav.component.ts': `
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <nav class="nav-bottom">
      <a routerLink="/home" class="nav-item">🏠 Home</a>
      <a routerLink="/auth" class="nav-item">👤 Login/Compte</a>
      <a href="#" class="nav-item">📄 Termes</a>
      <a href="#" class="nav-item">⚖️ Légales</a>
    </nav>
  \`
})
export class BottomNavComponent {}
  `,
  'pages/home/home.component.ts': `
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <div class="content-area">
      <h1>Eczéma des mains</h1>
      <p>L’eczéma des mains est une affection cutanée fréquente pouvant provoquer sécheresse, rougeurs et démangeaisons.</p>
      
      <div class="card" style="text-align: center; padding: 40px 20px;">
        <h3>Est-ce que cela pourrait concerner vos mains ?</h3>
        <p>Évaluez votre situation en quelques minutes.</p>
        <span style="font-size: 60px;">🤲</span>
        <button routerLink="/questionnaire-flash" class="primary-btn">Évaluer mon risque</button>
      </div>

      <div class="card">
        <h2>Commencer le bilan de mes mains</h2>
        <p>Commencez à surveiller la santé de vos mains grâce à des questionnaires et à un suivi personnalisé.</p>
        <button routerLink="/auth" class="primary-btn">Commencer mon bilan santé</button>
      </div>
    </div>
  \`
})
export class HomeComponent {}
  `,
  'pages/questionnaire-flash/questionnaire-flash.component.ts': `
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-questionnaire-flash',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <div class="content-area no-scroll">
      <h1>Questionnaire rapide</h1>
      <p>Répondez à quelques questions pour évaluer votre situation.</p>
      
      <div class="card">
        <p style="font-weight: bold;">1. Avez-vous des lésions uniquement sur les mains et les poignets ?</p>
        <div style="display: flex; gap: 10px;">
           <label><input type="radio" name="q1"> Oui</label>
           <label><input type="radio" name="q1"> Non</label>
        </div>
      </div>
      
      <!-- Normally full questions are here, truncating for brevity but keeping structure -->
      <div class="card">
        <p style="font-weight: bold;">... Autres questions ...</p>
      </div>

      <button routerLink="/predisposition-score" class="primary-btn" style="position: absolute; bottom: 100px; width: calc(100% - 48px);">Voir mon résultat</button>
    </div>
  \`
})
export class QuestionnaireFlashComponent {}
  `,
  'pages/predisposition-score/predisposition-score.component.ts': `
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-predisposition-score',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <div class="content-area">
      <h1>Résultat</h1>
      
      <div class="card" style="border-left: 6px solid #ff9800;">
        <h3 style="color: #ff9800;">Prédisposition possible</h3>
        <p>Vos réponses suggèrent certains signes pouvant correspondre à un eczéma des mains.</p>
      </div>

      <button routerLink="/auth" class="primary-btn">Compléter mon bilan santé</button>
      <a routerLink="/questionnaire-flash" class="secondary-btn">Refaire le questionnaire</a>
    </div>
  \`
})
export class PredispositionScoreComponent {}
  `,
  'pages/auth/auth.component.ts': `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="content-area">
      <div style="text-align: right; margin-bottom: 20px;">
        <select>
          <option>Français</option>
          <option>English</option>
          <option>Español</option>
          <option>Deutsch</option>
        </select>
      </div>
      
      <h1>Connexion</h1>
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
        <div class="form-group">
          <label>Adresse e-mail</label>
          <input type="email" formControlName="email" class="form-control">
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" formControlName="password" class="form-control">
        </div>
        <button type="submit" class="primary-btn">Se connecter</button>
      </form>

      <h2 style="margin-top: 40px;">Créer un compte</h2>
      <!-- Register form skeleton -->
      <form [formGroup]="registerForm" (ngSubmit)="onRegister()">
        <div class="form-group"><input type="text" placeholder="Nom" class="form-control"></div>
        <div class="form-group"><input type="text" placeholder="Prénom" class="form-control"></div>
        <div class="form-group"><input type="email" placeholder="Adresse e-mail" class="form-control"></div>
        <div class="form-group"><input type="password" placeholder="Mot de passe" class="form-control"></div>
        <button type="submit" class="primary-btn">Créer mon compte</button>
      </form>
    </div>
  \`
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({});
  }

  onLogin() {}
  onRegister() {}
}
  `
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
}
console.log('App successfully recreated.');

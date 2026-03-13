import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { PatientStateService } from '../../services/patient-state.service';
import { QUESTIONNAIRES } from '../../services/questionnaire-data';
import { Question, QuestionnaireState } from '../../models/question.model';

interface Marker {
  x: number;
  y: number;
  type: 'green' | 'orange' | 'red';
}

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="stepper-app-container" *ngIf="viewMode === 'list'">
      <!-- GREEN HEADER -->
      <div class="patient-header" [style.border-radius]="viewMode === 'list' ? '0' : '0 0 20px 20px'" style="padding-top:50px;">
        <div class="header-top" style="display:flex; justify-content: space-between; align-items: center; width: 100%; position: relative;">
          <button class="icon-btn" (click)="goBack()" style="background:none; border:none; color:white; padding:0; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <h1 class="header-title"  style="margin:0; font-size:20px; position:absolute; left:50%; transform:translateX(-50%); font-weight:700; width:max-content;">Mes bilans santé</h1>
          <div class="header-actions" style="display:flex; gap:16px;">
            
            <div class="notification-icon" style="position:relative; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer;" (click)="goToRoute('/notifications')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <div class="profile-icon" style="background:white; color:#00af6c; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer;" (click)="goToRoute('/profile')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>

          </div>
        </div>
      <div class="header-intro" style="padding: 24px 20px; color: white; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px;">
        <p style="margin: 0; font-size: 16px; opacity: 0.9;">Complétez votre dossier patient pour obtenir votre suivi.</p>
        <button (click)="goToStep(0)" style="background: white; color: #00af6c; border: none; padding: 12px 24px; border-radius: 24px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;">Mettre à jour mon dossier <span style="font-size: 18px;">➔</span></button>
      </div>
    </div>
      
      
      
      <main class="question-list-view" style="padding: 0; background: #F9FAFB; padding-bottom: 20px; position:relative; z-index:20; margin-top:-20px; border-radius: 20px 20px 0 0; overflow:hidden;">
        <div class="accordion-header" (click)="isListOpen = !isListOpen" style="background: black; color: white; display:flex; justify-content: space-between; align-items:center; padding: 16px 20px; font-weight: bold; font-size: 15px; text-transform: uppercase;">
          <span>Analyse</span>
          <svg [class.open]="isListOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div class="accordion-body" *ngIf="isListOpen" style="padding: 8px 16px 8px 16px;">
          <!-- Using a wrapper for all questionnaires -->
          <div class="items-wrapper" style="background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; padding: 4px 12px;">
            <div class="list-item" *ngFor="let step of getAllSteps(); let last = last" (click)="handleStepClick(step)" [style.border-bottom]="last ? 'none' : '1px solid #f1f1f1'">
              <div class="item-icon-wrap" style="display:flex; align-items:center; color: #2c5e53;">
                <div [ngClass]="isAnswered(step.index) ? 'green-dot' : 'red-dot'"></div>
                <ng-container [ngSwitch]="step.id">
                  <svg *ngSwitchCase="'photo'" style="margin-left: 12px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  <svg *ngSwitchCase="'scan'" style="margin-left: 12px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>
                  <svg *ngSwitchDefault style="margin-left: 12px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </ng-container>
              </div>
              <div class="item-content" style="flex:1; margin-left: 12px;">
                <h3 style="font-size: 14px; margin: 0; color: #333; font-weight: 500;">{{ step.title }}</h3>
              </div>
              <div class="item-arrow" style="display:flex; align-items:center; justify-content:center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div style="height: 1px; background: #e0e0e0; margin: 24px 20px;"></div>
        <div class="clinical-studies-section">
          
          <div class="list-section" style="padding: 0 20px; display:flex; flex-direction:column; gap:12px;">
            <div class="list-item clinical-item" (click)="goToRoute('/clinical-study')" style="background:white; border-radius:16px; padding:16px; display:flex; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,0.05); gap: 16px;">
              <div class="item-icon-wrap">
                <div style="width:10px; height:10px; border-radius:50%; background:#d8839d;"></div></div><div class="item-content" style="flex:1;"><h3 style="margin:0; font-size:15px; font-weight:800; color:#333; margin-bottom:4px;">Suivi thérapeutique</h3>
                <p style="margin:0; font-size:13px; color:#666;">Biothérapie (ex: Dupilumab)</p>
              </div>
              <div class="item-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" style="cursor:pointer;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
            </div>

            <div class="list-item clinical-item" (click)="goToRoute('/clinical-study')" style="background:white; border-radius:16px; padding:16px; display:flex; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,0.05); gap: 16px;">
              <div class="item-icon-wrap">
                <div style="width:10px; height:10px; border-radius:50%; background:#ff9500;"></div></div><div class="item-content" style="flex:1;"><h3 style="margin:0; font-size:15px; font-weight:800; color:#333; margin-bottom:4px;">Étude clinique</h3>
                <p style="margin:0; font-size:13px; color:#666;">Étude Atopia-CARE</p>
              </div>
              <div class="item-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" style="cursor:pointer;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 32px 24px;">
          <button (click)="goToDossier()" style="width: 100%; padding: 16px; border-radius: 12px; background: #00af6c; color: white; border: none; font-weight: bold; font-size: 16px; cursor: pointer;">Voir mon dossier patient</button>
        </div>
      </main>


    </div>
  
<div class="stepper-app-container" *ngIf="viewMode === 'step'">
      <!-- GREEN HEADER -->
      <div class="patient-header">
        <div class="header-top">
          <button class="icon-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <h1 class="header-title">Mon bilan santé</h1>
          <button class="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>
        
        <div class="date-badge">
          {{ currentDate | date:'dd/MM/yyyy' }}
        </div>
      </div>

      <!-- STEPPER DASHES -->
      <div class="dash-stepper">
        <div *ngFor="let dim of getDashesArray(); let i = index" 
             class="dash" 
             [class.active]="i === currentStep"
             [class.completed]="i < currentStep">
        </div>
      </div>

      <!-- STEP BUBBLE -->
      <div class="step-bubble">
        {{ currentStep + 1 }}/{{ totalSteps }}
      </div>

      <!-- NAV ROW -->
      <div class="nav-row" style="position: relative; z-index: 10;">
        <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: -1; pointer-events: none;">
          <img src="/assets/images/icone-manuderma@2x.png" width="70" alt="background-logo">
        </div>
        <button class="nav-btn prev" [style.visibility]="currentStep > 0 ? 'visible' : 'hidden'" (click)="prev()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Précédent</span>
        </button>
        <h2 class="question-theme" style="text-align: center; flex: 1; margin: 0 10px; line-height: 1.25; font-size: 18px; max-width: 60%; word-break: break-word;">
          {{ getAllSteps()[currentStep]?.title || 'Questionnaire' }}
        </h2>
        <button class="nav-btn next" [style.visibility]="currentStep < totalSteps - 1 ? 'visible' : 'hidden'" (click)="next()">
            <span>Suivant</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </button>
      </div>

      <!-- STEP 1: PHOTO ANALYSIS OVERRIDE -->
      <main class="question-content" *ngIf="currentStep === 0">

        <div class="q-title-wrap" style="margin-bottom: 20px;">
            <div class="q-text" style="border:none; font-family: 'Rethink Sans', sans-serif;">Veuillez prendre en photo les 4 zones de vos mains.</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 16px;">
          <!-- RIGHT FRONT -->
          <div style="background: white; border-radius: 16px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 8px;">Main droite <span style="font-weight: 400; color: #666;">(Avant)</span></div>
            <div style="width: 100%; aspect-ratio: 1; border: 2px dashed #EAEAEA; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
               <input type="file" accept="image/*" capture="environment" style="position: absolute; width: 100%; height: 100%; opacity: 0; z-index: 5;" (change)="onFile0($event, 'RF')">
               <div *ngIf="!photos['RF']" style="display:flex; flex-direction:column; align-items:center;">
                  <svg width="24" height="24" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
               </div>
               <img *ngIf="photos['RF']" [src]="photos['RF']" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
            </div>
          </div>
          <!-- RIGHT BACK -->
          <div style="background: white; border-radius: 16px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 8px;">Main droite <span style="font-weight: 400; color: #666;">(Arrière)</span></div>
            <div style="width: 100%; aspect-ratio: 1; border: 2px dashed #EAEAEA; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
               <input type="file" accept="image/*" capture="environment" style="position: absolute; width: 100%; height: 100%; opacity: 0; z-index: 5;" (change)="onFile0($event, 'RB')">
               <div *ngIf="!photos['RB']" style="display:flex; flex-direction:column; align-items:center;">
                  <svg width="24" height="24" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
               </div>
               <img *ngIf="photos['RB']" [src]="photos['RB']" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
            </div>
          </div>
          <!-- LEFT FRONT -->
          <div style="background: white; border-radius: 16px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 8px;">Main gauche <span style="font-weight: 400; color: #666;">(Avant)</span></div>
            <div style="width: 100%; aspect-ratio: 1; border: 2px dashed #EAEAEA; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
               <input type="file" accept="image/*" capture="environment" style="position: absolute; width: 100%; height: 100%; opacity: 0; z-index: 5;" (change)="onFile0($event, 'LF')">
               <div *ngIf="!photos['LF']" style="display:flex; flex-direction:column; align-items:center;">
                  <svg width="24" height="24" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
               </div>
               <img *ngIf="photos['LF']" [src]="photos['LF']" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
            </div>
          </div>
          <!-- LEFT BACK -->
          <div style="background: white; border-radius: 16px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 8px;">Main gauche <span style="font-weight: 400; color: #666;">(Arrière)</span></div>
            <div style="width: 100%; aspect-ratio: 1; border: 2px dashed #EAEAEA; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
               <input type="file" accept="image/*" capture="environment" style="position: absolute; width: 100%; height: 100%; opacity: 0; z-index: 5;" (change)="onFile0($event, 'LB')">
               <div *ngIf="!photos['LB']" style="display:flex; flex-direction:column; align-items:center;">
                  <svg width="24" height="24" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
               </div>
               <img *ngIf="photos['LB']" [src]="photos['LB']" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
            </div>
          </div>
        </div>
      </main>

      
      <!-- STEP 1: SCANNER PRODUITS (STEP 1) -->
      <main class="question-content" *ngIf="currentStep === 1">
        <div *ngIf="scannerState === 'scan'" class="photo-capture-view">
          <div class="q-title-wrap">
            <div class="q-text" style="border:none; text-align:center;">Veuillez scanner le code barre d'un produit (ménager, cosmétique...) pour analyser la présence d'allergènes.</div>
          </div>
          
          <div class="camera-simulation">
            <div class="camera-frame">
              <img src="/assets/images/questionnaire2-produit.png" alt="Scan produit" style="width: 100%; height: 100%; object-fit: cover; pointer-events:none;">
              <div class="scan-line red-scan"></div>
            </div>
            <button class="capture-btn scan-btn" (click)="scanProduct()">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" /><path d="M7 12h10" /></svg>
            </button>
            <p style="color:white; margin-top:20px; font-size:12px;">Appuyez pour scanner</p>
          </div>
        </div>

        <div *ngIf="scannerState === 'result'" class="photo-analyze-view" style="width: 100%">
          
          <div class="modern-result-card">
            <div class="mrc-header">
              <div class="mrc-risk-badge">
                <span class="mrc-risk-icon">⚠️</span> SCORE : 89/100 - RISQUE ÉLEVÉ
              </div>
            </div>
            
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

              <div class="mrc-divider"></div>

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
          
          <button class="action-btn-styled" style="margin-top: 20px; font-family: 'Rethink Sans', sans-serif; font-weight: 700;" (click)="scanNewProduct()">
            Scanner un nouveau produit
          </button>
        </div>
      </main>

      <!-- STANDARD QUESTIONS (STEP > 1) -->
      <main class="question-content" *ngIf="currentStep > 1 && currentQuestionnaireQuestions.length > 0" style="padding-bottom:100px; display:flex; flex-direction:column; gap:20px;">
        <div class="question-block" *ngFor="let q of currentQuestionnaireQuestions; let i = index" style="background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <h3 style="margin-top:0; margin-bottom:16px; font-size:16px; color:#111;">{{i + 1}}. {{ q.text }}</h3>
            <div class="options-row" style="display:flex; flex-wrap:wrap; gap:10px;">
              <button 
                *ngFor="let opt of q.options"
                class="option-pill"
                [class.selected]="currentAnswers[q.id] === opt"
                (click)="selectAnswer(q.id, opt)"
                style="background: #f4f6f5; border: 1px solid transparent; padding: 10px 16px; border-radius: 20px; font-weight: 500; font-size: 14px; cursor: pointer; color: #333; transition: all 0.2s;">
                {{ opt }}
              </button>
            </div>
        </div>
      </main>

      <!-- BOTTOM ACTION -->
      <div class="bottom-action">
        <button *ngIf="!((currentStep === 1 && scannerState === 'scan'))"
          class="primary-btn save-btn" 
          (click)="currentStep === totalSteps - 1 ? validate() : next()">
          {{ currentStep === totalSteps - 1 ? 'Valider le bilan' : 'Sauvegarder et passer à la suite' }}
        </button>
      </div>
    </div>
  `,
  styles: [`

    .question-list-view {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .question-list-view.has-padding { padding: 24px; gap: 16px; }
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
    .green-dot { width: 12px; height: 12px; border-radius: 50%;
      background-color: #4CAF50;
    }
    .red-dot { width: 12px; height: 12px; border-radius: 50%;
      background-color: #F44336;
    }
    .item-content {
      flex: 1;
    }
    
    .option-pill.selected {
      background: rgba(0, 175, 108, 0.1) !important;
      border-color: #00af6c !important;
      color: #00af6c !important;
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
    .accordion-header {
      background: #111;
      color: #FFF;
      padding: 16px 20px;
      font-family: 'Rethink Sans', sans-serif;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border-radius: 0;
      margin-bottom: 0;
    }
    .accordion-header svg {
      transition: transform 0.3s ease;
    }
    .accordion-header svg.open {
      transform: rotate(180deg);
    }
    .accordion-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .list-item {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-radius: 12px;
      background: white;
      cursor: pointer;
    }
    .accordion-header {
      background: #111;
      color: #FFF;
      padding: 16px 20px;
      font-family: 'Rethink Sans', sans-serif;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border-radius: 0;
      margin-bottom: 0;
    }
    .accordion-header svg {
      transition: transform 0.3s ease;
    }
    .accordion-header svg.open {
      transform: rotate(180deg);
    }
    .accordion-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .list-item {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-radius: 12px;
      background: white;
      cursor: pointer;
    }
  

    .stepper-app-container {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background-color: #ffffff;
      box-sizing: border-box;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
    }

    .patient-header {
      background-color: var(--primary-color, #00af6c); 
      padding: 24px 24px 34px 24px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0 0 20px 20px;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-title {
      color: white;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }

    .date-badge {
      position: absolute;
      bottom: -20px;
      background: white;
      color: #3f4756;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 14px;
      padding: 12px 36px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      border: 1px solid #f1f1f1;
    }

    .dash-stepper {
      display: flex;
      gap: 6px;
      justify-content: center;
      margin: 45px 24px 10px 24px;
    }

    .dash {
      height: 6px;
      flex: 1;
      max-width: 35px;
      background: #D1E5DA;
      border-radius: 4px;
      transition: background 0.3s;
    }

    .dash.active, .dash.completed {
      background: var(--primary-color, #00af6c);
      opacity: 1;
    }

    .step-bubble {
      margin: 10px auto;
      border: 1px solid #e1ebe7;
      border-radius: 20px;
      padding: 6px 20px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      color: var(--primary-color, #00af6c);
      font-size: 16px;
      background: white;
      width: fit-content;
      box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    }

    .nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px 24px 20px;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 14px;
      color: #3f4756;
      cursor: pointer;
      padding: 4px;
    }
    
    .nav-btn.next { color: var(--primary-color, #00af6c); }

    .question-theme {
      font-size: 18px;
      color: var(--primary-color, #00af6c);
      margin: 0;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
    }

    .question-content {
      flex: 1;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
    }

    .q-title-wrap {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 20px;
    }

    .q-text {
      font-size: 16px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      color: var(--primary-color, #00af6c);
      line-height: 1.4;
      border-bottom: 3px solid #f1f1f1;
      padding-bottom: 6px;
      width: 100%;
      text-align: center;
    }

    .instruction-text {
      font-size: 13px;
      color: #666;
      margin: 0 0 10px 0;
      text-align: center;
    }

    .options-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }

    .action-btn-styled {
      width: 100%;
      background-color: white;
      border: 1px solid #EAEAEA;
      border-radius: 20px;
      padding: 16px;
      font-size: 16px;
      color: var(--primary-color, #00af6c);
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      transition: all 0.2s;
    }
    
    .action-btn-styled.selected, .action-btn-styled:active {
      background-color: #f0f7f5;
      color: var(--primary-color, #00af6c);
      border-color: var(--primary-color, #00af6c);
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
    }

    .bottom-action {
      margin-top: auto;
      padding: 20px 24px 40px 24px;
      background: white;
    }

    .save-btn {
      width: 100%;
      background-color: var(--primary-color, #00af6c);
      border-radius: 30px;
      padding: 18px;
      color: white;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 16px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(32,65,49,0.3);
    }

    
    .scan-line.red-scan {
      background: rgba(231, 76, 60, 0.5);
      box-shadow: 0 0 10px rgba(231, 76, 60, 1);
    }
    .allergen-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      margin-top: 10px;
    }
    .allergen-card {
      background: white;
      border: 1px solid #EAEAEA;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .al-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .al-name {
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      font-size: 16px;
      color: var(--primary-color, #00af6c);
    }
    .al-score {
      font-size: 12px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
    }
    .al-expo {
      font-size: 13px;
      color: #666;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
    }
    .al-risk {
      font-size: 14px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      margin-top: 4px;
    }

    /* ---- PHOTO SIMULATION CSS ---- */
    .photo-capture-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      padding-bottom: 0;
    }
    .camera-simulation {
      flex: 1;
      width: 100%;
      background: #111;
      border-radius: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 20px; position:relative; z-index:20; margin-top:-20px; border-radius: 20px 20px 0 0; overflow:hidden;
      overflow: hidden;
      margin-bottom: 10px;
      min-height: 380px;
    }
    .camera-frame {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ghost-hand {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.2;
      filter: grayscale(100%) blur(2px);
    }
    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(46, 204, 113, 0.5);
      box-shadow: 0 0 10px rgba(46, 204, 113, 1);
      animation: scan 3s infinite linear;
    }
    @keyframes scan {
      0% { top: 10%; }
      50% { top: 90%; }
      100% { top: 10%; }
    }
    .capture-btn {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: white;
      border: 4px solid #dddddd;
      z-index: 10;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
    }

    /* ---- SYNTHESIS CSS ---- */
    .photo-analyze-view {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .score-panel {
      background: #f0f7f5;
      border: 1px solid var(--primary-color, #00af6c);
      border-radius: 16px;
      padding: 12px 24px;
      text-align: center;
      margin-bottom: 16px;
      width: 80%;
    }
    .score-title {
      font-size: 14px;
      color: #666;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
    }
    .score-value {
      font-size: 28px;
      color: #2ECC71;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
    }
    .score-value.warning {
      color: #E74C3C;
    }

    .toolbar {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      width: 100%;
      justify-content: center;
    }
    .tool-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: white;
      border: 1px solid #EAEAEA;
      border-radius: 12px;
      padding: 10px 5px;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .green-dot { width: 12px; height: 12px; border-radius: 50%; background: #2ECC71; }
    .orange-dot { background: #F39C12; }
    .red-dot { width: 12px; height: 12px; border-radius: 50%; background: #E74C3C; }

    .tool-btn.active { border-width: 2px; }
    .green-btn.active { border-color: #2ECC71; background: rgba(46,204,113,0.1); }
    .orange-btn.active { border-color: #F39C12; background: rgba(243,156,18,0.1); }
    .red-btn.active { border-color: #E74C3C; background: rgba(231,76,60,0.1); }

    .image-map-container {
      position: relative;
      width: 100%;
      max-width: 320px;
      height: 380px;
      background: #fdfdfd;
      border: 1px dashed #ccc;
      border-radius: 16px;
      overflow: hidden;
      cursor: crosshair;
    }
    .analyzed-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
    }
    .marker-point {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      border: 2px solid white;
      transition: transform 0.2s;
      cursor: pointer;
    }
    .marker-point:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }
    .marker-green { background: #2ECC71; }
    .marker-orange { background: #F39C12; }
    .marker-red { background: #E74C3C; }

    .map-hint {
      position: absolute;
      bottom: 10px;
      left: 0; right: 0;
      text-align: center;
      font-size: 11px;
      color: #999;
      pointer-events: none;
    }

    .modern-result-card {
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
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
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
      gap: 16px;
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
      color: var(--primary-color, #00af6c);
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      font-size: 18px;
      line-height: 1.2;
    }
    .mrc-brand {
      margin: 0;
      color: #666;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 14px;
    }
    .mrc-divider {
      height: 1px;
      background: #EAEAEA;
      margin: 20px 0;
      width: 100%;
    }
    .mrc-allergens-section {
      display: flex;
      flex-direction: column;
      text-align: left;
      width: 100%;
    }
    .mrc-section-title {
      margin: 0 0 16px 0;
      color: #111;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
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
      background: #F8FAF9;
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
      color: #111;
      font-family: 'Rethink Sans', sans-serif; font-weight: 700;
      font-size: 15px;
    }
    .mrc-allergen-gravity {
      color: #666;
      font-family: 'Rethink Sans', sans-serif; font-weight: 500;
      font-size: 12px;
      margin-top: 2px;
    }
  `]
})
export class QuestionnaireComponent implements OnInit {
  goToRoute(path: string) { this.router.navigateByUrl(path); }

  questions: Question[] = [];
  state!: QuestionnaireState;
  stateService = inject(PatientStateService);
  
  viewMode: 'list' | 'step' = 'list';
  currentStep = 0;
  totalSteps = 9;
  currentDate = new Date();
  location = inject(Location);

  // Photo Analysis State for Step 1
  photoState: 'capture' | 'analyze' = 'capture';
  selectedColor: 'green' | 'orange' | 'red' = 'green';
  markers: Marker[] = [];
  scannerState: 'scan' | 'result' = 'scan';

  photos: { [key: string]: string | null } = {
    'RF': null, 'RB': null, 'LF': null, 'LB': null
  };

  onFile0(event: Event, zone: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => { this.photos[zone] = e.target?.result as string; };
      reader.readAsDataURL(input.files[0]);
    }
  }

  currentQuestionnaireQuestions: any[] = [];
  currentAnswers: Record<string, any> = {};
  
  constructor(
    private qService: QuestionnaireService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['start'] || params['step']) {
        this.viewMode = 'step';
        this.currentStep = params['step'] ? parseInt(params['step'], 10) : 0;
      }
    });

    this.totalSteps = this.getAllSteps().length;
    this.qService.state$.subscribe(s => this.state = s);
    
    if (this.currentStep >= 2) {
       this.loadCurrentQuestionnaire();
    }

    if (this.markers.length > 0) {
      this.photoState = 'analyze';
    }
  }

  get currentQuestion(): Question | undefined {
    if (this.questions.length === 0) return undefined;
    if (this.currentStep > 1 && this.questions.length >= this.currentStep - 1) {
        return this.questions[this.currentStep - 2];
    }
    return this.questions[this.currentStep];
  }

  getDashesArray() {
    return new Array(this.totalSteps);
  }

  goBack() {
    if (this.viewMode === 'step') {
      this.viewMode = 'list';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  goToDossier() {
    this.router.navigate(['/dossier']);
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      if (this.currentStep >= 2) this.loadCurrentQuestionnaire();
    }
  }

  loadCurrentQuestionnaire() {
    this.currentAnswers = {};
    const stepDef = this.getAllSteps()[this.currentStep];
    if (stepDef && stepDef.id && (QUESTIONNAIRES as any)[stepDef.id]) {
       this.currentQuestionnaireQuestions = (QUESTIONNAIRES as any)[stepDef.id];
    } else {
       this.currentQuestionnaireQuestions = [];
    }
  }

  saveCurrentAnswers() {
    if (this.currentStep >= 2) {
       const stepDef = this.getAllSteps()[this.currentStep];
       if (stepDef && stepDef.id && Object.keys(this.currentAnswers).length > 0) {
          this.stateService.addQuestionnaireInstance(stepDef.id, this.currentAnswers);
       }
    }
  }

  next() {
    this.saveCurrentAnswers();
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      if (this.currentStep >= 2) {
         this.loadCurrentQuestionnaire();
      }
    }
  }

  selectAnswer(qId: string | number, opt: string) {
    if (Array.isArray(this.currentAnswers[qId])) {
       const idx = this.currentAnswers[qId].indexOf(opt);
       if (idx > -1) this.currentAnswers[qId].splice(idx, 1);
       else this.currentAnswers[qId].push(opt);
    } else {
       this.currentAnswers[qId] = opt;
    }
  }

  /* PHOTO METHODS */
  takePhoto() {
    this.photoState = 'analyze';
  }

  retakePhoto() {
    this.photoState = 'capture';
    this.markers = [];
  }

  scanProduct() {
    this.scannerState = 'result';
  }

  scanNewProduct() {
    this.scannerState = 'scan';
  }

  
  isListOpen = true;

  getAllSteps() {
    return [
      { id: 'photo', title: 'Analyse par photo', type: 'internal', index: 0 },
      { id: 'scan', title: 'Scan Produit', type: 'internal', index: 1 },
      { id: 'anamnese', title: 'Anamnèse et histoire de la maladie', type: 'external', index: 2 },
      { id: 'exposition', title: 'Exposition et facteurs aggravants', type: 'external', index: 3 },
      { id: 'symptomes', title: 'Symptômes actuels et localisation', type: 'external', index: 4 },
      { id: 'impact', title: 'Impact fonctionnel des mains', type: 'external', index: 5 },
      { id: 'qvt', title: 'Qualité de vie émotionnelle', type: 'external', index: 6 },
      { id: 'stigmatisation', title: 'Stigmatisation', type: 'external', index: 7 },
      { id: 'traitement', title: 'Traitement et prise en charge', type: 'external', index: 8 }
    ];
  }

  handleStepClick(step: any) {
    this.goToStep(step.index);
  }

  goToStep(index: number) {
    this.currentStep = index;
    if (this.currentStep >= 2) {
       this.loadCurrentQuestionnaire();
       // Also load existing answers if they exist!
       const stepDef = this.getAllSteps()[this.currentStep];
       const pState = this.stateService.stateSubject.getValue();
       if (stepDef && pState.questionnaires && pState.questionnaires[stepDef.id] && pState.questionnaires[stepDef.id].length > 0) {
          // Pre-fill answers from the most recent submission if user is editing
          this.currentAnswers = JSON.parse(JSON.stringify(pState.questionnaires[stepDef.id][0].answers));
       }
    }
    this.viewMode = 'step';
  }

  isAnswered(stepIndex: number): boolean {
    const step = this.getAllSteps()[stepIndex];
    if (!step) return false;
    
    const pState = this.stateService.stateSubject.getValue();
    if (pState.questionnaires && pState.questionnaires[step.id] && pState.questionnaires[step.id].length > 0) {
       return true;
    }

    if (stepIndex === 0) return this.markers && this.markers.length > 0;
    if (stepIndex === 1) return this.scannerState === 'result';
    return false;
  }

  get healthScore(): number {
    let score = 100;
    for (const m of this.markers) {
      if (m.type === 'orange') score -= 10;
      if (m.type === 'red') score -= 25;
    }
    return Math.max(0, score);
  }

  addMarker(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    this.markers.push({ x, y, type: this.selectedColor });
  }

  removeMarker(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.markers.splice(index, 1);
  }

  /* STANDARD QUESTION METHODS */
  isSelected(q: Question, optionId: string): boolean {
    const ans = this.state.answers[q.id];
    if (q.type === 'single') return ans === optionId;
    return Array.isArray(ans) && ans.includes(optionId);
  }

  toggleOption(q: Question, optionId: string) {
    if (q.type === 'single') {
      this.qService.saveAnswer(q.id, optionId);
    } else {
      const ans = this.state.answers[q.id];
      let currentArr = Array.isArray(ans) ? [...ans] : [];
      const index = currentArr.indexOf(optionId);
      
      if (index === -1) {
        currentArr.push(optionId);
      } else {
        currentArr.splice(index, 1);
      }
      this.qService.saveAnswer(q.id, currentArr);
    }
  }

  validate() {
    this.saveCurrentAnswers();
    this.qService.calculateScore();
    this.router.navigate(['/confirmation']);
  }
}

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientStateService, QuestionnaireInstance } from '../../services/patient-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionnaire-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qd-container">
      <header class="app-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="header-title">{{ getTitle() }}</div>
        <div style="width:24px;"></div>
      </header>

      <div class="q-content" *ngIf="history.length > 0; else noData">
        
        <div class="header-actions">
           <div class="current-date">Analyse du {{ currentDate }}</div>
           <button class="update-btn" (click)="createNewInstance()">
             Mettre à jour
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           </button>
        </div>

        <div class="questions-list">
          <div class="question-block" *ngFor="let q of getQuestions(); let i = index">
            <h3>{{i + 1}}. {{ q.text }}</h3>
            <div class="options-row">
              <button 
                *ngFor="let opt of q.options"
                class="option-pill"
                [class.selected]="currentAnswers[q.id] === opt"
                (click)="selectAnswer(q.id, opt)">
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="hasChanges" style="margin:24px 0;">
          <button class="primary-btn" (click)="saveChanges()">
            Enregistrer les modifications
          </button>
        </div>

        <div class="historization-section">
          <h2>Historique</h2>
          <div class="history-list">
            <div class="history-item-wrap" *ngFor="let inst of history">
              <button 
                class="history-item" 
                [class.active]="inst.id === currentInstanceId"
                (click)="viewInstance(inst.id)">
                <span>{{ inst.date }}</span>
                <svg *ngIf="inst.id === currentInstanceId" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </button>
              <button class="edit-icon" *ngIf="inst.id === currentInstanceId" (click)="triggerEdit()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ng-template #noData>
         <div class="q-content empty-state">
            <p style="color:#666; margin-bottom:20px; font-size: 15px;">Aucun historique trouvé pour le moment.</p>
            <button class="primary-btn" (click)="createNewInstance()">Créer ma première analyse</button>
         </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .qd-container { 
      background: #F4F6F5;
      min-height: 100vh; 
      font-family: 'Rethink Sans', sans-serif; 
      display: flex; flex-direction: column; 
    }
    
    .app-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 60px 20px 50px;
      background: #00af6c;
    }
    
    .back-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: white; margin-left: -4px;}
    
    .header-title { font-weight: 800; font-size: 1.1rem; color: white; flex:1; text-align:center; }
    
    .q-content { padding: 24px 20px 40px; flex: 1; display: flex; flex-direction: column; border-radius: 24px 24px 0 0; background: #F4F6F5; margin-top: -24px; position:relative; z-index:10; }
    
    .header-actions {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 24px;
      background: white;
      padding: 16px 20px;
      border-radius: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }
    
    .current-date { 
      font-size: 14px; 
      color: #111;
      font-weight: 800;
    }
    
    .update-btn {
      background: rgba(0, 175, 108, 0.1); 
      color: #00af6c;
      border: none; border-radius: 20px; padding: 8px 14px; font-weight: 800; font-size: 12px;
      display:flex; align-items:center; gap: 6px; cursor: pointer; transition: 0.2s;
    }
    .update-btn:active { background: rgba(0, 175, 108, 0.2); }

    .question-block {
      background: white;
      padding: 20px;
      border-radius: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }
    .question-block h3 { margin: 0 0 16px 0; font-size: 15px; color: #111; line-height: 1.4; font-weight: 700; }
    
    .options-row { display: flex; flex-wrap: wrap; gap: 8px; }
    
    .option-pill {
      background: #F4F5F7;
      border: 1px solid transparent;
      padding: 10px 16px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 700;
      color: #555;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .option-pill.selected {
      background: #00af6c;
      color: white;
      border-color: #00af6c;
      box-shadow: 0 4px 8px rgba(0,175,108,0.2);
    }

    .primary-btn {
      background: #00af6c;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 15px;
      width: 100%;
      cursor: pointer;
      transition: 0.2s;
      font-family: inherit;
    }
    .primary-btn:active { transform: scale(0.98); }

    .historization-section {
      margin-top: 32px;
    }
    .historization-section h2 {
      font-size: 18px; color: #111; font-weight: 800; margin-bottom: 16px;
    }
    
    .history-list { display: flex; flex-direction: column; gap: 10px; }
    
    .history-item-wrap {
      display: flex; align-items: center; position: relative; width: 100%;
    }
    
    .history-item {
      background: white;
      border: 1px solid #E5E7EB;
      color: #555;
      padding: 14px 20px;
      border-radius: 16px;
      width: 100%;
      font-weight: 700;
      font-size: 14px;
      font-family: inherit;
      display: flex; justify-content: space-between; align-items: center;
      cursor: pointer;
      transition: 0.2s;
    }
    .history-item.active {
      border-color: #00af6c;
      color: #00af6c;
      background: rgba(0, 175, 108, 0.05);
      box-shadow: 0 2px 8px rgba(0,175,108,0.1);
    }

    .edit-icon {
      background: none; border: none; padding: 12px; margin-left: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 50%;
    }
    .edit-icon:active { background: rgba(0,0,0,0.05); }
    
    .empty-state {
      justify-content: center; align-items: center; flex: 1; text-align: center;
    }
  `]
})
export class QuestionnaireDetailComponent implements OnInit, OnDestroy {
  type: string = 'photo';
  location = inject(Location);
  route = inject(ActivatedRoute);
  stateService = inject(PatientStateService);
  
  history: QuestionnaireInstance[] = [];
  currentInstanceId: string = '';
  currentDate: string = '';
  currentAnswers: Record<number, any> = {};
  
  originalAnswers: Record<number, any> = {};
  hasChanges = false;
  isEditMode = true;

  sub!: Subscription;
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('id') || 'photo';
      this.loadState();
    });
  }

  loadState() {
     this.sub = this.stateService.state$.subscribe(state => {
      this.history = state.questionnaires[this.type] || [];
      if (this.history.length > 0 && !this.currentInstanceId) {
        this.viewInstance(this.history[0].id);
      } else if (this.history.length > 0 && this.currentInstanceId) {
        const inst = this.history.find(h => h.id === this.currentInstanceId);
        if (inst) {
          this.currentDate = inst.date;
          this.currentAnswers = JSON.parse(JSON.stringify(inst.answers));
          this.originalAnswers = JSON.parse(JSON.stringify(inst.answers));
          this.hasChanges = false;
        } else {
            this.viewInstance(this.history[0].id);
        }
      }
    });

    const st = this.stateService.stateSubject.getValue();
    if(st && (!this.history || this.history.length === 0)) {
        this.history = st.questionnaires[this.type] || [];
        if (this.history.length > 0) this.viewInstance(this.history[0].id);
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  getTitle() {
    if (this.type === 'photo') return 'Analyse par photo';
    if (this.type === 'scan') return 'Scan produit';
    if (this.type === 'flash') return 'Questionnaire Flash';
    if (this.type === 'anamnese') return 'Anamnèse et histoire de la maladie';
    if (this.type === 'exposition') return 'Exposition et facteurs aggravants';
    if (this.type === 'symptomes') return 'Symptômes actuels et localisation';
    if (this.type === 'impact') return 'Impact fonctionnel des mains';
    if (this.type === 'qvt') return 'Qualité de vie émotionnelle';
    if (this.type === 'stigmatisation') return 'Stigmatisation';
    if (this.type === 'traitement') return 'Traitement et prise en charge';
    return `Questionnaire ${this.type.toUpperCase()}`;
  }

  getQuestions() {
    if (this.type === 'photo') {
       return [
         { id: 1, text: 'Constatez-vous des rougeurs plus importantes aujourd\'hui ?', options: ['Pas du tout', 'Un peu', 'Beaucoup'] },
         { id: 2, text: 'Ressentez-vous des démangeaisons intenses ?', options: ['Non', 'Modérées', 'Intenses'] },
         { id: 3, text: 'Avez-vous remarqué des squames (peaux mortes) ?', options: ['Aucune', 'Quelques-unes', 'Nombreuses'] },
         { id: 4, text: 'La zone lésée vous empêche-t-elle de dormir ?', options: ['Jamais', 'Parfois', 'Souvent'] }
       ];
    }
    if (this.type === 'anamnese') {
       return [
         { id: 1, text: 'Sur quelles zones de vos mains avez-vous des symptômes ?', options: ['Doigts', 'Bout des doigts', 'Dos de la main', 'Paume', 'Poignet'] },
         { id: 2, text: 'Quelle est votre main dominante ?', options: ['Droitier', 'Gaucher'] },
         { id: 3, text: 'Depuis combien de temps avez-vous ces symptômes ?', options: ['Moins de 3 mois', '3 à 12 mois', 'Plus d\'un an'] },
         { id: 4, text: 'Comment les symptômes sont-ils apparus ?', options: ['Progressivement (sur plusieurs semaines ou mois)', 'Brutalement'] },
         { id: 5, text: 'Les symptômes sont-ils apparus après un événement particulier ?', options: ['Travail', 'Changement de poste', 'Travaux à la maison', 'Nouveau produit utilisé', 'Aucun facteur identifié'] },
         { id: 6, text: 'Avez-vous déjà eu l\'une des maladies suivantes ?', options: ['Eczéma', 'Asthme', 'Rhinite allergique', 'Aucune'] },
         { id: 7, text: 'Si vous avez déjà eu de l\'eczéma, à quel âge est-il apparu ?', options: ['Petite enfance (< 2 ans)', 'Enfance (2 à 12 ans)', 'Adolescence', 'À l\'âge adulte'] },
         { id: 8, text: 'Combien de temps durent en moyenne vos poussées ?', options: ['1 à 2 jours', '3 à 4 jours', '5 à 7 jours', '1 à 2 semaines', 'Plus de 2 semaines'] },
         { id: 9, text: 'Avez-vous déjà eu de l\'eczéma ailleurs sur le corps ?', options: ['Plis des coudes', 'Plis des genoux', 'Visage', 'Cou', 'Aucune'] }
       ];
    }
    if (this.type === 'exposition') {
       return [
         { id: 1, text: 'Êtes-vous exposé régulièrement à des produits irritants ou chimiques ?', options: ['Oui au travail', 'Oui à la maison', 'Oui dans les deux', 'Non'] },
         { id: 2, text: 'Utilisez-vous régulièrement des gants ?', options: ['Latex', 'Vinyle', 'Nitrile', 'Autres gants', 'Aucun'] },
         { id: 3, text: 'À quelle fréquence vous lavez-vous les mains par jour ?', options: ['Moins de 5 fois', '5 à 10 fois', '10 à 20 fois', 'Plus de 20 fois'] },
         { id: 4, text: 'Fumez-vous ?', options: ['Oui', 'Non', 'Ancien fumeur'] },
         { id: 5, text: 'Si oui, combien de cigarettes par jour ?', options: ['Moins de 5', '5 à 10', 'Plus de 10'] }
       ];
    }
    if (this.type === 'symptomes') {
       return [
         { id: 1, text: 'Quel est le niveau de rougeur de votre peau ?', options: ['Pas du tout', 'Légère rougeur', 'Rougeur modérée', 'Rougeur intense'] },
         { id: 2, text: 'Quelle est l\'importance des squames (peau qui pèle) ?', options: ['Pas du tout', 'Fines squames', 'Squames importantes'] },
         { id: 3, text: 'Quel est le niveau de gonflement de la peau ?', options: ['Aucun', 'Léger', 'Modéré', 'Important'] },
         { id: 4, text: 'Avez-vous des petites cloques (vésicules) ?', options: ['Aucune', 'Quelques-unes', 'Plusieurs', 'Très nombreuses'] },
         { id: 5, text: 'Quel est votre niveau de démangeaisons ?', options: ['Aucun', 'Léger', 'Modéré', 'Intense'] },
         { id: 6, text: 'Présentez-vous des fissures ou crevasses ?', options: ['Aucune', 'Superficielles', 'Nettes', 'Profondes'] }
       ];
    }
    if (this.type === 'impact') {
       return [
         { id: 1, text: 'Vos symptômes rendent-ils difficile l\'utilisation de vos mains ?', options: ['Pas du tout', 'Un peu', 'Beaucoup', 'Énormément'] },
         { id: 2, text: 'Avez-vous des difficultés à effectuer certaines tâches quotidiennes ?', options: ['Non', 'Oui parfois', 'Oui souvent'] },
         { id: 3, text: 'Votre travail est-il impacté par vos symptômes ?', options: ['Pas du tout', 'Légèrement', 'Modérément', 'Fortement'] }
       ];
    }
    if (this.type === 'qvt') {
       return [
         { id: 1, text: 'Vos symptômes vous causent-ils du stress ?', options: ['Pas du tout', 'Un peu', 'Beaucoup'] },
         { id: 2, text: 'Vos symptômes affectent-ils votre moral ?', options: ['Pas du tout', 'Parfois', 'Souvent'] }
       ];
    }
    if (this.type === 'stigmatisation') {
       return [
         { id: 1, text: 'Avez-vous déjà eu l\'impression que les autres remarquent ou jugent vos mains ?', options: ['Jamais', 'Parfois', 'Souvent'] },
         { id: 2, text: 'Évitez-vous certaines situations sociales à cause de vos mains ?', options: ['Non', 'Parfois', 'Souvent'] }
       ];
    }
    if (this.type === 'traitement') {
       return [
         { id: 1, text: 'Utilisez-vous actuellement un traitement pour vos mains ?', options: ['Oui prescrit par un médecin', 'Oui en automédication', 'Non'] },
         { id: 2, text: 'Quel type de traitement utilisez-vous ?', options: ['Crème hydratante', 'Corticoïdes', 'Autre traitement', 'Aucun'] }
       ];
    }
    return [
         { id: 1, text: 'Impact sur vos activités au quotidien ?', options: ['Faible', 'Modéré', 'Fort'] },
         { id: 2, text: 'Sévérité des symptômes lors des crises ?', options: ['Faible', 'Modéré', 'Fort'] }
    ];
  }

  viewInstance(id: string) {
    const inst = this.history.find(h => h.id === id);
    if (inst) {
      this.currentInstanceId = inst.id;
      this.currentDate = inst.date;
      this.currentAnswers = JSON.parse(JSON.stringify(inst.answers));
      this.originalAnswers = JSON.parse(JSON.stringify(inst.answers));
      this.hasChanges = false;
    }
  }

  triggerEdit() {
  }

  selectAnswer(questionId: number, answer: string) {
    this.currentAnswers[questionId] = answer;
    this.checkChanges();
  }

  checkChanges() {
    this.hasChanges = JSON.stringify(this.currentAnswers) !== JSON.stringify(this.originalAnswers);
  }

  createNewInstance() {
    const newAnswers = {};
    const dateStr = new Date().toLocaleDateString('fr-FR');
    
    const exist = this.history.find(h => h.date === dateStr);
    
    if(!exist) {
      this.stateService.addQuestionnaireInstance(this.type, newAnswers);
      setTimeout(() => {
        const state = this.stateService.stateSubject.getValue();
        const list = state.questionnaires[this.type];
        if (list && list.length > 0) {
          this.viewInstance(list[list.length - 1].id);
        }
      }, 50);
    } else {
      this.viewInstance(exist.id);
    }
  }

  saveChanges() {
    if (this.currentInstanceId) {
      this.stateService.updateQuestionnaireInstance(this.type, this.currentInstanceId, this.currentAnswers);
      this.hasChanges = false;
    }
  }

  goBack() {
    this.location.back();
  }
}

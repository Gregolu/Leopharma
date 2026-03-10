import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question, QuestionnaireState } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private readonly questions: Question[] = [
    {
      id: 1,
      text: 'Avez-vous des lésions uniquement sur les mains et les poignets ?',
      type: 'single',
      options: [
        { id: '1a', label: 'Oui', points: 1 },
        { id: '1b', label: 'Non', points: 0 }
      ]
    },
    {
      id: 2,
      text: 'Quels symptômes apparaissent ?',
      type: 'multiple',
      options: [
        { id: '2a', label: 'Rougeurs', points: 1 },
        { id: '2b', label: 'Fissures', points: 1 },
        { id: '2c', label: 'Œdème', points: 1 },
        { id: '2d', label: 'Hyperkératose', points: 1 },
        { id: '2e', label: 'Sécheresse', points: 1 },
        { id: '2f', label: 'Desquamation', points: 1 },
        { id: '2g', label: 'Démangeaisons', points: 1 },
        { id: '2h', label: 'Douleurs', points: 1 },
        { id: '2i', label: 'Brûlures', points: 1 }
      ]
    },
    {
      id: 3,
      text: 'Depuis combien de temps ?',
      type: 'single',
      options: [
        { id: '3a', label: 'Moins de 3 mois', points: 0 },
        { id: '3b', label: '3 à 12 mois', points: 1 },
        { id: '3c', label: 'Plus d’un an', points: 2 }
      ]
    },
    {
      id: 4,
      text: 'Nombre de poussées sur 12 mois',
      type: 'single',
      options: [
        { id: '4a', label: '0', points: 0 },
        { id: '4b', label: '1', points: 1 },
        { id: '4c', label: '2 ou plus', points: 2 }
      ]
    },
    {
      id: 5,
      text: 'Impact sur la vie quotidienne',
      type: 'single',
      options: [
        { id: '5a', label: 'Oui beaucoup', points: 2 },
        { id: '5b', label: 'Oui un peu', points: 1 },
        { id: '5c', label: 'Non', points: 0 }
      ]
    }
  ];

  private initialState: QuestionnaireState = {
    currentStep: 0,
    totalSteps: this.questions.length,
    answers: {},
    score: 0
  };

  private stateSubject = new BehaviorSubject<QuestionnaireState>(this.initialState);
  state$ = this.stateSubject.asObservable();

  getQuestions(): Question[] {
    return this.questions;
  }

  saveAnswer(questionId: number, answerIds: string | string[]) {
    const currentState = this.stateSubject.getValue();
    this.stateSubject.next({
      ...currentState,
      answers: { ...currentState.answers, [questionId]: answerIds }
    });
  }

  nextStep() {
    const currentState = this.stateSubject.getValue();
    if (currentState.currentStep < currentState.totalSteps - 1) {
      this.stateSubject.next({ ...currentState, currentStep: currentState.currentStep + 1 });
    }
  }

  previousStep() {
    const currentState = this.stateSubject.getValue();
    if (currentState.currentStep > 0) {
      this.stateSubject.next({ ...currentState, currentStep: currentState.currentStep - 1 });
    }
  }

  calculateScore(): number {
    const state = this.stateSubject.getValue();
    let totalScore = 0;

    for (const [qId, ans] of Object.entries(state.answers)) {
      const q = this.questions.find(q => q.id === +qId);
      if (!q) continue;

      if (Array.isArray(ans)) {
        ans.forEach(aId => {
          const opt = q.options.find(o => o.id === aId);
          if (opt && opt.points) totalScore += opt.points;
        });
      } else {
        const opt = q.options.find(o => o.id === ans);
        if (opt && opt.points) totalScore += opt.points;
      }
    }

    this.stateSubject.next({ ...state, score: totalScore });
    return totalScore;
  }

  reset() {
    this.stateSubject.next(this.initialState);
  }
}
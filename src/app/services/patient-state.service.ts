import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QUESTIONNAIRES } from './questionnaire-data';

export interface QuestionnaireInstance {
  id: string;
  date: string;
  answers: Record<number, any>; // maps questionId to answer value
}

export interface PatientState {
  predispositionScore: number;
  eczemaScore: number;
  questionnaires: Record<string, QuestionnaireInstance[]>;
}

@Injectable({
  providedIn: 'root'
})
export class PatientStateService {
  private initialState: PatientState = {
    predispositionScore: 80,
    eczemaScore: 67,
    questionnaires: {
      'photo': [
        {
          id: '2',
          date: '17/11/2025',
          answers: { 1: 'Un peu', 2: 'Modérées', 3: 'Quelques-unes', 4: 'Parfois' }
        },
        {
          id: '1',
          date: '03/05/2024',
          answers: { 1: 'Beaucoup', 2: 'Intenses', 3: 'Nombreuses', 4: 'Souvent' }
        }
      ],
      'flash': [
        {
          id: '10',
          date: '01/01/2024',
          answers: { 1: 'Oui', 2: ['Rougeurs'] }
        }
      ]
    }
  };

  public stateSubject = new BehaviorSubject<PatientState>(this.initialState);
  state$ = this.stateSubject.asObservable();

  updatePredisposition(score: number) {
    const s = this.stateSubject.getValue();
    this.stateSubject.next({ ...s, predispositionScore: score });
  }

  updateEczema(score: number) {
    const s = this.stateSubject.getValue();
    this.stateSubject.next({ ...s, eczemaScore: score });
  }

  addQuestionnaireInstance(type: string, answers: Record<number, any>) {
    const s = this.stateSubject.getValue();
    const list = s.questionnaires[type] || [];
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB'); // gets DD/MM/YYYY
    
    const newInstance: QuestionnaireInstance = {
      id: Date.now().toString(),
      date: dateStr,
      answers: { ...answers }
    };
    
    this.stateSubject.next({
      ...s,
      questionnaires: {
        ...s.questionnaires,
        [type]: [newInstance, ...list]
      }
    });
  }

  updateQuestionnaireInstance(type: string, id: string, newAnswers: Record<number, any>) {
    const s = this.stateSubject.getValue();
    if (!s.questionnaires[type]) return;

    const list = s.questionnaires[type].map(inst => {
      if (inst.id === id) {
        return { ...inst, answers: newAnswers };
      }
      return inst;
    });

    this.stateSubject.next({
      ...s,
      questionnaires: {
        ...s.questionnaires,
        [type]: list
      }
    });
  }

  getCompletionStats() {
    const s = this.stateSubject.getValue();
    const keys = Object.keys(QUESTIONNAIRES);
    let totalQuestionnaires = keys.length;
    let completedQuestionnaires = 0;
    const statusMap: Record<string, 'none' | 'partial' | 'completed'> = {};

    keys.forEach(key => {
      const qList = (QUESTIONNAIRES as any)[key];
      const count = qList.length;

      // Find the latest instance
      const instances = s.questionnaires[key] || [];
      const latest = instances.length > 0 ? instances[0] : null;

      let answered = 0;
      if (latest && latest.answers) {
        answered = Object.keys(latest.answers).filter(k => {
           const v = latest.answers[Number(k)];
           return v !== null && v !== undefined && v !== '';
        }).length;
      }

      if (answered === 0) {
        statusMap[key] = 'none';
      } else if (answered < count) {
        statusMap[key] = 'partial';
      } else {
        statusMap[key] = 'completed';
        completedQuestionnaires++;
      }
    });

    const percentage = totalQuestionnaires > 0 ? Math.round((completedQuestionnaires / totalQuestionnaires) * 100) : 0;
    const remainingQuestionnaires = totalQuestionnaires - completedQuestionnaires;
    return { percentage, totalQuestionnaires, completedQuestionnaires, remainingQuestionnaires, statusMap };
  }
}

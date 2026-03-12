import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { Question } from '../../models/question.model';

interface QInstance {
  id: string;
  date: Date;
  answers: Record<number, string | string[]>;
}

@Component({
  selector: 'app-questionnaire-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qd-container">

      <!-- HEADER -->
      <div class="qd-header">
        <div class="header-row">
          <button class="icon-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="header-title">{{ questionnaireTitle }}</span>
          <div class="header-actions">
            <div class="notif-icon" (click)="goTo('/notifications')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <div class="profile-icon" (click)="goTo('/profile')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </div>

        <div class="header-meta">
          <span class="last-answered" *ngIf="latestInstance">
            Répondu le {{ formatDate(latestInstance.date) }}
          </span>
          <span class="last-answered no-entry" *ngIf="!latestInstance">
            Aucune réponse enregistrée
          </span>
        </div>

        <button class="update-btn" (click)="startUpdate()" [disabled]="activeMode === 'update'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Mettre à jour le questionnaire
        </button>
      </div>

      <!-- QUESTIONNAIRE FORM -->
      <div class="qd-form" *ngIf="activeMode !== 'none'">
        <div class="form-mode-tag" [class.edit-tag]="activeMode === 'edit'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" *ngIf="activeMode === 'update'"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" *ngIf="activeMode === 'edit'"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <span *ngIf="activeMode === 'update'">Nouvelle réponse — {{ formatDate(today) }}</span>
          <span *ngIf="activeMode === 'edit'">Modification — {{ editingInstance ? formatDate(editingInstance.date) : '' }}</span>
        </div>

        <div class="questions-list">
          <div class="question-card" *ngFor="let q of questions; let qi = index">
            <div class="q-number">{{ qi + 1 }}/{{ questions.length }}</div>
            <p class="q-label">{{ q.text }}</p>
            <div class="options-wrap">
              <button
                *ngFor="let opt of q.options"
                class="opt-btn"
                [class.selected]="isSelected(q.id, opt.id)"
                (click)="toggleOption(q.id, opt.id, q.type)">
                <span class="opt-check" *ngIf="isSelected(q.id, opt.id)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="cancel-btn" (click)="cancelEdit()">Annuler</button>
          <button class="save-btn" (click)="save()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Sauvegarder
          </button>
        </div>
      </div>

      <!-- HISTORY -->
      <div class="qd-history">
        <div class="history-header-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Historique des réponses
        </div>

        <div class="no-history" *ngIf="instances.length === 0">
          Aucune réponse enregistrée pour le moment.
        </div>

        <div
          class="history-card"
          *ngFor="let inst of instances; let i = index"
          [class.highlighted]="editingInstanceId === inst.id">
          <div class="history-card-left">
            <div class="history-badge" [class.latest-badge]="i === 0">
              {{ i === 0 ? 'Dernière' : '#' + (instances.length - i) }}
            </div>
            <div class="history-date">Répondu le {{ formatDate(inst.date) }}</div>
          </div>
          <button
            class="modifier-btn"
            (click)="startEdit(inst)"
            [disabled]="activeMode !== 'none'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Modifier
          </button>
        </div>
      </div>

      <div class="spacer"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #F9FAFB;
      font-family: 'Rethink Sans', sans-serif;
    }

    .qd-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: #F9FAFB;
    }

    /* ── HEADER ────────────────────────────────── */
    .qd-header {
      background: var(--primary-color, #00af6c);
      padding: 50px 20px 24px;
      border-radius: 0 0 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .icon-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
    }

    .header-title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      flex: 1;
      text-align: center;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .notif-icon {
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .profile-icon {
      background: white;
      color: var(--primary-color, #00af6c);
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .header-meta {
      display: flex;
      align-items: center;
    }

    .last-answered {
      font-size: 13px;
      color: rgba(255,255,255,0.85);
      font-weight: 500;
    }

    .last-answered.no-entry {
      color: rgba(255,255,255,0.6);
      font-style: italic;
    }

    .update-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      color: var(--primary-color, #00af6c);
      border: none;
      border-radius: 30px;
      padding: 12px 18px;
      font-size: 14px;
      font-weight: 700;
      font-family: 'Rethink Sans', sans-serif;
      cursor: pointer;
      width: 100%;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: opacity 0.2s;
    }

    .update-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ── FORM ──────────────────────────────────── */
    .qd-form {
      margin: 20px 20px 0;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      overflow: hidden;
    }

    .form-mode-tag {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #f0f9f5;
      border-bottom: 1px solid #e4f0ea;
      font-size: 13px;
      font-weight: 700;
      color: var(--primary-color, #00af6c);
    }

    .form-mode-tag.edit-tag {
      background: #f0f4ff;
      border-color: #d0dcf8;
      color: #204131;
    }

    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .question-card {
      padding: 20px 16px;
      border-bottom: 1px solid #F2F4F7;
    }

    .question-card:last-of-type {
      border-bottom: none;
    }

    .q-number {
      font-size: 11px;
      font-weight: 700;
      color: var(--primary-color, #00af6c);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .q-label {
      margin: 0 0 14px 0;
      font-size: 15px;
      font-weight: 600;
      color: #1a2535;
      line-height: 1.4;
    }

    .options-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .opt-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: white;
      border: 1.5px solid #EAEAEA;
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 14px;
      font-family: 'Rethink Sans', sans-serif;
      font-weight: 500;
      color: #3f4756;
      cursor: pointer;
      text-align: left;
      transition: all 0.18s;
    }

    .opt-btn.selected {
      background: #f0f9f5;
      border-color: var(--primary-color, #00af6c);
      color: var(--primary-color, #00af6c);
      font-weight: 700;
    }

    .opt-check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: var(--primary-color, #00af6c);
      color: white;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      padding: 16px;
      border-top: 1px solid #F2F4F7;
    }

    .cancel-btn {
      flex: 1;
      padding: 14px;
      border-radius: 12px;
      border: 1.5px solid #EAEAEA;
      background: white;
      color: #666;
      font-family: 'Rethink Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }

    .save-btn {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px;
      border-radius: 12px;
      border: none;
      background: var(--primary-color, #00af6c);
      color: white;
      font-family: 'Rethink Sans', sans-serif;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,175,108,0.3);
    }

    /* ── HISTORY ───────────────────────────────── */
    .qd-history {
      margin: 20px 20px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .history-header-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #3f4756;
      padding: 4px 0;
    }

    .no-history {
      font-size: 13px;
      color: #999;
      text-align: center;
      padding: 24px 0;
      background: white;
      border-radius: 12px;
    }

    .history-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F3F4F6;
      border-radius: 12px;
      padding: 14px 16px;
      transition: box-shadow 0.2s;
    }

    .history-card.highlighted {
      background: #f0f4ff;
      box-shadow: 0 0 0 2px #204131;
    }

    .history-card-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .history-badge {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #e2e8f0;
      color: #64748b;
      padding: 3px 8px;
      border-radius: 20px;
    }

    .history-badge.latest-badge {
      background: var(--primary-color, #00af6c);
      color: white;
    }

    .history-date {
      font-size: 14px;
      font-weight: 600;
      color: #1a2535;
    }

    .modifier-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: white;
      border: 1.5px solid #e2e8f0;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 700;
      font-family: 'Rethink Sans', sans-serif;
      color: #204131;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .modifier-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .spacer {
      height: 40px;
    }
  `]
})
export class QuestionnaireDetailComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private questionnaireService = inject(QuestionnaireService);

  questionnaireId = '';
  questionnaireTitle = '';
  questions: Question[] = [];

  today = new Date();

  instances: QInstance[] = [
    {
      id: '1',
      date: new Date(2026, 2, 5),
      answers: { 1: '1a', 2: ['2a', '2e', '2g'], 3: '3b', 4: '4b', 5: '5b' }
    },
    {
      id: '2',
      date: new Date(2024, 4, 4),
      answers: { 1: '1b', 2: ['2a'], 3: '3a', 4: '4a', 5: '5c' }
    }
  ];

  activeMode: 'none' | 'update' | 'edit' = 'none';
  editingInstanceId: string | null = null;
  currentAnswers: Record<number, string | string[]> = {};

  get latestInstance(): QInstance | null {
    return this.instances.length > 0 ? this.instances[0] : null;
  }

  get editingInstance(): QInstance | null {
    if (!this.editingInstanceId) return null;
    return this.instances.find(i => i.id === this.editingInstanceId) ?? null;
  }

  ngOnInit() {
    this.questionnaireId = this.route.snapshot.paramMap.get('id') || 'analyse-mains';
    this.questionnaireTitle = this.getTitleFromId(this.questionnaireId);
    this.questions = this.questionnaireService.getQuestions();
  }

  getTitleFromId(id: string): string {
    const titles: Record<string, string> = {
      'analyse-mains': 'Analyse des mains',
      'scan-produit': 'Scan du produit',
      'autres': 'Autres questionnaires'
    };
    return titles[id] || 'Questionnaire';
  }

  startUpdate() {
    this.currentAnswers = {};
    this.editingInstanceId = null;
    this.activeMode = 'update';
    setTimeout(() => {
      document.querySelector('.qd-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  startEdit(instance: QInstance) {
    this.currentAnswers = { ...instance.answers };
    this.editingInstanceId = instance.id;
    this.activeMode = 'edit';
    setTimeout(() => {
      document.querySelector('.qd-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  cancelEdit() {
    this.activeMode = 'none';
    this.editingInstanceId = null;
    this.currentAnswers = {};
  }

  toggleOption(questionId: number, optionId: string, type: string) {
    if (type === 'single') {
      this.currentAnswers = { ...this.currentAnswers, [questionId]: optionId };
    } else {
      const current = (this.currentAnswers[questionId] as string[]) || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      this.currentAnswers = { ...this.currentAnswers, [questionId]: updated };
    }
  }

  isSelected(questionId: number, optionId: string): boolean {
    const ans = this.currentAnswers[questionId];
    if (!ans) return false;
    return Array.isArray(ans) ? ans.includes(optionId) : ans === optionId;
  }

  save() {
    if (this.activeMode === 'update') {
      const newInstance: QInstance = {
        id: Date.now().toString(),
        date: new Date(),
        answers: { ...this.currentAnswers }
      };
      this.instances = [newInstance, ...this.instances];
    } else if (this.activeMode === 'edit' && this.editingInstanceId) {
      this.instances = this.instances.map(inst =>
        inst.id === this.editingInstanceId
          ? { ...inst, answers: { ...this.currentAnswers } }
          : inst
      );
    }
    this.activeMode = 'none';
    this.editingInstanceId = null;
    this.currentAnswers = {};
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  goBack() {
    this.location.back();
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

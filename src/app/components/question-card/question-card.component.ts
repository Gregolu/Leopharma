import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question, Option } from '../../models/question.model';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card question-card">
      <h2 class="card-title">{{ question.text }}</h2>
      
      <div class="options-container">
        <!-- Single choice -->
        <ng-container *ngIf="question.type === 'single'">
          <button 
            *ngFor="let opt of question.options" 
            class="option-btn"
            [class.selected]="isSelected(opt.id)"
            (click)="toggleOption(opt.id)">
            {{ opt.label }}
          </button>
        </ng-container>

        <!-- Multiple choice -->
        <ng-container *ngIf="question.type === 'multiple'">
          <button 
            *ngFor="let opt of question.options" 
            class="option-btn"
            [class.selected]="isSelected(opt.id)"
            (click)="toggleOption(opt.id)">
            <span class="checkbox" [class.checked]="isSelected(opt.id)"></span>
            {{ opt.label }}
          </button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .question-card {
      text-align: left;
    }
    .card-title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      line-height: 1.3;
    }
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .option-btn {
      background-color: var(--color-ui-light);
      border: 1px solid var(--color-ui-gray);
      border-radius: var(--border-radius);
      padding: 1rem 1.5rem;
      font-size: 1.1rem;
      text-align: left;
      display: flex;
      align-items: center;
      transition: all 0.2s ease;
      font-family: var(--font-regular);
      color: var(--color-secondary);
      
      &.selected {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--color-ui-white);
      }
      
      &:hover {
        opacity: 0.9;
      }
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-ui-gray);
      border-radius: 4px;
      margin-right: 1rem;
      display: inline-block;
      transition: all 0.2s ease;
      background-color: white;

      &.checked {
        border-color: white;
        background-color: white;
        position: relative;

        &::after {
          content: '✓';
          color: var(--color-primary);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  `]
})
export class QuestionCardComponent {
  @Input() question!: Question;
  @Input() currentAnswer: string | string[] = [];
  @Output() answerChange = new EventEmitter<string | string[]>();

  isSelected(optionId: string): boolean {
    if (this.question.type === 'single') {
      return this.currentAnswer === optionId;
    } else {
      return Array.isArray(this.currentAnswer) && this.currentAnswer.includes(optionId);
    }
  }

  toggleOption(optionId: string) {
    if (this.question.type === 'single') {
      this.answerChange.emit(optionId);
    } else {
      let currentArr = Array.isArray(this.currentAnswer) ? [...this.currentAnswer] : [];
      const index = currentArr.indexOf(optionId);
      
      if (index === -1) {
        currentArr.push(optionId);
      } else {
        currentArr.splice(index, 1);
      }
      
      this.answerChange.emit(currentArr);
    }
  }
}
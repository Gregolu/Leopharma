import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question, Option } from '../../models/question.model';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card question-card with-bg">
      <div class="title-wrapper">
        <h2 class="card-title">{{ question.text }}</h2>
        <img src="/assets/images/barre-question.svg" class="title-underline" alt="">
      </div>
      
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
    .with-bg {
      position: relative;
      background-image: url('/assets/images/icone-manuderma@2x.png');
      background-repeat: no-repeat;
      background-position: right -40px bottom -40px;
      background-size: 200px;
      min-height: 400px;
      background-color: var(--color-ui-light);
    }
    .with-bg::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(245,245,245,0.7);
      border-radius: 16px;
      z-index: 0;
    }
    .question-card > * {
      position: relative;
      z-index: 1;
    }
    .title-wrapper {
      margin-bottom: 2rem;
      display: inline-block;
      position: relative;
    }
    .card-title {
      font-size: 1.6rem;
      margin-bottom: 5px;
      line-height: 1.3;
      color: var(--secondary-color-blue, #240bbe);
      font-family: var(--font-bold, 'Rethink Sans', sans-serif);
      font-weight: 700;
    }
    .title-underline {
      width: auto;
      height: 12px;
      display: block;
      margin-top: 4px;
    }
    .question-card {
      text-align: left;
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
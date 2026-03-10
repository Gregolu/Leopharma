import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { ScoreBarComponent } from '../../components/score-bar/score-bar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [ScoreBarComponent, HeaderComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="page-content score-page">
        <app-score-bar [score]="score"></app-score-bar>
        
        <div class="action-buttons">
          <button class="btn-cancel" (click)="retakeQuestionnaire()">
            Refaire le test
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .score-page {
      padding-top: 80px; /* Right below header */
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      background: var(--color-bg-app);
    }
    .action-buttons {
      margin-top: auto;
      padding-bottom: 30px;
      width: 100%;
    }
    .btn-cancel {
      width: 100%;
      background: transparent;
      border: 2px solid var(--color-primary);
      color: var(--color-primary);
      padding: 16px;
      border-radius: 50px;
      font-family: var(--font-bold);
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-cancel:hover {
      background: var(--color-primary);
      color: white;
    }
  `]
})
export class ScoreComponent implements OnInit {
  score: number = 0;

  constructor(
    private qService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.qService.state$.subscribe(state => {
      this.score = state.score;
    });
  }

  retakeQuestionnaire() {
    this.qService.reset();
    this.router.navigate(['/questionnaire']);
  }
}
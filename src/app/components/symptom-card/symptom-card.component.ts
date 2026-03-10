import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-symptom-card',
  standalone: true,
  template: `
    <div class="symptom-card card">
      <div class="icon"></div>
      <h3>{{ title }}</h3>
    </div>
  `,
  styles: [`
    .symptom-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem 1rem;
      background-color: var(--color-ui-white);
      aspect-ratio: 1 / 1;
      justify-content: center;
    }
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--color-ui-light);
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0;
      color: var(--color-secondary);
      font-weight: 500;
    }
  `]
})
export class SymptomCardComponent {
  @Input() title: string = '';
}
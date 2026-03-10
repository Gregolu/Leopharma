import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  template: `
    <div class="feature-card card">
      <div class="feature-icon"></div>
      <h4>{{ title }}</h4>
    </div>
  `,
  styles: [`
    .feature-card {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      margin-bottom: 1rem;
      background-color: var(--color-ui-white);
    }
    .feature-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background-color: var(--color-primary);
      opacity: 0.1;
      margin-right: 1.25rem;
      flex-shrink: 0;
    }
    h4 {
      margin: 0;
      font-size: 1.125rem;
      color: var(--color-secondary);
      font-family: 'Gilroy-Bold', sans-serif;
    }
  `]
})
export class FeatureCardComponent {
  @Input() title: string = '';
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  template: `
    <article class="info-card card">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </article>
  `,
  styles: [`
    .info-card {
      margin-bottom: 2rem;
      background-color: var(--color-ui-white);
    }
    h2 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
    p {
      line-height: 1.6;
      color: var(--color-secondary);
      opacity: 0.9;
      margin: 0;
    }
  `]
})
export class InfoCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
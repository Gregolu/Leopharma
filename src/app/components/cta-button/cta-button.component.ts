import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="cta-button" (click)="clickHandler.emit()">
      {{ text }}
    </button>
  `,
  styles: [`
    .cta-button {
      background-color: var(--color-primary);
      color: var(--color-ui-white);
      border: none;
      border-radius: 9999px;
      padding: 1rem 2rem;
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 1rem;
      cursor: pointer;
      width: 100%;
      max-width: 300px;
      margin: 1rem auto;
      display: block;
      transition: opacity 0.2s ease;
    }
    .cta-button:hover {
      opacity: 0.9;
    }
  `]
})
export class CtaButtonComponent {
  @Input() text: string = 'Click me';
  @Output() clickHandler = new EventEmitter<void>();
}

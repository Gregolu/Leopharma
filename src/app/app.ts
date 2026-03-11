import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class=\"mobile-container\">
      <div class=\"scroll-wrapper\">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .scroll-wrapper {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      position: relative;
      width: 100%;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    .scroll-wrapper::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
    ::ng-deep router-outlet + * {
      display: block;
      width: 100%;
    }
  `]
})
export class AppComponent {}

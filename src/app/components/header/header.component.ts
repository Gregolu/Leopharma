import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="app-header">
      <div class="header-pill">
        <div class="logo">
          <span class="icon-hands">🫶</span>
          <span class="logo-text">Manu<span class="teal">Derma</span></span>
        </div>
        <div class="user-profile">
          <div class="user-icon">👤</div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      padding: 15px 20px;
      background-color: transparent;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      z-index: 10;
    }
    .header-pill {
      background-color: var(--color-ui-white);
      border-radius: 50px;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--color-ui-gray);
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--color-primary);
    }
    .logo-text .teal {
      color: var(--color-teal);
    }
    .icon-hands {
      font-size: 1.5rem;
    }
    .user-icon {
      background-color: var(--color-teal);
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
  `]
})
export class HeaderComponent {}

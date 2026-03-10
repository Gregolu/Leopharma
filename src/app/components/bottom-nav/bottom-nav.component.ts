import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="nav-container">
      <a class="nav-item" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>Home</span>
      </a>
      <a class="nav-item" routerLink="/mentions-legales" routerLinkActive="active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span>Mentions légales</span>
      </a>
      <a class="nav-item" routerLink="/qui-sommes-nous" routerLinkActive="active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>Qui sommes nous</span>
      </a>
    </div>
  `,
  styles: [`
    .nav-container {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      width: calc(100% - 64px);
      max-width: 400px;
      background: #ffffff;
      border-radius: 40px;
      display: flex;
      justify-content: space-around;
      padding: 16px 24px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      z-index: 1000;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #9CA3AF;
      text-decoration: none;
      font-size: 11px;
      gap: 6px;
      font-family: 'Gilroy-Medium', sans-serif;
      transition: all 0.2s ease;
    }

    .nav-item svg {
      stroke: #9CA3AF;
      transition: all 0.2s ease;
    }

    .nav-item.active {
      color: #204131;
      font-family: 'Gilroy-Bold', sans-serif;
    }

    .nav-item.active svg {
      stroke: #204131;
    }
  `]
})
export class BottomNavComponent {}

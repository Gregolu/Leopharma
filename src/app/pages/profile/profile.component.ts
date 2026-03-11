import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="app-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span class="header-title">Mon profil</span>
        <div style="width: 24px;"></div>
      </header>

      <div class="content">
        <div class="profile-header">
          <div class="avatar">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <p class="profile-subtitle">Vous pouvez modifier toutes les informations de votre compte ici.</p>
        </div>

        <div class="menu-list">
          <div class="menu-item">
            <div class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <span class="menu-text">Modifier mon compte</span>
            <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>

          <div class="menu-item">
            <div class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <span class="menu-text">Paramètres des notifications</span>
            <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>

          <div class="menu-item">
            <div class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16h16V8l-6-6z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            </div>
            <span class="menu-text">Termes et conditions d'utilisation</span>
            <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </div>
      </div>

      <div class="bottom-actions">
         <button class="logout-btn">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
           Logout
         </button>
      </div>
    </div>
  `,
  styles: [`
    .page-container { background: #FAFAFA; min-height: 100vh; display: flex; flex-direction: column; font-family: 'Rethink Sans', sans-serif; }
    .app-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #fff; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 10; }
    .back-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: #111; }
    .header-title { font-weight: 700; font-size: 1.1rem; color: #111; }
    .content { padding: 32px 20px; flex: 1; display: flex; flex-direction: column; }
    
    .profile-header { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 32px; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; background: #E3F2FD; color: #375344; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
    .profile-subtitle { margin: 0; font-size: 0.95rem; color: #666; line-height: 1.4; max-width: 280px; }
    
    .menu-list { background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; margin-bottom: 32px; }
    .menu-item { display: flex; align-items: center; padding: 16px; border-bottom: 1px solid #eee; cursor: pointer; transition: background 0.2s; }
    .menu-item:active { background: #f9f9f9; }
    .menu-item:last-child { border-bottom: none; }
    
    .menu-icon { width: 36px; height: 36px; border-radius: 8px; background: #F5F5F5; color: #555; display: flex; align-items: center; justify-content: center; margin-right: 16px; }
    .menu-text { flex: 1; font-size: 1rem; font-weight: 500; color: #111; }
    .chevron { color: #ccc; }
    
    .bottom-actions { padding: 24px 20px; background: #FAFAFA; display: flex; justify-content: center; margin-top: auto; padding-bottom: 40px; }
    .logout-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 16px; background: #fff; color: #F44336; border: 1px solid #F44336; border-radius: 50px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
    .logout-btn:active { background: #F44336; color: #fff; }
  `]
})
export class ProfileComponent {
  location = inject(Location);
  
  goBack() {
    this.location.back();
  }
}

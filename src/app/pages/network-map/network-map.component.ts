import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container">
      <div class="green-header-area">
        <header class="app-header">
          <button class="icon-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="header-title">Mon réseau médical</span>
          <div class="header-actions">
            <!-- Simplified icons -->
            <div class="notification-icon" style="color: white; width:32px; height:32px; display:flex; align-items:center; justify-content:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
            <div class="profile-icon" style="background: white; border-radius: 50%; padding:4px; color: var(--primary-color, #00af6c); width:32px; height:32px; display:flex; align-items:center; justify-content:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
          </div>
        </header>

        <div class="search-overlay">
          <div class="search-bar">
            <!-- Simulate focus -->
            <input type="text" value="Dermatologue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #00af6c)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      <!-- Faking the map with a background color for now -->
      <div class="map-view">
         <!-- pins are just for demo -->
      </div>
      
      <div class="bottom-list">
        <div class="list-item" (click)="goTo('/network-profile/3')">
          <div class="pin-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary-color, #00af6c)" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>
          </div>
          <div class="item-info">
            <div class="item-name">Mr Albert François</div>
            <div class="item-addr">146 rue st gervais Paris (93)</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div class="list-item" (click)="goTo('/network-profile/4')">
          <div class="pin-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary-color, #00af6c)" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>
          </div>
          <div class="item-info">
            <div class="item-name">Mr Robert Dacosta</div>
            <div class="item-addr">48 Avenue du boune Paris (93)</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .map-container { display: flex; flex-direction: column; height: 100vh; font-family: 'Rethink Sans', sans-serif; background: #e5e5e5; }
    .green-header-area { background: var(--primary-color, #00af6c); color: white; padding-bottom: 40px; position:relative; z-index:10;}
    .app-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; padding-top: 50px; }
    .icon-btn { background: none; border: none; padding: 0; display: flex; align-items: center; cursor: pointer; color: white; }
    .header-title { font-weight: 700; font-size: 18px; text-align: center; flex:1; margin: 0 16px; }
    .header-actions { display: flex; gap: 12px; align-items: center; }
    .search-overlay { padding: 0 20px; position: absolute; bottom: -20px; left: 0; width: 100%; box-sizing: border-box; }
    .search-bar { display: flex; align-items: center; background: white; padding: 12px 16px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 2px solid var(--primary-color, #00af6c); }
    .search-bar input { flex: 1; border: none; outline: none; font-size: 14px; font-weight: 500; color: #333; }
    .map-view { flex: 1; background: url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Map_of_Paris_by_OpenStreetMap.png') center center/cover no-repeat; opacity: 0.8; }
    .bottom-list { background: white; border-radius: 24px 24px 0 0; margin-top: -24px; position: relative; z-index: 20; padding: 20px; box-shadow: 0 -4px 16px rgba(0,0,0,0.1); }
    .list-item { display: flex; align-items: center; padding: 16px 0; border-bottom: 1px solid #eee; cursor: pointer; }
    .list-item:last-child { border-bottom: none; }
    .pin-icon { margin-right: 16px; }
    .item-info { flex: 1; }
    .item-name { font-size: 15px; font-weight: 600; color: var(--primary-color, #00af6c); }
    .item-addr { font-size: 13px; color: #666; margin-top: 4px; }
  `]
})
export class NetworkMapComponent {
  router = inject(Router);
  location = inject(Location);
  goBack() { this.location.back(); }
  goTo(route: string) { this.router.navigateByUrl(route); }
}

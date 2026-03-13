import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-network-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      
      <div class="top-card">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="profile-avatar">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <h2 class="pro-name">Dr <span *ngIf="profileId !== '3'">Robert Dawson</span><span *ngIf="profileId === '3'">Albert François</span> - <span class="pro-spec" style="color:white;">Dermatologue</span></h2>
        <div class="pro-detail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> 48 Avenue du boune - Paris (93)</div>
        <div class="pro-detail" style="color: white; font-weight: 500;">robert.dawson@gmail.com</div>
        <div class="pro-detail" style="color: white; font-weight: 500;">06 74 64 96 23 12</div>
      </div>

      <div class="content-body">
        
        <!-- Connected Pro View (Discussion) -->
        <div *ngIf="profileId === '1'" class="section-card">
          <div class="section-header" style="background:#111; color:white; padding:16px; margin: -20px -20px 16px -20px; border-radius: 16px 16px 0 0;">
            <h3>Discussion</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="chat-area">
            <div class="msg me">
              <div class="msg-bubble" style="background:#222; color:white;">Bonjour, devrais-je reprogrammer notre rendez-vous dans 6 mois ?</div>
              <div class="msg-time">11:24</div>
            </div>
            <div class="msg other">
              <div class="msg-author">Robert Dawson</div>
              <div class="msg-bubble" style="background:#222; color:white;">Bonjour ! Oui, c'est effectivement le bon moment. Votre dernier rendez-vous date de 6 mois...</div>
            </div>
            
            <div class="chat-input-area">
              <input type="text" placeholder="Envoyer un message...">
              <button><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
            </div>
          </div>
        </div>

        <!-- Non-Connected View (Recommendation) -->
        <div *ngIf="profileId !== '1'" class="section-card">
          <div class="section-header" style="background:#111; color:white; padding:16px; margin: -20px -20px 16px -20px; border-radius: 16px 16px 0 0;">
            <h3>Recommandation</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="info-area">
            <p style="font-size: 13px; text-align: center; color: rgba(255,255,255,0.9); margin:0;">Afin d'assurer la meilleure prise en charge de votre eczéma, je vous recommande ce spécialiste. Il pourra vous faire un diagnostic approprié.</p>
            <p style="text-align: center; margin-top: 12px; margin-bottom: 0; color: var(--primary-color, #00af6c); font-weight: 600; text-decoration: underline; font-size: 14px;">Recommandé par Dr Dawson</p>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header share-header">
            <h3>Partager mon dossier</h3>
          </div>
          <div class="info-area" *ngIf="profileId === '1'">
            <div style="text-align: center; margin-bottom: 16px; font-size: 14px; font-weight: 600;">Dernier partage le <span style="color: white; font-weight: 500;">13/05/25</span></div>
            <button class="btn-primary" style="width: 100%;">Partager</button>
          </div>
          
          <div class="info-area" *ngIf="profileId !== '1'">
            <div style="text-align: center; margin-bottom: 16px; font-size: 14px; font-weight: 700; color:white;">Invitez ce professionnel de santé <span style="color: white; font-weight: 500;">à accéder à votre suivi</span></div>
            <button class="btn-dark" style="width: 100%; margin-bottom: 16px;">L'inviter à accéder à mon dossier</button>
            <div style="display: flex; border: 1px solid var(--primary-color, #00af6c); border-radius: 20px; overflow: hidden;">
               <div style="flex:1; padding: 10px; text-align: center; background: var(--primary-color, #00af6c); color: white; font-weight: 600; cursor:pointer;">Ne plus partager</div>
               <div style="flex:1; padding: 10px; text-align: center; background: white; color: var(--primary-color, #00af6c); font-weight: 600; cursor:pointer;">Partager</div>
            </div>
          </div>
        </div>

        <!-- Remove from network btn -->
        <div style="text-align: center; margin-top: 32px;" *ngIf="profileId === '1'">
          <button class="btn-danger">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
             Retirer de mon réseau
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .profile-container { font-family: 'Rethink Sans', sans-serif; background: #e5e5e5; min-height: 100vh; }
    .top-card { background: var(--primary-color, #00af6c); border-radius: 0 0 40px 40px; padding: 50px 20px 30px; text-align: center; position: relative; }
    .back-btn { position: absolute; top: 50px; left: 20px; background: none; border: none; cursor: pointer; }
    .profile-avatar { width: 64px; height: 64px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; }
    .pro-name { font-size: 18px; font-weight: 800; color: white; margin: 0 0 8px; }
    .pro-spec { color: var(--primary-color, #00af6c); }
    .pro-detail { font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 6px; }
    
    .content-body { padding: 24px; padding-bottom: 80px; }
    .section-card { background: #111; color: white; border-radius: 24px; margin-bottom: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .section-header { background: #222; border-bottom: 1px solid #333; color: white; display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; }
    .section-header h3 { margin: 0; font-size: 16px; font-weight: 700; }
    .share-header { justify-content: center; }
    .chat-area { padding: 16px; background: #1a1a1a; }
    .msg { margin-bottom: 16px; display: flex; flex-direction: column; }
    .msg.me { align-items: flex-end; }
    .msg.other { align-items: flex-start; }
    .msg-author { font-size: 12px; font-weight: 700; color: white; margin-bottom: 4px; padding-left: 12px; }
    .msg-bubble { background: white; padding: 12px 16px; border-radius: 16px; font-size: 13px; color: #333; max-width: 80%; border: 1px solid #333; color: white; }
    .msg.me .msg-bubble { background: var(--primary-color, #00af6c) !important; color: white !important; border: none; border-radius: 16px 16px 0 16px; }
    .msg-time { font-size: 10px; color: #94a3b8; margin-top: 4px; }
    .chat-input-area { display: flex; align-items: center; background: var(--primary-color, #00af6c); border-radius: 20px; border: 1px solid var(--primary-color, #00af6c); padding: 8px 16px; margin-top: 16px; }
    .chat-input-area input { flex:1; border:none; background:transparent; outline:none; font-size: 14px; }
    .chat-input-area button { background:none; border:none; cursor:pointer; display:flex; align-items:center; }
    
    .info-area { padding: 20px; }
    .btn-primary { background: var(--primary-color, #00af6c); color: white; border: none; padding: 12px; border-radius: 24px; font-weight: 700; font-size: 15px; cursor: pointer; }
    .btn-dark { background: #1e293b; color: white; border: none; padding: 12px; border-radius: 24px; font-weight: 700; font-size: 15px; cursor: pointer; }
    .btn-danger { background: #ff6b6b; color: white; border: none; padding: 12px 24px; border-radius: 24px; font-weight: 700; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; }
  `]
})
export class NetworkProfileComponent {
  router = inject(Router);
  location = inject(Location);
  route = inject(ActivatedRoute);
  
  profileId: string = '1';

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id') || '1';
    });
  }

  goBack() { this.location.back(); }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analysis-container">
      <header class="a-header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <span class="header-title">Analyse des mains</span>
      </header>

      <div class="subtitle-container">
        <p>Veuillez prendre en photo vos mains en suivant les indications ci-dessous.</p>
      </div>
      
      <div class="photo-grid">
        <!-- Main droite (Avant) -->
        <div class="photo-case">
          <p class="case-label">Main droite (Avant)</p>
          <div class="upload-zone" (click)="triggerFileInput('file-1')" *ngIf="!photos['1']">
            <svg width="32" height="32" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="preview-zone" *ngIf="photos['1']">
            <img [src]="photos['1']" alt="Main droite (Avant)" class="preview-img">
            <button class="btn-retake" (click)="triggerFileInput('file-1')">Reprendre</button>
          </div>
          <input type="file" id="file-1" accept="image/*" capture="environment" class="hidden-input" (change)="onFileSelected($event, '1')">
        </div>

        <!-- Main droite (Arrière) -->
        <div class="photo-case">
          <p class="case-label">Main droite (Arrière)</p>
          <div class="upload-zone" (click)="triggerFileInput('file-2')" *ngIf="!photos['2']">
             <svg width="32" height="32" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="preview-zone" *ngIf="photos['2']">
            <img [src]="photos['2']" alt="Main droite (Arrière)" class="preview-img">
            <button class="btn-retake" (click)="triggerFileInput('file-2')">Reprendre</button>
          </div>
          <input type="file" id="file-2" accept="image/*" capture="environment" class="hidden-input" (change)="onFileSelected($event, '2')">
        </div>

        <!-- Main gauche (Avant) -->
        <div class="photo-case">
          <p class="case-label">Main gauche (Avant)</p>
          <div class="upload-zone" (click)="triggerFileInput('file-3')" *ngIf="!photos['3']">
             <svg width="32" height="32" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="preview-zone" *ngIf="photos['3']">
            <img [src]="photos['3']" alt="Main gauche (Avant)" class="preview-img">
            <button class="btn-retake" (click)="triggerFileInput('file-3')">Reprendre</button>
          </div>
          <input type="file" id="file-3" accept="image/*" capture="environment" class="hidden-input" (change)="onFileSelected($event, '3')">
        </div>

        <!-- Main gauche (Arrière) -->
        <div class="photo-case">
          <p class="case-label">Main gauche (Arrière)</p>
          <div class="upload-zone" (click)="triggerFileInput('file-4')" *ngIf="!photos['4']">
             <svg width="32" height="32" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="preview-zone" *ngIf="photos['4']">
            <img [src]="photos['4']" alt="Main gauche (Arrière)" class="preview-img">
            <button class="btn-retake" (click)="triggerFileInput('file-4')">Reprendre</button>
          </div>
          <input type="file" id="file-4" accept="image/*" capture="environment" class="hidden-input" (change)="onFileSelected($event, '4')">
        </div>
      </div>

      <div class="actions" style="margin-top: 40px; padding: 0 24px;">
        <button class="btn-cta-green" [disabled]="!hasAtLeastOnePhoto()" [class.disabled]="!hasAtLeastOnePhoto()" (click)="finish()">Terminer</button>
      </div>
    </div>
  `,
  styles: [`
    .analysis-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #F8F9FA;
      padding-top: 16px;
      padding-bottom: 40px;
    }
    .a-header { display: flex; align-items: center; padding: 0 24px; margin-bottom: 12px; }
    .back-btn { background: none; border: none; padding: 0; margin-right: 16px; color: var(--primary-color, #00af6c); cursor: pointer; }
    .header-title { font-family: 'Rethink Sans', sans-serif; font-weight: 700; font-size: 18px; color: #1a202c; }
    
    .subtitle-container {
      padding: 0 24px;
      margin-bottom: 24px;
    }
    .subtitle-container p {
      font-family: 'Rethink Sans', sans-serif;
      font-size: 14px;
      color: #718096;
      line-height: 1.5;
    }

    .photo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 0 24px;
    }

    .photo-case {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .case-label {
      font-family: 'Rethink Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 8px;
      text-align: center;
    }

    .upload-zone {
      width: 100%;
      aspect-ratio: 1;
      background: white;
      border: 2px dashed #cbd5e1;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .upload-zone:active {
      background: #f1f5f9;
    }

    .preview-zone {
      width: 100%;
      aspect-ratio: 1;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    .preview-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-retake {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.9);
      color: #4a5568;
      border: none;
      padding: 4px 12px;
      border-radius: 20px;
      font-family: 'Rethink Sans', sans-serif;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .hidden-input {
      display: none;
    }

    .btn-cta-green { 
      background: var(--primary-color, #00af6c); 
      color: white; 
      border: none; 
      padding: 16px 32px; 
      border-radius: 30px; 
      font-family: 'Rethink Sans', sans-serif; 
      font-weight: 700; 
      font-size: 16px; 
      width: 100%; 
      cursor: pointer; 
      display: block; 
      text-align: center; 
      text-decoration: none; 
      transition: background 0.3s;
    }
    .btn-cta-green.disabled {
      background: #a0aec0;
      cursor: not-allowed;
      opacity: 0.7;
    }
  `]
})
export class PhotoAnalysisComponent {
  photos: { [key: string]: string | null } = {
    '1': null,
    '2': null,
    '3': null,
    '4': null
  };

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/auth']);
  }

  triggerFileInput(id: string) {
    document.getElementById(id)?.click();
  }

  onFileSelected(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos[key] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  hasAtLeastOnePhoto(): boolean {
    return Object.values(this.photos).some(photo => photo !== null);
  }

  finish() {
    if (this.hasAtLeastOnePhoto()) {
      this.router.navigate(['/questionnaire-flash']);
    }
  }
}

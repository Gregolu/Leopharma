import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

type ScoreLevel = 'low' | 'medium' | 'high';

@Component({
  selector: 'app-score-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="score-container">
      <div class="header-titles">
        <h2>Manuderma</h2>
        <h3>Prédisposition score</h3>
      </div>
      
      <div class="gauge-wrapper">
        <!-- Colored arc via conic gradient -->
        <div class="gauge-arc"></div>
        
        <!-- Rotating needle -->
        <div class="needle" [style.transform]="needleTransform">
          <div class="needle-base"></div>
        </div>
        
        <div class="gauge-labels">
          <span class="label-low">Low</span>
          <span class="label-med">Possible</span>
          <span class="label-high">High</span>
        </div>
      </div>
      
      <div class="result-card">
        <h4 class="score-title">{{ title }}</h4>
        <p class="score-message">{{ message }}</p>
      </div>
      
      <button class="btn-accent-score mt-20">
        Download recommandations
      </button>
    </div>
  `,
  styles: [`
    .btn-accent-score {
      background-color: var(--color-accent-orange);
      color: white;
      border: none;
      padding: 16px 20px;
      border-radius: 50px;
      font-size: 1rem;
      font-family: var(--font-bold);
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(255, 123, 79, 0.3);
      width: 100%;
    }
    .score-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
    }
    
    .header-titles {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 40px;
      h2 {
        font-family: var(--font-bold);
        font-size: 1.8rem;
        margin-bottom: 5px;
        color: var(--color-primary);
      }
      h3 {
        font-family: var(--font-regular);
        font-size: 1.2rem;
        color: var(--color-primary);
        opacity: 0.8;
      }
    }

    .gauge-wrapper {
      position: relative;
      width: 280px;
      height: 140px; /* Half of circle */
      margin-bottom: 50px;
    }
    
    .gauge-arc {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 280px; /* Full circle height */
      border-radius: 50%;
      /* Semi-circle gradient from -90 to 90 degrees with 3 equal chunks */
      background: conic-gradient(
        from 270deg at 50% 50%,
        var(--color-success) 0deg 60deg,
        var(--color-warning) 60deg 120deg,
        var(--color-danger) 120deg 180deg,
        transparent 180deg 360deg
      );
      
      -webkit-mask: radial-gradient(transparent 55%, black 56%);
      mask: radial-gradient(transparent 55%, black 56%);
    }

    .needle {
      position: absolute;
      top: 140px; /* center of full circle */
      left: 140px;
      width: 4px;
      height: 110px;
      background: var(--color-primary);
      transform-origin: bottom center;
      transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
      /* start pointing left */
      transform: translate(-50%, -100%) rotate(-90deg);
      border-radius: 2px;
    }
    
    .needle-base {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 16px;
      background: var(--color-primary);
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0,0,0,0.2);
    }

    .gauge-labels {
      position: absolute;
      top: 155px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      font-family: var(--font-bold);
      color: var(--color-secondary);
    }

    .result-card {
      background: var(--color-ui-white);
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      box-shadow: var(--shadow-sm);
      width: 100%;
      margin-top: 10px;
    }
    .score-title {
      font-size: 1.2rem;
      font-family: var(--font-bold);
      margin-bottom: 8px;
    }
    .score-message {
      font-size: 0.9rem;
      color: var(--color-secondary);
      line-height: 1.4;
      font-family: var(--font-regular);
    }
    .mt-20 {
      margin-top: 20px;
    }
  `]
})
export class ScoreBarComponent implements OnInit, OnChanges {
  @Input() score: number = 0;
  
  level: ScoreLevel = 'low';
  title: string = '';
  message: string = '';
  
  needleTransform = 'translate(-50%, -100%) rotate(-90deg)';

  ngOnInit() {
    this.evaluateScore();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['score']) {
      this.evaluateScore();
    }
  }

  evaluateScore() { let angle = -90; if (this.score <= 3) { this.level = 'low'; this.title = 'You have a low predisposition'; this.message = "Vos symptômes indiquent une très faible prédisposition. Continuez d'hydrater votre peau régulièrement."; angle = -60; } else if (this.score <= 7) { this.level = 'medium'; this.title = 'You have a medium predisposition'; this.message = "Vous présentez certains signes d'une possible dermatite atopique ou d'eczéma des mains. Surveillez vos symptômes."; angle = 0; } else { this.level = 'high'; this.title = 'You have a high predisposition'; this.message = "Vos symptômes suggèrent un eczéma des mains clinique. Il est fortement recommandé de consulter un professionnel."; angle = 60; } setTimeout(() => { this.needleTransform = `translate(-50%, -100%) rotate(${angle}deg)`; }, 100); }
}

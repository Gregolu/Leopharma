import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireFlashComponent } from './pages/questionnaire-flash/questionnaire-flash.component';
import { PredispositionScoreComponent } from './pages/predisposition-score/predisposition-score.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PhotoAnalysisComponent } from './pages/photo-analysis/photo-analysis.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { ScoreComponent } from './pages/score/score.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'questionnaire-flash', component: QuestionnaireFlashComponent },
  { path: 'predisposition-score', component: PredispositionScoreComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'photo-analysis', component: PhotoAnalysisComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'score', component: ScoreComponent }
];
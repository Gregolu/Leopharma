import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { QuestionnaireDetailComponent } from './pages/questionnaire-detail/questionnaire-detail.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireFlashComponent } from './pages/questionnaire-flash/questionnaire-flash.component';
import { PredispositionScoreComponent } from './pages/predisposition-score/predisposition-score.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PhotoAnalysisComponent } from './pages/photo-analysis/photo-analysis.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { DossierComponent } from './pages/dossier/dossier.component';
import { ShareComponent } from './pages/share/share.component';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';

import { NetworkComponent } from './pages/network/network.component';
import { NetworkMapComponent } from './pages/network-map/network-map.component';
import { NetworkProfileComponent } from './pages/network-profile/network-profile.component';

export const routes: Routes = [
  { path: 'network', component: NetworkComponent },
  { path: 'network-map', component: NetworkMapComponent },
  { path: 'network-profile/:id', component: NetworkProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'questionnaire-flash', component: QuestionnaireFlashComponent },
  { path: 'predisposition-score', component: PredispositionScoreComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'photo-analysis', component: PhotoAnalysisComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'dossier', component: DossierComponent },
  { path: 'share', component: ShareComponent },
  { path: 'monitoring', component: MonitoringComponent }
  ,{ path: 'profile', component: ProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'questionnaire-detail/:id', component: QuestionnaireDetailComponent }
];

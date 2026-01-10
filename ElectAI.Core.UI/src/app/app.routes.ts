import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { ElectionsComponent } from './pages/elections.component';
import { EventsComponent } from './pages/events.component';
import { CricketComponent } from './pages/games/cricket.component';
import { FootballComponent } from './pages/games/football.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'elections', component: ElectionsComponent },
  { path: 'cricket', component: CricketComponent },
  { path: 'football', component: FootballComponent },
  { path: 'events', component: EventsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
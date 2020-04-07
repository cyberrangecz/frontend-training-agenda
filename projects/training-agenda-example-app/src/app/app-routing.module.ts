import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {Kypo2AuthGuardWithLogin, Kypo2AuthProviderPickerComponent, Kypo2NotAuthGuardService} from 'kypo2-auth';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [Kypo2AuthGuardWithLogin]
  },
  {
    path: 'training-definition',
    loadChildren: () => import('').then(m => m.),
    data: {
      breadcrumb: 'Definition',
      title: 'Training Definition Overview'
    }
  },
  {
    path: 'training-instance',
    loadChildren: () => import('').then(m => m.),
    data: {
      breadcrumb: 'Instance',
      title: 'Training Instance Overview'
    }
  },
  {
    path: 'training-run',
    loadChildren: () => import('').then(m => m),
    data: {
      breadcrumb: 'Run',
      title: 'Training Run Overview'
    }
  },
  {
    path: 'login',
    component: Kypo2AuthProviderPickerComponent,
    canActivate: [Kypo2NotAuthGuardService]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications-overview.module').then(m => m.NotificationsOverviewModule),
    data: { breadcrumb: 'Notifications'}
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [Kypo2AuthGuardWithLogin]
  },
  {
    path: 'logout-confirmed',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: true
  } as ExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

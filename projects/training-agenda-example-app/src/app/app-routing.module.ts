import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SentinelAuthProviderListComponent } from '@sentinel/auth/components';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [SentinelAuthGuardWithLogin],
  },
  {
    path: 'training-definition',
    loadChildren: () =>
      import('./lazy-loaded-modules/definition/overview/training-definition-overview.module').then(
        (m) => m.TrainingDefinitionOverviewModule
      ),
    data: {
      breadcrumb: 'Definition',
      title: 'Linear Training Definition Overview',
    },
  },
  {
    path: 'adaptive-definition',
    loadChildren: () =>
      import('./lazy-loaded-modules/adaptive-definition/overview/adaptive-definition-overview.module').then(
        (m) => m.AdaptiveDefinitionOverviewModule
      ),
    data: {
      breadcrumb: 'Definition',
      title: 'Adaptive Training Definition Overview',
    },
  },
  {
    path: 'training-instance',
    loadChildren: () =>
      import('./lazy-loaded-modules/instance/overview/training-instance-overview.module').then(
        (m) => m.TrainingInstanceOverviewModule
      ),
    data: {
      breadcrumb: 'Instance',
      title: 'Linear Training Instance Overview',
    },
  },
  {
    path: 'adaptive-instance',
    loadChildren: () =>
      import('./lazy-loaded-modules/adaptive-instance/overview/adaptive-instance-overview.module').then(
        (m) => m.AdaptiveInstanceOverviewModule
      ),
    data: {
      breadcrumb: 'Instance',
      title: 'Adaptive Training Instance Overview',
    },
  },
  {
    path: 'training-run',
    loadChildren: () =>
      import('./lazy-loaded-modules/run/overview/training-run-overview.module').then(
        (m) => m.TrainingRunOverviewModule
      ),
    data: {
      breadcrumb: 'Run',
      title: 'Training Run Overview',
    },
  },
  {
    path: 'login',
    component: SentinelAuthProviderListComponent,
    canActivate: [SentinelNegativeAuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications-overview.module').then((m) => m.NotificationsOverviewModule),
    data: { breadcrumb: 'Notifications' },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'logout-confirmed',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking',
      paramsInheritanceStrategy: 'always',
    } as ExtraOptions),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

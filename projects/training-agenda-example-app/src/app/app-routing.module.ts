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
        path: 'coop-definition',
        loadChildren: () =>
            import('./lazy-loaded-modules/definition/overview/coop-training-definition-overview.module').then(
                (m) => m.CoopTrainingDefinitionOverviewModule,
            ),
        data: {
            breadcrumb: 'Coop Definition',
            title: 'Coop Training Definition Overview',
        },
    },
    {
        path: 'linear-definition',
        loadChildren: () =>
            import('./lazy-loaded-modules/definition/overview/linear-training-definition-overview.module').then(
                (m) => m.LinearTrainingDefinitionOverviewModule,
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
                (m) => m.AdaptiveDefinitionOverviewModule,
            ),
        data: {
            breadcrumb: 'Definition',
            title: 'Adaptive Training Definition Overview',
        },
    },
    {
        path: 'linear-instance',
        loadChildren: () =>
            import('./lazy-loaded-modules/instance/overview/linear-training-instance-overview.module').then(
                (m) => m.LinearTrainingInstanceOverviewModule,
            ),
        data: {
            breadcrumb: 'Instance',
            title: 'Linear Training Instance Overview',
        },
    },
    {
        path: 'coop-instance',
        loadChildren: () =>
            import('./lazy-loaded-modules/instance/overview/coop-training-instance-overview.module').then(
                (m) => m.CoopTrainingInstanceOverviewModule,
            ),
        data: {
            breadcrumb: 'Instance',
            title: 'Coop Training Instance Overview',
        },
    },
    {
        path: 'training-instance-cheating-detection',
        loadChildren: () =>
            import(
                './lazy-loaded-modules/instance/overview/detail/cheating-detection/training-instance-cheating-detection.module'
            ).then((m) => m.CheatingDetectionOverviewModule),
        data: {
            breadcrumb: 'Cheating Detection',
            title: 'Linear Training Instance Cheating Detection',
        },
    },
    {
        path: 'cheating-detection-detection-event',
        loadChildren: () =>
            import(
                './lazy-loaded-modules/instance/overview/detail/cheating-detection/detection-event/training-instance-detection-event.module'
            ).then((m) => m.TrainingInstanceDetectionEventModule),
        data: {
            breadcrumb: 'Detection Event',
            title: 'Cheating Detection Events',
        },
    },
    {
        path: 'adaptive-instance',
        loadChildren: () =>
            import('./lazy-loaded-modules/adaptive-instance/overview/adaptive-instance-overview.module').then(
                (m) => m.AdaptiveInstanceOverviewModule,
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
                (m) => m.TrainingRunOverviewModule,
            ),
        data: {
            breadcrumb: 'Run',
            title: 'Training Run Overview',
        },
    },
    {
        path: 'mitre-techniques',
        loadChildren: () =>
            import('./lazy-loaded-modules/mitre-techniques/mitre-techniques.module').then(
                (m) => m.MitreTechniquesModule,
            ),
        data: {
            breadcrumb: 'MITRE Techniques',
            title: 'MITRE Techniques',
            showSwitch: false,
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

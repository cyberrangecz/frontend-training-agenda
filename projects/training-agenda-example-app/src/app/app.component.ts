import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AgendaContainer } from '@sentinel/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SentinelAuthService, User } from '@sentinel/auth';
import { LoadingService } from './services/loading.service';
import { NavAgendaContainerConfig, NavBuilder } from '@crczp/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isLoading$: Observable<boolean>;
    activeUser$: Observable<User>;
    title$: Observable<string>;
    agendaContainers$: Observable<AgendaContainer[]>;
    notificationRoute = 'notifications';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private auth: SentinelAuthService,
        private loadingService: LoadingService,
    ) {
        this.activeUser$ = this.auth.activeUser$;
        this.isLoading$ = this.loadingService.isLoading$;
        this.title$ = this.getTitleFromRouter();

        this.agendaContainers$ = this.auth.activeUser$.pipe(
            filter((user) => user !== null && user !== undefined),
            map((user) => {
                const roles = this.buildRolesDictionary(user);
                const definition: NavAgendaContainerConfig = {
                    label: 'Definition',
                    agendas: [
                        {
                            label: 'Linear',
                            path: 'linear-definition',
                            canActivate: () => roles['ROLE_TRAINING_DESIGNER'],
                        },
                        {
                            label: 'Coop',
                            path: 'coop-definition',
                            canActivate: () => roles['ROLE_TRAINING_DESIGNER'],
                        },
                        {
                            label: 'Adaptive',
                            path: 'adaptive-definition',
                            canActivate: () => roles['ROLE_ADAPTIVE_TRAINING_DESIGNER'],
                        },
                    ],
                };
                const instance: NavAgendaContainerConfig = {
                    label: 'Instance',
                    agendas: [
                        {
                            label: 'Linear',
                            path: 'linear-instance',
                            canActivate: () => roles['ROLE_TRAINING_ORGANIZER'],
                        },
                        {
                            label: 'Coop',
                            path: 'coop-instance',
                            canActivate: () => roles['ROLE_TRAINING_ORGANIZER'],
                        },
                        {
                            label: 'Adaptive',
                            path: 'adaptive-instance',
                            canActivate: () => roles['ROLE_ADAPTIVE_TRAINING_ORGANIZER'],
                        },
                    ],
                };

                return NavBuilder.buildNav([
                    {
                        label: 'Trainings',
                        agendas: [
                            definition,
                            instance,
                            {
                                label: 'Run',
                                path: 'training-run',
                            },
                        ],
                    },
                ]);
            }),
        );
    }

    private getTitleFromRouter(): Observable<string> {
        return this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            map((route) => route.snapshot),
            map((snapshot) => snapshot.data.title),
        );
    }

    onLogin(): void {
        this.auth.login();
    }

    onLogout(): void {
        this.auth.logout();
    }

    private buildRolesDictionary(user: User): { [key: string]: true } {
        return user.roles.reduce(
            (acc, role) => {
                acc[role.roleType] = true;
                return acc;
            },
            {} as { [key: string]: true },
        );
    }
}

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Agenda, AgendaContainer } from '@sentinel/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SentinelAuthService, User } from '@sentinel/auth';
import { LoadingService } from './services/loading.service';

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
            map((user) => this.buildNav(user)),
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

    buildNav(user: User): AgendaContainer[] {
        const containers: AgendaContainer[] = [];
        const agendas = [];
        const rolesDictionary = this.buildRolesDictionary(user);

        if (rolesDictionary['ROLE_TRAINING_DESIGNER'] || rolesDictionary['ROLE_ADAPTIVE_DESIGNER']) {
            const container = new AgendaContainer('Definition', []);
            if (rolesDictionary['ROLE_TRAINING_DESIGNER']) {
                container.children.push(new Agenda('Linear', 'training-definition'));
            }
            if (rolesDictionary['ROLE_ADAPTIVE_TRAINING_DESIGNER']) {
                container.children.push(new Agenda('Adaptive', 'adaptive-definition'));
            }
            agendas.push(container);
        }

        if (rolesDictionary['ROLE_TRAINING_ORGANIZER'] || rolesDictionary['ROLE_ADAPTIVE_TRAINING_ORGANIZER']) {
            const container = new AgendaContainer('Instance', []);
            if (rolesDictionary['ROLE_TRAINING_ORGANIZER']) {
                container.children.push(new Agenda('Linear', 'training-instance'));
            }
            if (rolesDictionary['ROLE_ADAPTIVE_TRAINING_ORGANIZER']) {
                container.children.push(new Agenda('Adaptive', 'adaptive-instance'));
            }
            agendas.push(container);
        }

        if (rolesDictionary['ROLE_TRAINING_TRAINEE']) {
            agendas.push(new Agenda('Run', 'training-run'));
        }
        if (agendas.length > 0) {
            containers.push(new AgendaContainer('Trainings', agendas));
        }
        return containers;
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

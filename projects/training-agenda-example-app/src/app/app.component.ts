import { AfterViewInit, Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Agenda, AgendaContainer } from '@sentinel/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SentinelAuthService, User } from '@sentinel/auth';
import { LoadingService } from './services/loading.service';
import { DOCUMENT } from '@angular/common';

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
    @Inject(DOCUMENT) private document: Document,
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
    const roles = user.roles;
    if (roles.some((role) => role.roleType === 'ROLE_TRAINING_DESIGNER')) {
      agendas.push(
        new AgendaContainer('Definition', [
          new Agenda('Linear', 'training-definition'),
          new Agenda('Adaptive', 'adaptive-definition'),
        ]),
      );
    }
    if (roles.some((role) => role.roleType === 'ROLE_TRAINING_ORGANIZER')) {
      agendas.push(
        new AgendaContainer('Instance', [
          new Agenda('Linear', 'training-instance'),
          new Agenda('Adaptive', 'adaptive-instance'),
        ]),
      );
    }
    if (roles.some((role) => role.roleType === 'ROLE_TRAINING_TRAINEE')) {
      agendas.push(new Agenda('Run', 'training-run'));
    }
    if (agendas.length > 0) {
      containers.push(new AgendaContainer('Trainings', agendas));
    }
    return containers;
  }
}

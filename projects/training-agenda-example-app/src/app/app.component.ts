import { Component } from '@angular/core';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {Agenda, AgendaContainer} from 'csirt-mu-layout';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeUser$: Observable<User>;
  title$: Observable<string>;
  agendaContainers$: Observable<AgendaContainer[]>;
  notificationRoute = 'notifications';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private auth: Kypo2AuthService,
  ) {
    this.activeUser$ = this.auth.activeUser$;
    this.title$ = this.getTitleFromRouter();

    this.agendaContainers$ = this.auth.activeUser$
      .pipe(
        filter(user => user !== null && user !== undefined),
        map(user => this.buildNav(user))
      );
  }

  private getTitleFromRouter(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      map((route) => route.snapshot),
      map((snapshot) => snapshot.data.title)
    );
  }

  onLogin() {
    this.auth.login();
  }

  onLogout() {
    this.auth.logout();
  }

  buildNav(user: User): AgendaContainer[] {
    const containers: AgendaContainer[] = [];
    const agendas: Agenda[] = [];
    const roles = user.roles;
    if (roles.some(role => role.roleType === 'ROLE_TRAINING_DESIGNER')) {
      agendas.push(new Agenda('Definition', 'training-definition'));
    }
    if (roles.some(role => role.roleType === 'ROLE_TRAINING_ORGANIZER')) {
      agendas.push(new Agenda('Instance', 'training-instance'));
    }
    if (roles.some(role => role.roleType === 'ROLE_TRAINING_TRAINEE')) {
      agendas.push(new Agenda('Run', 'training-run'));
    }
    if (agendas.length > 0) {
      containers.push(new AgendaContainer('Trainings', agendas));
    }
    return containers;
  }
}

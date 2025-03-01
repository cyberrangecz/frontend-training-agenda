# CyberRangeᶜᶻ Platform Training Agenda

Training Agenda is a library containing components and services to design, organize and play training.
It is developed as a frontend of [Training service](https://github.com/cyberrangecz/backend-training)

The library follows smart-dumb architecture. Smart components are exported from the library, and you can use them at your will. The project contains example implementation with lazy loading modules which you can use as an inspiration.
You can modify the behaviour of components by implementing abstract service class and injecting it through Angular dependency injection.

## Features

* Components and services for designing training definitions
* Components and services for designing training levels
* Components and services for organizing training instances
* Components and services for previewing and playing training runs
* Visualizations of training runs
* Default routing (overridable)
* Errors, notifications, and navigation services
* CanDeactivate interface on all main components
* Resolvers for all main components

## Usage

To use the training agenda in your Angular application follow these steps:

1. Run `npm install @crczp/training-agenda`
2. Install all peer dependencies
3. Create config class extending `TrainingAgendaConfig` from the library. Config contains following options:
    + pollingPeriod
    + defaultPaginationSize
    + visualizationConfig
    + topologyConfig
4. Import specific modules containing components (for example `TrainingDefinitionOverviewComponentsModule`) and provide config through `.forRoot()` method.
5. If you do not override the services, you will also need to provide API service. See [Training api](https://github.com/cyberrangecz/frontend-training-api).
6. You need to provide implementation of abstract services `ClientErrorHandlerService` and `ClientNotificationService` for error handling and notification displaying.
7. Optionally, you can override `TrainingNavigator` service to provide custom navigation if you do not want to use default routes.
8. Optionally, cou can override and provide own implementation of services

For example, you would add `TrainingDefinitionOverviewComponent` like this:

1. Create feature module `TrainingDefinitionOverviewModule` containing all necessary imports and providers

```
@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionOverviewRoutingModule,
    TrainingDefinitionOverviewComponentsModule.forRoot(agendaConfig),
    TrainingApiModule.forRoot(apiConfig),
  ],
  providers: [
    { provide: TrainingErrorHandler, useClass: ClientErrorHandlerService },
    { provide: TrainingNotificationService, useClass: ClientNotificationService },
  ],
})
export class TrainingDefinitionOverviewModule {}
```

1. Create routing module importing the `TrainingDefinitionOverviewModule`

```
const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionOverviewComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDefinitionOverviewRoutingModule {}
```

1. Lazy load the module in the parent routing module

```
  {
    path: TRAINING_DEFINITION_PATH,
    loadChildren: () => import('./lazy-loaded-modules/definition/overview/training-definition-overview.module).then((m) => m.TrainingDefinitionOverviewModule)
  }
```

## Example

To see the library in work and to see example setup, you can run the example app.

1. Pull and run the dependencies:
    + [Training service](https://github.com/cyberrangecz/backend-training)
    + [Adaptive training service](https://github.com/cyberrangecz/backend-adaptive-training)
    + [Sandbox service](https://github.com/cyberrangecz/backend-sandbox-service)
    + [Training feedback service](https://github.com/cyberrangecz/backend-training-feedback)
    + [Mitre techniques service](https://github.com/cyberrangecz/backend-mitre-technique-service)
    + [User and group service](https://github.com/cyberrangecz/backend-user-and-group)

    + Or run the whole [deployment](https://github.com/cyberrangecz/devops-helm)
2. Configure [environment.ts](projects/training-agenda-example-app/src/environments/environment.ts), pointing to the services.
3. Install dependencies by running `npm install`.
4. Run the project by running `npm run start`.
5. Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files. The app will be running with self-signed certificate, so you will need to accept the security exception in the browser.

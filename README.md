# KYPO Training Agenda

KYPO Training Agenda is a library containing components and services to design, organize and play training.
It is developed as a frontend of [KYPO Training service](https://gitlab.ics.muni.cz/kypo-crp/backend-java/kypo2-training)

The library follows smart-dumb architecture. Smart components are exported from the library, and you can use them at your will. The project contains example implementation with lazy loading modules which you can use as an inspiration.
You can modify the behaviour of components by implementing abstract service class and injecting it through Angular dependency injection.

## Prerequisites

To use the library you need to have installed:

* NPM with access to [KYPO registry](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)

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

1. Run `npm install @kypo/training-agenda`
1. Install all peer dependencies
1. Create config class extending `TrainingAgendaConfig` from the library. Config contains following options:
    +   pollingPeriod
    +   defaultPaginationSize
    +   visualizationConfig
    +   kypo2TopologyConfig
1. Import specific modules containing components (for example `TrainingDefinitionOverviewComponentsModule`) and provide config through `.forRoot()` method.
1. If you do not override the services, you will also need to provide API service. See [kypo-training-api library](https://gitlab.ics.muni.cz/kypo-crp/frontend-angular/apis/kypo-training-api).
1. You need to provide implementation of abstract services `ClientErrorHandlerService` and `ClientNotificationService` for error handling and notification displaying.
1. Optionally, you can override `TrainingNavigator` service to provide custom navigation if you do not want to use default routes.
1. Optionally, cou can override and provide own implementation of services

For example, you would add `TrainingDefinitionOverviewComponent` like this:

1. Create feature module `TrainingDefinitionOverviewModule` containing all necessary imports and providers

```
@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionOverviewRoutingModule,
    TrainingDefinitionOverviewComponentsModule.forRoot(agendaConfig),
    KypoTrainingApiModule.forRoot(apiConfig),
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
To run the example you need to run [KYPO Training Service](https://gitlab.ics.muni.cz/kypo-crp/backend-java/kypo2-training) or have access to a running instance and provide the URL to the service in when importing API module.

1. Clone this repository
1. Run `npm install`
1. Run `ng serve --ssl`
1. See the app at `https://localhost:4200`

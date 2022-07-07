// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Server url
export const baseURL = 'https://172.19.0.22';
// Frontend url
export const homeURL = 'https://localhost:4200';
// trainings service url
export const trainingURL = baseURL + '/kypo-rest-training/api/v1/';
// adaptive trainings service url
export const adaptiveTrainingURL = baseURL + '/kypo-adaptive-training/api/v1/';
// sandboxes service url
export const sandboxesURL = baseURL + '/kypo-sandbox-service/api/v1/';

export const userAngGroupURL = baseURL + '/kypo-rest-user-and-group/api/v1/';

export const elasticSearchURL = baseURL + '/kypo-elasticsearch-service/api/v1/';

export const mitreTechniquesURL = baseURL + '/kypo-mitre-technique-service/api/v1/';

export const kypoTopologyConfig = {
  topologyRestUrl: sandboxesURL,
  decoratorsRestUrl: '', // OBSOLETE
  defaultDecoratorRefreshPeriodInSeconds: 3, // OBSOLETE
  useRealTime: false, // OBSOLETE
  useDecorators: false, // OBSOLETE
  guacamoleConfig: {
    url: baseURL + '/guacamole/',
    username: 'guacuser',
    password: 'guacuser',
  },
};

export const visualizationConfig = {
  trainingBasePath: trainingURL,
  adaptiveBasePath: adaptiveTrainingURL,
  elasticSearchBasePath: elasticSearchURL,
};

export const environment = {
  production: true,
  trainingAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    visualizationConfig,
    kypoTopologyConfig,
  },

  trainingApiConfig: {
    trainingBasePath: trainingURL,
    adaptiveBasePath: adaptiveTrainingURL,
    mitreTechniqueBasePath: mitreTechniquesURL,
  },

  sandboxApiConfig: {
    sandboxRestBasePath: sandboxesURL,
  },

  authConfig: {
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    interceptorAllowedUrls: [
      // all matching urls will have authorization token header
      baseURL,
    ],
    authorizationStrategyConfig: {
      authorizationUrl: userAngGroupURL + 'users/info',
    },
    providers: [
      // OIDC providers
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        oidcConfig: {
          issuer: 'https://172.19.0.22:8443/csirtmu-dummy-issuer-server/',
          clientId: '6e81dde5-91c0-4a9d-b21b-d443989fd1b9',
          redirectUri: homeURL, // redirect after successful login
          scope: 'openid email profile',
          logoutUrl: 'https://172.19.0.22/csirtmu-dummy-issuer-server/endsession',
          postLogoutRedirectUri: homeURL + '/logout-confirmed/',
          silentRefreshRedirectUri: homeURL + '/silent-refresh.html',
          clearHashAfterLogin: true, // remove token and other info from url after login
        },
      },
    ],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

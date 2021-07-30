// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Server url
export const baseURL = 'https://172.19.0.22';
// Frontend url
export const homeURL = 'https://localhost:4200';
// trainings service url
export const trainingURL = 'http://localhost:8083/kypo-rest-training/api/v1/';
// adaptive trainings service url
export const adaptiveTrainingURL = 'http://localhost:8082/kypo-adaptive-training/api/v1/';
// sandboxes service url
export const sandboxesURL = baseURL + '/kypo-sandbox-service/api/v1/';

export const userAngGroupURL = baseURL + '/kypo-rest-user-and-group/api/v1/';

export const elasticSearchURL = baseURL + '/kypo-elasticsearch-service/api/v1/';

export const kypo2TopologyConfig = {
  topologyRestUrl: sandboxesURL,
  decoratorsRestUrl: '', // OBSOLETE
  defaultDecoratorRefreshPeriodInSeconds: 3, // OBSOLETE
  useRealTime: false, // OBSOLETE
  useDecorators: false, // OBSOLETE
};

export const visualizationConfig = {
  adaptiveTrainingBasePath: adaptiveTrainingURL,
  trainingBasePath: trainingURL,
  adaptiveBasePath: adaptiveTrainingURL,
  elasticSearchBasePath: elasticSearchURL,
};

export const environment = {
  production: false,
  trainingAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    visualizationConfig,
    kypo2TopologyConfig,
  },

  trainingApiConfig: {
    trainingBasePath: trainingURL,
    adaptiveBasePath: adaptiveTrainingURL,
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
      'http://localhost',
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
          clientId: 'd770890a-fa2f-4ca4-a998-1d1a9f636675',
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

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Server url
export const baseURL = 'https://172.19.0.22';
// Frontend url
export const homeURL = 'https://localhost:4200';
// trainings service url
export const trainingURL = baseURL + '/kypo2-rest-training/api/v1/';
// sandboxes service url
export const sandboxesURL = baseURL + '/kypo-sandbox-service/api/v1/';

export const userAngGroupURL = baseURL + '/kypo2-rest-user-and-group/api/v1/';

export const elasticSearchURL = baseURL + '/kypo-elasticsearch-service/api/v1/';

export const kypo2TopologyConfig = {
  topologyRestUrl: sandboxesURL,
  decoratorsRestUrl: '', // OBSOLETE
  defaultDecoratorRefreshPeriodInSeconds: 3, // OBSOLETE
  useRealTime: false, // OBSOLETE
  useDecorators: false, // OBSOLETE
};

export const visualizationConfig = {
  trainingBasePath: trainingURL,
  elasticSearchBasePath: elasticSearchURL,
};

export const environment = {
  production: true,
  trainingAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    visualizationConfig,
    kypo2TopologyConfig,
  },

  trainingApiConfig: {
    trainingBasePath: trainingURL,
  },

  sandboxApiConfig: {
    sandboxRestBasePath: sandboxesURL,
  },

  kypo2AuthConfig: {
    maxRetryAttempts: 3, // How many attempts to try to get user info from user and group service before emitting error
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    tokenInterceptorAllowedUrls: [
      // all matching urls will have authorization token header
      baseURL,
    ],
    userInfoRestUri: userAngGroupURL,
    providers: [
      // OIDC providers
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000, // how often check if tokens are still valid
        oidcConfig: {
          issuer: 'https://172.19.0.22:443/csirtmu-dummy-issuer-server/',
          clientId: '0bf33f00-2700-4efb-ab09-186076f85c7d',
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
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

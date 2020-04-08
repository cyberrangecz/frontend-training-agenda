// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Server url
export const baseURL = 'https://kypo-devel.ics.muni.cz';
// Frontend url
export const homeURL = 'https://localhost:4200';
// trainings service url
export const trainingURL = baseURL + ':8083/kypo2-rest-training/api/v1/';
// sandboxes service url
export const sandboxesURL = baseURL + ':8080/kypo-sandbox-service/api/v1/';

export const userAngGroupURL = baseURL + ':8084/kypo2-rest-user-and-group/api/v1/';

export const kypo2TopologyConfig =  {
  topologyRestUrl: sandboxesURL,
  decoratorsRestUrl: '', // OBSOLETE
  defaultDecoratorRefreshPeriodInSeconds: 3, // OBSOLETE
  useRealTime: false, // OBSOLETE
  useDecorators: false, // OBSOLETE
};

export const visualizationConfig = {
  trainingBasePath: trainingURL
};

export const environment = {
  production: false,
  trainingAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    visualizationConfig,
    kypo2TopologyConfig
  },

  trainingApiConfig: {
    trainingBasePath: trainingURL
  },

  sandboxApiConfig: {
    sandboxRestBasePath: sandboxesURL
  },

  kypo2AuthConfig: {
    maxRetryAttempts: 3, // How many attempts to try to get user info from user and group service before emitting error
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    tokenInterceptorAllowedUrls: [ // all matching urls will have authorization token header
      baseURL
    ],
    userInfoRestUri: userAngGroupURL,
    providers: [ // OIDC providers
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000, // how often check if tokens are still valid
        oidcConfig: {
          issuer: 'https://oidc.muni.cz/oidc/',
          clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
          redirectUri: homeURL, // redirect after successful login
          scope: 'openid email profile',
          logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
          postLogoutRedirectUri: homeURL + '/logout-confirmed/',
          silentRefreshRedirectUri: homeURL + '/silent-refresh.html',
          clearHashAfterLogin: true // remove token and other info from url after login
        },
      },
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

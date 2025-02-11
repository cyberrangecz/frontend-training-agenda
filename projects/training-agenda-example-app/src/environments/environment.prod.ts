// OIDC url
const OIDC_URL = 'https://172.19.0.22';
// backend url
const API_URL = 'https://172.19.0.22';
// frontend home url
const HOME_URL = 'https://localhost:4200';

export const topologyConfig = {
    topologyRestUrl: API_URL + '/sandbox-service/api/v1/',
    pollingPeriod: 5000,
    retryAttempts: 3,
    guacamoleConfig: {
        url: API_URL + '/guacamole/',
        username: 'guacuser',
        password: 'guacuser'
    }
};

export const visualizationConfig = {
    trainingBasePath: API_URL + '/training/api/v1/',
    adaptiveBasePath: API_URL + '/adaptive-training/api/v1/',
    feedbackBasePath: API_URL + '/training-feedback/api/v1/'
};

export const environment = {
    production: true,
    trainingAgendaConfig: {
        pollingPeriod: 5000,
        defaultPaginationSize: 10,
        visualizationConfig,
        topologyConfig
    },

    trainingApiConfig: {
        trainingBasePath: API_URL + '/training/api/v1/',
        adaptiveBasePath: API_URL + '/adaptive-training/api/v1/',
        mitreTechniqueBasePath: API_URL + '/mitre-technique-service/api/v1/'
    },

    sandboxApiConfig: {
        sandboxRestBasePath: API_URL + '/sandbox-service/api/v1/'
    },

    authConfig: {
        guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
        guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
        interceptorAllowedUrls: [API_URL, OIDC_URL],
        authorizationStrategyConfig: {
            authorizationUrl: API_URL + '/user-and-group/api/v1/users/info'
        },
        providers: [
            {
                label: 'Login with local Keycloak',
                textColor: 'white',
                backgroundColor: '#1e2173',
                oidcConfig: {
                    requireHttps: true,
                    clearHashAfterLogin: true,
                    issuer: OIDC_URL + '/keycloak/realms/CRCZP',
                    clientId: 'CRCZP-client',
                    redirectUri: HOME_URL,
                    scope: 'openid email profile offline_access',
                    logoutUrl: OIDC_URL + '/keycloak/realms/CRCZP/protocol/openid-connect/logout',
                    silentRefreshRedirectUri: HOME_URL + '/silent-refresh.html',
                    postLogoutRedirectUri: HOME_URL + '/logout-confirmed'
                }
            }
        ]
    }
};

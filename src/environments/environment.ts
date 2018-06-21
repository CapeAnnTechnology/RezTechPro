// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SSO_URI: 'https://reztechpro-sso.herokuapp.com/',
  API_URI: 'http://10.211.55.5:3000/v2.0/',
  BASE_API: 'http://10.211.55.5:3000/v2.0/',
  BASE_URI: 'http://10.211.55.5:4200',
  AUTH0_CLIENT_DOMAIN: 'reztechpro.auth0.com',
  AUTH0_CLIENT_ID: 'SJLqm1Itq4vSMmc8NhEl59AgV5zVAHTu',
  NAMESPACE: 'https://reztechpro.com/roles'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

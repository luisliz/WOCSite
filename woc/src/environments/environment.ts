// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    /*firebase: {
      apiKey: "AIzaSyCIUFSaKhAX1z3aI3-iOqeCQGOATPP7XHY",
      authDomain: "whats-on-campus.firebaseapp.com",
      databaseURL: "https://whats-on-campus.firebaseio.com",
      projectId: "whats-on-campus",
      storageBucket: "whats-on-campus.appspot.com",
      messagingSenderId: "2443063959"
  },*/
    API_URL: "https://wocpr.com/api/WhatsOnCampus/",
    IMAGE_URL: "https://wocpr.com"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

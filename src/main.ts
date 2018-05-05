import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {DEFAULT_STATE, INIT_PARAMS} from "./app/app.config";

if (environment.production) {
  enableProdMode();
}

function initApp(initData: any, defaultState: string) {
  platformBrowserDynamic([
    {provide: INIT_PARAMS, useValue: initData},
    {provide: DEFAULT_STATE, useValue: defaultState}
  ])
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

function initTag() {
  let apidateTag = document.createElement('apidate-root');
  document.body.appendChild(apidateTag);
}

if (document.getElementsByTagName('apidate-root').length > 0) {
  initApp({}, '/accueil');
} else {
  window['openApidateForm'] = function (initData: any) {
    initTag();
    initApp(initData, 'form');
  };

  window['openApidateDisplay'] = function (initData: any) {
    initTag();
    initApp(initData, 'details');
  };
}

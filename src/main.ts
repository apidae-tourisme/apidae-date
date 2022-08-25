import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {DEFAULT_STATE, INIT_PARAMS} from "./app/app.config";

if (environment['production']) {
  enableProdMode();
  if (document.getElementsByTagName('apidate-root').length > 0) {
    initApp({}, null);
  } else {
    window['openApidateForm'] = function (initData: any) {
      initTag();
      initApp(initData, ['/modal', 'form', initData.type, initData.externalId]);
    };

    window['openApidateDisplay'] = function (initData: any) {
      initTag();
      initApp(initData, ['/modal', 'details', initData.type, initData.externalId]);
    };
  }
}

if (environment['standalone']) {
  enableProdMode();
  window['openApiHoursForm'] = function (title, startDate, endDate, externalId, externalType, initParams) {
    initTag();
    let initData = {
      ...{
        title: title, subtitle: 'Période du ' + startDate + ' au ' + endDate, externalType: externalType,
        type: 'apidae_period', externalId: externalId
      },
      ...initParams
    };
    initApp(initData, ['/modal', 'form', initData.type, initData.externalId]);
  };
}

function initApp(initData: any, defaultState: string[]) {
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

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
  window['openApiHoursForm'] = function (title, timeSchedule, initParams) {
    console.log('openApiHoursForm - timeSchedule: ' + JSON.stringify(timeSchedule));
    if (timeSchedule.startDate && timeSchedule.endDate && (timeSchedule.externalId || timeSchedule.externalType)) {
      try {
        initTag();
        const startDate = new Date(Date.parse(timeSchedule.startDate)).toLocaleDateString(),
          endDate = new Date(Date.parse(timeSchedule.endDate)).toLocaleDateString();
        let initData = {
          ...{title: title, subtitle: 'Période du ' + startDate + ' au ' + endDate, type: 'apidae_period'},
          ...initParams
        };
        if (timeSchedule.externalType) { initData.externalType = timeSchedule.externalType; }
        if (timeSchedule.externalId) { initData.externalId = timeSchedule.externalId; }
        if (timeSchedule.timePeriods) { initData.timePeriods = timeSchedule.timePeriods; }

        initApp(initData, ['/modal', 'form', initData.type, initData.externalId || '']);

      } catch (e) {
        console.error("openApiHoursForm error: " + e);
      }
    } else {
      console.error("Cannot open ApiHours form - Please make sure that input timeSchedule " +
        "has valid startDate, endDate and externalId or externalType properties.");
    }
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

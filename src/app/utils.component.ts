import {Component} from '@angular/core';
import {TimeSchedule} from "../models/time-schedule";
import {StorageService} from "../services/storage.service";
import {TextsService} from "../services/texts.service";
import {TypeConfig} from "../models/type-config";

@Component({
  selector: 'apidate-utils',
  template: ``
})
export class UtilsComponent {
  constructor(private storageService: StorageService, private textsService: TextsService) {
    window['apihours'] = {
      loadApiHoursOpening: (externalId) => this.loadSchedule(externalId, 'apidae_period')
    };
  }

  private loadSchedule(externalId, configType): Promise<string> {
    console.log('loadSchedule: ' + externalId);
    return this.storageService.getConfig(configType).toPromise().then((config: TypeConfig) => {
      return this.storageService.getSchedule(config, false, {externalId: externalId}).toPromise()
        .then((timeSchedule: TimeSchedule) => {
          return this.storageService.serializedTimePeriods(timeSchedule, config, this.textsService);
        });
    });
  }
}

import {Component, Inject, ViewChild} from '@angular/core';
import {TimeSchedule} from "../models/time-schedule";
import {Params} from "@angular/router";
import {INIT_PARAMS} from "./app.config";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TimeScheduleComponent} from "../components/time-schedule.component";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'apidate-form',
  template: ''
})
export class AppComponent {

  @ViewChild('content') content;

  constructor(@Inject(INIT_PARAMS) initParams: Params, private modalService: NgbModal, private storageService: StorageService) {

    this.storageService.getSchedule(initParams.type, initParams.externalId).subscribe((timeSchedule: TimeSchedule) => {
      let ts = timeSchedule || new TimeSchedule(initParams);
      if (initParams.cloneId) {
        this.storageService.getSchedule(initParams.type, initParams.cloneId).subscribe((clonedSchedule: TimeSchedule) => {
          if (clonedSchedule) {
            ts.mergeParams(clonedSchedule);
          }
          this.initModal(initParams.title, initParams.subtitle, ts, initParams.onSubmit, initParams.onCancel, initParams.onDismiss);
        });
      } else {
        this.initModal(initParams.title, initParams.subtitle, ts, initParams.onSubmit, initParams.onCancel, initParams.onDismiss);
      }
    });
  }

  private initModal(title, subtitle, timeSchedule, onSubmit, onCancel, onDismiss) {
    let modalRef = this.modalService.open(TimeScheduleComponent, {windowClass: 'apidae_date', backdrop: 'static', keyboard: false});
    modalRef.result.then((result) => {
      if (result === 'submit' && onSubmit) {
        console.log('Apidate - onSubmit');
        onSubmit();
      } else if (result === 'cancel' && onCancel) {
        console.log('Apidate - onCancel');
        onCancel();
      }
    }, (reason) => {
      if (onDismiss) {
        console.log('Apidate - onDismiss');
        onDismiss();
      }
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.subtitle = subtitle;
    modalRef.componentInstance.timeSchedule = timeSchedule;
  }
}

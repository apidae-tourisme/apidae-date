import {Component, Inject, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {INIT_PARAMS} from "../app.config";
import {StorageService} from "../../services/storage.service";
import {TimeSchedule} from "../../models/time-schedule";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {DetailsComponent} from "../details/details.component";
import {TimeScheduleComponent} from "../form/time-schedule.component";
import 'rxjs/add/operator/switchMap';

const modalComponents = {form: TimeScheduleComponent, details: DetailsComponent};

@Component({
  template: ``
})
export class ModalComponent {

  @ViewChild('content') content;

  constructor(@Inject(INIT_PARAMS) initParams: Params, private route: ActivatedRoute, private modalService: NgbModal,
              private storageService: StorageService) {
    let contentComponent = modalComponents[this.route.snapshot.paramMap.get('content')];
    this.storageService.getSchedule(initParams.type, initParams.externalId).subscribe((timeSchedule: TimeSchedule) => {
      let ts = timeSchedule || new TimeSchedule(initParams);
      if (initParams.cloneId) {
        this.storageService.getSchedule(initParams.type, initParams.cloneId).subscribe((clonedSchedule: TimeSchedule) => {
          if (clonedSchedule) {
            ts.mergeParams(clonedSchedule);
          }
          this.initModal(contentComponent, initParams.title, initParams.subtitle, ts, initParams.onSubmit,
            initParams.onCancel, initParams.onDismiss, initParams.onLoad);
        });
      } else {
        this.initModal(contentComponent, initParams.title, initParams.subtitle, ts, initParams.onSubmit,
          initParams.onCancel, initParams.onDismiss, initParams.onLoad);
      }
    });
  }

  private initModal(contentComponent, title, subtitle, timeSchedule, onSubmit, onCancel, onDismiss, onLoad) {
    let modalRef = this.modalService.open(contentComponent, {windowClass: 'apidae_date', backdrop: 'static', keyboard: false});
    if (modalRef && onLoad) {
      console.log('Apidate - onLoad');
      onLoad();
    }
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
    }).then(() => {
      platformBrowserDynamic().destroy();
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.subtitle = subtitle;
    modalRef.componentInstance.timeSchedule = timeSchedule;
  }
}

import {Component, Inject, PlatformRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {INIT_PARAMS} from "../app.config";
import {StorageService} from "../../services/storage.service";
import {TimeSchedule} from "../../models/time-schedule";
import {DetailsComponent} from "../details/details.component";
import {TimeScheduleComponent} from "../form/time-schedule.component";

const modalComponents = {form: TimeScheduleComponent, details: DetailsComponent};

@Component({
  template: ``
})
export class ModalComponent {

  @ViewChild('content') content;

  constructor(@Inject(INIT_PARAMS) initParams: Params, private route: ActivatedRoute, private modalService: NgbModal,
              private storageService: StorageService, private platform: PlatformRef) {
    let contentComponent = modalComponents[this.route.snapshot.paramMap.get('content')];
    this.storageService.getSchedule(initParams).subscribe((timeSchedule: TimeSchedule) => {
      this.initModal(contentComponent, initParams.title, initParams.subtitle, timeSchedule, initParams.onSubmit,
        initParams.onCancel, initParams.onDismiss, initParams.onLoad);
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
      this.platform.destroy();
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.subtitle = subtitle;
    modalRef.componentInstance.timeSchedule = timeSchedule;
  }
}

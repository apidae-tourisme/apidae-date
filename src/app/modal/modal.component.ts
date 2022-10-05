import {Component, Inject, PlatformRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {INIT_PARAMS} from "../app.config";
import {StorageService} from "../../services/storage.service";
import {TimeSchedule} from "../../models/time-schedule";
import {DetailsComponent} from "../details/details.component";
import {TimeScheduleComponent} from "../form/time-schedule.component";
import {TypeConfig} from "../../models/type-config";
import {StylesService} from "../../services/styles.service";
import {TextsService} from "../../services/texts.service";

const modalComponents = {form: TimeScheduleComponent, details: DetailsComponent};

@Component({
  template: ``
})
export class ModalComponent {

  @ViewChild('content', { static: false }) content;

  constructor(@Inject(INIT_PARAMS) initParams: Params, private route: ActivatedRoute, private modalService: NgbModal,
              private storageService: StorageService, private texts: TextsService, private styles: StylesService,
              private platform: PlatformRef) {
    let contentType = this.route.snapshot.paramMap.get('content'), contentComponent = modalComponents[contentType],
      title = this.extractProperty(initParams, 'title'), subtitle = this.extractProperty(initParams, 'subtitle'),
      customStyles = this.extractProperty(initParams, 'styles');

    this.styles.loadStyles(customStyles);

    let onSubmit = this.extractProperty(initParams, 'onSubmit'), onCancel = this.extractProperty(initParams, 'onCancel'),
      onDismiss = this.extractProperty(initParams, 'onDismiss'), onLoad = this.extractProperty(initParams, 'onLoad');
    this.storageService.getConfig(initParams.type).subscribe((config: TypeConfig) => {
      this.storageService.getSchedule(config, contentType === 'form', initParams).subscribe((timeSchedule: TimeSchedule) => {
        this.initModal(contentComponent, config, title, subtitle, timeSchedule,
          onSubmit, onCancel, onDismiss, onLoad);
      });
    });
  }

  private initModal(contentComponent, config, title, subtitle, timeSchedule, onSubmit, onCancel, onDismiss, onLoad) {
    let modalRef = this.modalService.open(contentComponent, {windowClass: 'apidae_date', backdrop: 'static', keyboard: false});
    modalRef.result.then((result) => {
      if (result === 'submit' && onSubmit) {
        console.log('Apidate - onSubmit registered');
        const timePeriods = this.storageService.serializedTimePeriods(this.storageService.ts, config, this.texts);
        this.platform.onDestroy(() => onSubmit(timePeriods));
      } else if (result === 'cancel' && onCancel) {
        console.log('Apidate - onCancel registered');
        this.platform.onDestroy(() => onCancel());
      }
    }, (reason) => {
      if (onDismiss) {
        console.log('Apidate - onDismiss registered');
        this.platform.onDestroy(() => onDismiss());
      }
    }).then(() => {
      console.log('Apidate - exiting');
      this.platform.destroy();
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.subtitle = subtitle;
    modalRef.componentInstance.config = config;
    modalRef.componentInstance.onLoad = onLoad;
    modalRef.componentInstance.timeSchedule = timeSchedule;
  }

  private extractProperty(obj, key) {
    let val = obj[key];
    delete obj[key];
    return val;
  }
}

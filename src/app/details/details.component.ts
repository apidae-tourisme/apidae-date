import {Component, Input} from "@angular/core";
import {TimeSchedule} from "../../models/time-schedule";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TextsService} from "../../services/texts.service";
import {TimePeriod} from "../../models/time-period";
import {TypeConfig} from "../../models/type-config";

@Component({
  selector: 'apidate-details',
  templateUrl: 'details.html'
})
export class DetailsComponent {
  @Input() timeSchedule: TimeSchedule;
  @Input() config: TypeConfig;
  @Input() title: string;
  @Input() subtitle: string;

  constructor(public activeModal: NgbActiveModal, private texts: TextsService) {}

  public timePeriodSummary(timePeriod) {
    return this.texts.timePeriod(this.config, TimePeriod.asForm(timePeriod, this.config, true).value);
  }
}

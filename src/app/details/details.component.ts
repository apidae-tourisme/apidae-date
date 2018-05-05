import {Component, Input} from "@angular/core";
import {TimeSchedule} from "../../models/time-schedule";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TextsService} from "../../services/texts.service";
import {TimePeriod} from "../../models/time-period";

@Component({
  selector: 'apidate-details',
  templateUrl: 'details.html'
})
export class DetailsComponent {
  @Input() timeSchedule: TimeSchedule;
  @Input() title: string;
  @Input() subtitle: string;

  constructor(public activeModal: NgbActiveModal, private texts: TextsService) {}

  public timePeriodSummary(timePeriod) {
    return this.texts.timePeriod(TimePeriod.asForm(timePeriod, true).value);
  }
}

import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {PeriodType, Weekday} from "../shared/constants";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TimePeriod} from "../models/time-period";
import {TimeFrame} from "../models/time-frame";
import {TextsService} from "../services/texts.service";
import {DomUtils} from "../shared/dom.utils";

@Component({
  selector: 'apidate-time-period',
  templateUrl: 'time-period.html'
})
export class TimePeriodComponent implements AfterViewInit {
  @Input() tpForm: FormGroup;
  @Input() tp: TimePeriod;
  @Input() rank: number;
  @Output() cloned = new EventEmitter();
  @Output() removed = new EventEmitter();

  public collapsed = false;

  constructor(private fb: FormBuilder, public texts: TextsService) {}

  ngAfterViewInit(): void {
    this.bindTypeChange();
  }

  bindTypeChange() {
    this.tpType.valueChanges.forEach((val) => {
      this.tpForm.setControl('timeFrames', this.fb.array(
        this.timeFrames.value.map((tf) => TimeFrame.asForm(val, tf, false))
      ));
      DomUtils.setUpInteractions();
    });
  }

  get tpType(): FormControl {
    return this.tpForm.get('type') as FormControl;
  }

  get tpWeekdays(): FormGroup {
    return this.tpForm.get('weekdays') as FormGroup;
  }

  get timeFrames(): FormArray {
    return this.tpForm.get('timeFrames') as FormArray;
  }

  public allTypes(): Array<any> {
    return PeriodType.ALL_TYPES;
  }

  public weekdays(): any[] {
    return Weekday.ALL_DAYS;
  }

  public setTpType(ref) {
    this.tpForm.get('type').setValue(ref);
  }

  public setAllDaysTo(val) {
    return Weekday.ALL_DAYS.reduce((ctrl, d) => {
      ctrl.get(d.ref).setValue(val);
      return ctrl;
    }, this.tpWeekdays);
  }

  public clone(): void {
    this.cloned.emit(null);
  }

  public remove(): void {
    this.removed.emit(null);
  }

  public hasSingleTime(): boolean {
    return this.tpForm && this.tpType.value === PeriodType.LAST_ENTRY.ref;
  }

  public addTimeFrame(idx, tf?) {
    this.timeFrames.insert(idx, TimeFrame.asForm(this.tpType.value, tf || new TimeFrame(), false));
    DomUtils.setUpInteractions();
  }
}

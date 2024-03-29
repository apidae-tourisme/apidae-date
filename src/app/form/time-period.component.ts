import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Weekday} from "../../shared/constants";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TimeFrame} from "../../models/time-frame";
import {TextsService} from "../../services/texts.service";
import {DomUtils} from "../../shared/dom.utils";
import {TypeConfig} from "../../models/type-config";
import {TimePeriodType} from "../../models/time-period-type";
import {StylesService} from "../../services/styles.service";

@Component({
  selector: 'apidate-time-period',
  templateUrl: 'time-period.html'
})
export class TimePeriodComponent implements AfterViewInit {
  @Input() tpForm: FormGroup;
  @Input() config: TypeConfig;
  @Input() externalType: string;
  @Input() rank: number;
  @Output() cloned = new EventEmitter();
  @Output() removed = new EventEmitter();

  public collapsed = false;

  constructor(private fb: FormBuilder, public texts: TextsService, public styles: StylesService) {}

  ngAfterViewInit(): void {
    this.bindTypeChange();
  }

  bindTypeChange() {
    this.tpType.valueChanges.forEach((val) => {
      this.tpForm.setControl('timeFrames', this.fb.array(
        this.timeFrames.value.map((tf) => TimeFrame.asForm(this.config.timePeriodType(val), tf, false))
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

  public availableTypes(): Array<TimePeriodType> {
    let extType = this.config.externalTypes.filter((e) => e.reference === this.externalType)[0];
    if (extType) {
      return this.config.timePeriodsTypes.filter((tpt) => extType.timePeriodsTypes.indexOf(tpt.reference) !== -1);
    } else {
      console.log('Unmatched external type : ' + this.externalType);
    }
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
    return this.tpForm && this.config.timePeriodType(this.tpType.value).isSingleTime;
  }

  public addTimeFrame(idx, tf?) {
    this.timeFrames.insert(idx, TimeFrame.asForm(this.config.timePeriodType(this.tpType.value), tf || new TimeFrame(), false));
    DomUtils.setUpInteractions();
  }

  public timePeriodDesc() {
    return this.texts.timePeriod(this.config, this.tpForm.value);
  }

  public tpTypeDesc(ref) {
    return this.texts.tpType(this.config, ref);
  }
}

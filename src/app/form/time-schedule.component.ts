import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TimeSchedule} from "../../models/time-schedule";
import {TimePeriodComponent} from "./time-period.component";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {DomUtils} from "../../shared/dom.utils";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TimePeriod} from "../../models/time-period";
import {StorageService} from "../../services/storage.service";
import {TypeConfig} from "../../models/type-config";

@Component({
  selector: 'apidate-time-schedule',
  templateUrl: 'time-schedule.html'
})
export class TimeScheduleComponent implements AfterViewInit, OnInit {
  @Input() timeSchedule: TimeSchedule;
  @Input() config: TypeConfig;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() onLoad: any;
  @ViewChildren(TimePeriodComponent) timePeriodComponents: QueryList<TimePeriodComponent>;

  public tsForm: FormGroup;
  public submitted = false;
  public saveComplete = false;
  public saveFailed = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit() {
    if (this.onLoad) {
      console.log('Apidate form - onLoad');
      this.onLoad();
    }
    DomUtils.setUpInteractions();
  }

  private createForm() {
    this.tsForm = new FormGroup({}, {updateOn: 'submit'});
    let groups = this.timeSchedule.timePeriods.map(tp => TimePeriod.asForm(tp, this.config, true));
    this.tsForm.setControl('timePeriods', this.fb.array(groups));
  }

  get timePeriods(): FormArray {
    return this.tsForm.get('timePeriods') as FormArray;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.tsForm.valid) {
      this.timeSchedule.timePeriods = this.tsForm.value.timePeriods.map((tp) => {
        return new TimePeriod(this.config, tp);
      });
      this.timeSchedule.updatedAt = new Date().getTime();
      this.storageService.saveSchedule(this.timeSchedule).subscribe((ts) => {
        this.saveComplete = true;
        this.saveFailed = false;
        setTimeout(() => this.closeForm(), 5000);
      }, (err) => {
        this.saveFailed = true;
        this.saveComplete = false;
        console.log('error : ' + err);
      });
    }
  }

  public closeForm() {
    this.dismissAlert();
    this.activeModal.close('submit');
  }

  public dismissAlert() {
    this.saveComplete = false;
    this.saveFailed = false;
  }

  public addTimePeriod(idx, tp?): void {
    this.timePeriods.insert(idx, TimePeriod.asForm(tp || new TimePeriod(this.config), this.config, false));
    DomUtils.setUpInteractions();
  }

  public removeTimePeriod(idx): void {
    this.timePeriods.removeAt(idx);
  }

  public toggleAll(collapsed) {
    this.timePeriodComponents.forEach((tpc) => {
      tpc.collapsed = collapsed;
    });
  }
}

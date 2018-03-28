import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TimeSchedule} from "../models/time-schedule";
import {TimePeriodComponent} from "./time-period.component";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {DomUtils} from "../shared/dom.utils";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TimePeriod} from "../models/time-period";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'apidate-time-schedule',
  templateUrl: 'time-schedule.html'
})
export class TimeScheduleComponent implements AfterViewInit, OnInit {
  @Input() timeSchedule: TimeSchedule;
  @Input() title: string;
  @Input() subtitle: string;
  @ViewChildren(TimePeriodComponent) timePeriodComponents: QueryList<TimePeriodComponent>;

  public tsForm: FormGroup;
  public submitted = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit() {
    DomUtils.setUpInteractions();
  }

  private createForm() {
    this.tsForm = new FormGroup({}, {updateOn: 'submit'});
    let groups = this.timeSchedule.timePeriods.map(tp => TimePeriod.asForm(tp, true));
    this.tsForm.setControl('timePeriods', this.fb.array(groups));
  }

  get timePeriods(): FormArray {
    return this.tsForm.get('timePeriods') as FormArray;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.tsForm.valid) {
      this.timeSchedule.timePeriods = this.tsForm.value.timePeriods.map((tp) => {
        return new TimePeriod(tp);
      });
      this.storageService.saveSchedule(this.timeSchedule).subscribe((ts) => {
        console.log('saved');
      }, (err) => {
        console.log('error');
      });
    }
  }

  public addTimePeriod(idx, tp?): void {
    this.timePeriods.insert(idx, TimePeriod.asForm(tp || new TimePeriod(), false));
    DomUtils.setUpInteractions();
  }

  public toggleAll(collapsed) {
    this.timePeriodComponents.forEach((tpc) => {
      tpc.collapsed = collapsed;
    });
  }

  public identifiers() {
    return "Identifiant : " + this.timeSchedule.externalId;
  }
}

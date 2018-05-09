import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {TypeConfig} from "../../models/type-config";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TimePeriodType} from "../../models/time-period-type";
import {Locale} from "../../shared/constants";
import {AuthService} from "../../services/auth.service";

@Component({
  templateUrl: 'config-periods.html'
})
export class ConfigPeriodsComponent implements OnInit {
  private configType: string;
  public config: TypeConfig;
  public configForm: FormGroup;
  public submitted = false;
  public saveComplete = false;
  public saveFailed = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, private authService: AuthService,
              private route: ActivatedRoute) {
    this.configType = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {
    this.storageService.getConfig(this.configType).subscribe((conf: TypeConfig) => {
      this.config = conf;
      this.createForm();
    });
  }

  get timePeriodsTypes(): FormArray {
    return this.configForm.get('timePeriodsTypes') as FormArray;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.configForm.valid) {
      this.config.updatedAt = new Date().getTime();
      this.config.updatedBy = this.authService.userEmail;
      this.config.timePeriodsTypes = this.configForm.value.timePeriodsTypes.map((tpt) => {
        return new TimePeriodType(tpt);
      });
      this.storageService.saveConfig(this.config).subscribe((ts) => {
        this.saveComplete = true;
        this.saveFailed = false;
      }, (err) => {
        this.saveFailed = true;
        this.saveComplete = false;
        console.log('error : ' + err);
      });
    }
  }

  public addTimePeriodType(idx): void {
    this.timePeriodsTypes.insert(idx, new TimePeriodType().asForm(this.fb));
  }

  public removeTimePeriod(idx): void {
    this.timePeriodsTypes.removeAt(idx );
  }

  public allLangs(): string[] {
    return Locale.ALL_LANGS;
  }

  public dismissAlert() {
    this.saveComplete = false;
    this.saveFailed = false;
  }

  private createForm() {
    this.configForm = new FormGroup({}, {updateOn: 'submit'});
    let groups = this.config.timePeriodsTypes.map(tp => tp.asForm(this.fb));
    this.configForm.setControl('timePeriodsTypes', this.fb.array(groups));
  }
}

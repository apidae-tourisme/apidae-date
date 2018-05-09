import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {TypeConfig} from "../../models/type-config";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ExternalType} from "../../models/external-type";

@Component({
  templateUrl: 'config-entities.html'
})
export class ConfigEntitiesComponent implements OnInit {
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

  get externalTypes(): FormArray {
    return this.configForm.get('externalTypes') as FormArray;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.configForm.valid) {
      this.config.updatedAt = new Date().getTime();
      this.config.updatedBy = this.authService.userEmail;
      this.config.externalTypes = this.configForm.value.externalTypes.map((ext) => new ExternalType(ext));
      this.storageService.saveConfig(this.config).subscribe((conf) => {
        this.saveComplete = true;
        this.saveFailed = false;
      }, (err) => {
        this.saveFailed = true;
        this.saveComplete = false;
        console.log('error : ' + err);
      });
    }
  }

  public addExternalType(idx): void {
    this.externalTypes.insert(idx, new ExternalType().asForm(this.config));
  }

  public removeExternalType(idx): void {
    this.externalTypes.removeAt(idx );
  }

  public dismissAlert() {
    this.saveComplete = false;
    this.saveFailed = false;
  }

  private createForm() {
    this.configForm = new FormGroup({}, {updateOn: 'submit'});
    let groups = this.config.externalTypes.map(ext => ext.asForm(this.config));
    this.configForm.setControl('externalTypes', this.fb.array(groups));
  }
}

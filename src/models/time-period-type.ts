import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class TimePeriodType {
  public reference: string;
  public description: string;
  public isRecurring: boolean;
  public isSingleTime: boolean;
  public summary: any;
  public labels: any;

  constructor(tpt?) {
    if (tpt) {
      this.reference = tpt.reference;
      this.description = tpt.description;
      this.isRecurring = tpt.isRecurring || false;
      this.isSingleTime = tpt.isContinuous || false;
      this.summary = tpt.summary ? {...tpt.summary} : {singular: '', plural: ''};
      this.labels = {...tpt.labels};
    } else {
      this.reference = 'opening';
      this.description = "Horaires d'ouverture";
      this.isRecurring = false;
      this.isSingleTime = false;
      this.summary = {singular: "Ouverture", plural: "Ouverture"};
      this.labels = {
        fr: "Libellé FR",
        en: "",
        de: "",
        nl: "",
        it: "",
        es: "",
        ru: "",
        zh: "",
        'pt-br': ""
      };
    }
  }

  public asForm(fb: FormBuilder): FormGroup {
    return new FormGroup({
      reference: new FormControl(this.reference, Validators.required),
      description: new FormControl(this.description, Validators.required),
      isRecurring: new FormControl(this.isRecurring),
      isSingleTime: new FormControl(this.isSingleTime),
      summary: fb.group(this.summary),
      labels: fb.group(this.labels)
    }, {updateOn: "change"});
  }
}

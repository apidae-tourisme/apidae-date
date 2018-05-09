import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class TimePeriodType {
  public reference: string;
  public description: string;
  public labels: any;

  constructor(tpt?) {
    if (tpt) {
      this.reference = tpt.reference;
      this.description = tpt.description;
      this.labels = {...tpt.labels};
    } else {
      this.reference = 'opening';
      this.description = "Horaires d'ouverture";
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
      labels: fb.group(this.labels)
    }, {updateOn: "change"});
  }
}

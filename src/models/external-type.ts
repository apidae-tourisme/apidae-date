import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeConfig} from "./type-config";

export class ExternalType {
  public reference: string;
  public description: string;
  public timePeriodsTypes: string[];

  constructor(extType?) {
    if (extType) {
      this.reference = extType.reference;
      this.description = extType.description;
      this.timePeriodsTypes = Array.isArray(extType.timePeriodsTypes) ? extType.timePeriodsTypes :
        this.buildArray(extType.timePeriodsTypes);
    } else {
      this.reference = '';
      this.description = '';
      this.timePeriodsTypes = [];
    }
  }

  public asForm(config: TypeConfig): FormGroup {
    return new FormGroup({
      reference: new FormControl(this.reference, Validators.required),
      description: new FormControl(this.description, Validators.required),
      timePeriodsTypes: config.timePeriodsTypes.reduce((grp, d) => {
        grp.addControl(d.reference, new FormControl(this.timePeriodsTypes.indexOf(d.reference) !== -1));
        return grp;
      }, new FormGroup({}))
    }, {updateOn: "change"});
  }

  private buildArray(timePeriodsValues: any) {
    let tpArray = [];
    for (const key in timePeriodsValues) {
      if (timePeriodsValues[key]) {
        tpArray.push(key);
      }
    }
    return tpArray;
  }
}

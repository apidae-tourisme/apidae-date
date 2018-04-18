import {TimeFrame} from "./time-frame";
import {PeriodType, Weekday} from "../shared/constants";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

export class TimePeriod {

  public type: any;
  public weekdays: string[];
  public timeFrames: TimeFrame[];
  public labels: any;

  constructor(tp?) {
    if (tp) {
      this.type = tp.type;
      this.weekdays = Weekday.ALL_DAYS.reduce((wd, d) => {
        if (tp.weekdays[d.ref]) {
          wd.push(d.ref);
        }
        return wd;
      }, []);
      this.timeFrames = tp.timeFrames.map((tf) => new TimeFrame(tf));
    } else {
      this.type = PeriodType.OPENING.ref;
      this.weekdays = Weekday.ALL_DAYS.map((d) => d.ref);
      this.timeFrames = [];
      this.addTimeFrame();
      this.addTimeFrame();
    }
    // Mock labels for integration
    this.labels = {
      fr: "LABEL FR - " + this.type,
      en: "LABEL EN - " + this.type,
      de: "LABEL DE - " + this.type,
      nl: "LABEL NL - " + this.type,
      it: "LABEL IT - " + this.type,
      es: "LABEL ES - " + this.type,
      ru: "LABEL RU - " + this.type,
      zh: "LABEL ZH - " + this.type,
      'pt-br': "LABEL PT-BR - " + this.type
    };
  }

  public static asForm(timePeriod, isModel): FormGroup {
    return new FormGroup({
      type: new FormControl(timePeriod.type),
      weekdays: Weekday.ALL_DAYS.reduce((grp, d) => {
          grp.addControl(d.ref, new FormControl(isModel ? timePeriod.weekdays.indexOf(d.ref) !== -1 : timePeriod.weekdays[d.ref]));
          return grp;
        }, new FormGroup({})),
      timeFrames: new FormArray(timePeriod.timeFrames.map((tf) => TimeFrame.asForm(timePeriod.type, tf, isModel)))
    }, {updateOn: "change"});
  }

  public addTimeFrame(src?: any): void {
    this.timeFrames.splice(src ? this.timeFrames.indexOf(src) + 1 : this.timeFrames.length, 0, new TimeFrame());
  }
}

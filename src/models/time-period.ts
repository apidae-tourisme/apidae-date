import {TimeFrame} from "./time-frame";
import {Weekday} from "../shared/constants";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

export class TimePeriod {

  public type: any;
  public weekdays: string[];
  public timeFrames: TimeFrame[];
  public labels: any;

  constructor(config, tp?) {
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
      this.type = config.timePeriodsTypes[0].reference;
      this.weekdays = Weekday.ALL_DAYS.map((d) => d.ref);
      this.timeFrames = [];
      this.addTimeFrame();
      this.addTimeFrame();
    }
    this.labels = {...config.timePeriodType(this.type).labels};
  }

  public static asForm(timePeriod, config, isModel): FormGroup {
    return new FormGroup({
      type: new FormControl(timePeriod.type),
      weekdays: Weekday.ALL_DAYS.reduce((grp, d) => {
          grp.addControl(d.ref, new FormControl(isModel ? (timePeriod.weekdays.indexOf(d.ref) !== -1) : timePeriod.weekdays[d.ref]));
          return grp;
        }, new FormGroup({})),
      timeFrames: new FormArray(timePeriod.timeFrames.map((tf) => TimeFrame.asForm(config.timePeriodType(timePeriod.type), tf, isModel)))
    }, {updateOn: "change"});
  }

  public addTimeFrame(src?: any): void {
    this.timeFrames.splice(src ? this.timeFrames.indexOf(src) + 1 : this.timeFrames.length, 0, new TimeFrame());
  }
}

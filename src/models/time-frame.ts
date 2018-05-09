import {FormControl, FormGroup, Validators} from "@angular/forms";

export class TimeFrame {

  public startTime: string;
  public endTime: string;
  public recurrence: string;

  constructor(tf?) {
    if (tf) {
      this.startTime = this.timeAsString(tf.startTime);
      this.endTime = this.timeAsString(tf.endTime);
      this.recurrence = this.timeAsString(tf.recurrence);
    }
  }

  public static asForm(periodType, timeFrame, isModel): FormGroup {
    let grp = new FormGroup({startTime:
        new FormControl(isModel ? this.parseTime(timeFrame.startTime) : timeFrame.startTime, Validators.required)});
    if (!periodType.isSingleTime) {
      grp.addControl('endTime', new FormControl(isModel ? this.parseTime(timeFrame.endTime) : timeFrame.endTime));
    }
    if (periodType.isRecurring) {
      grp.addControl('recurrence', new FormControl(isModel ? this.parseTime(timeFrame.recurrence) : timeFrame.recurrence));
    }
    return grp;
  }

  private static parseTime(time): any {
    if (time) {
      let datetime = new Date('1970-01-01T' + time + 'Z');
      return {hour: datetime.getUTCHours(), minute: datetime.getUTCMinutes()};
    } else {
      return null;
    }
  }

  private timeAsString(time): string {
    if (time && time.hour !== null && time.minute !== null) {
      return this.lpad(time.hour) + ':' + this.lpad(time.minute);
    } else {
      return null;
    }
  }

  private lpad(d): string {
    return d < 10 ? ('0' + d) : d;
  }
}

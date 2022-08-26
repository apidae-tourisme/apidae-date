import {Injectable} from '@angular/core';
import {Weekday} from "../shared/constants";

@Injectable()
export class TextsService {

  public tpType(config, typeRef) {
    return this.periodType(config, typeRef).description;
  }

  public timeFrame(tf, periodType): string {
    let txt = "";
    if (tf.startTime != null && tf.startTime.hour != null) {
      let startStr = this.timeAsString(tf.startTime);
      if (tf.recurrence != null && tf.recurrence.hour != null) {
        txt += "toutes les " + this.duration(tf.recurrence.hour, tf.recurrence.minute) + " ";
      }
      if (tf.endTime != null && tf.endTime.hour != null) {
        txt += "de " + startStr + " à " + this.timeAsString(tf.endTime);
      } else {
        // if (periodType.continuous) {
        //   txt += "à partir de " + startStr;
        // } else {
        txt += "à " + startStr;
        // }
      }
    }
    return txt;
  }

  public timePeriod(config, tp): string {
    let type = this.periodType(config, tp.type);
    let selectedDays = Weekday.ALL_DAYS.filter((d) => tp.weekdays[d.ref]);
    let daysText = selectedDays.length === 7 ? "tous les jours" : this.daysAsText(selectedDays);
    let timeFramesText = this.textJoin(tp.timeFrames.map((tf) => this.timeFrame(tf, type)));
    let singleTimeFrame = tp.timeFrames.length === 1
      && (!tp.timeFrames[0].endTime || !tp.timeFrames[0].endTime.hour)
      && (!tp.timeFrames[0].recurrence || !tp.timeFrames[0].recurrence.hour);
    return [singleTimeFrame ? type.summary.singular : type.summary.plural, daysText, timeFramesText].join(" ");
  }

  public timestampAsDate(ts): string {
    return new Date(ts).toLocaleDateString();
  }

  private duration(hours, mins = 0) {
    if (hours === 0) {
      return mins.toString() + " minutes";
    } else if (hours === 1) {
      return mins > 0 ? ('1h' + this.lpad(mins)) : "heures";
    } else {
      return hours.toString() + (mins > 0 ? ("h" + this.lpad(mins)) : " heures");
    }
  }

  private periodType(config, typeRef) {
    return config.timePeriodsTypes.filter((t) => t.reference === typeRef)[0];
  }

  private timeAsString(time) {
    return time.hour + "h" + (time.minute > 0 ? this.lpad(time.minute) : '');
  }

  private lpad(d): string {
    return d < 10 ? ('0' + d) : d;
  }

  private daysAsText(days): string {
    let text = "";
    if (days.length > 1) {
      let lastIdx = days.length - 1;
      if ((Weekday.ALL_DAYS.indexOf(days[lastIdx]) - Weekday.ALL_DAYS.indexOf(days[0])) === days.length - 1) {
        text = "du " + days[0].label.toLowerCase() + " au " + days[lastIdx].label.toLowerCase();
      } else {
        text = "les " + this.textJoin(days.map((d) => d.label.toLowerCase() + "s"));
      }
    } else if (days.length === 1) {
      text = "tous les " + days[0].label.toLowerCase() + "s";
    }
    return text;
  }

  private textJoin(textFields: string[]): string {
    let validFields = textFields.filter((f) => f.length > 0);
    if (validFields.length > 0) {
      let last = validFields.pop();
      return validFields.length > 0 ? (validFields.join(", ") + " et " + last) : last;
    } else {
      return "";
    }
  }
}

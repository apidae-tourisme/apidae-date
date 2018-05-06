import {TimePeriod} from "./time-period";

export class TimeSchedule {
  public id: string;
  public _rev: string;
  public type: string;
  public externalId: string;
  public externalType: string;
  public externalRef: string;
  public startDate: number;
  public endDate: number;
  public userId: number;
  public timePeriods: TimePeriod[];
  public closingDays: string[];

  constructor() {
    this.timePeriods = [new TimePeriod()];
  }

  public static buildFrom(initValues, overrides?): TimeSchedule {
    let ts = new TimeSchedule();
    ts = {...ts, ...initValues};
    if (overrides) {
      ts = {...ts, ...overrides};
    }
    return ts;
  }
}

import {TimePeriod} from "./time-period";

export class TimeSchedule {
  public _id: string;
  public _rev: string;
  public type: string;
  public externalId: string;
  public externalType: string;
  public externalRef: string;
  public startDate: number;
  public endDate: number;
  public userId: number;
  public updatedAt: number;
  public timePeriods: TimePeriod[];
  public closingDays: string[];

  constructor(config, initDefaults) {
    this.timePeriods = initDefaults ? [new TimePeriod(config)] : [];
  }

  public static buildFrom(config, initDefaults, initValues, overrides?): TimeSchedule {
    let ts = new TimeSchedule(config, initDefaults);
    ts = {...ts, ...initValues};
    if (overrides) {
      ts = {...ts, ...overrides};
    }
    delete ts['title'];
    delete ts['subtitle'];
    return ts;
  }
}

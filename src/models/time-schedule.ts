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

  constructor(initParams) {
    this.mergeParams(initParams);
  }

  public mergeParams(initParams) {
    this.id = this.id || initParams.id;
    this._rev = this._rev || initParams._rev;
    this.type = initParams.type;
    this.externalId = this.externalId || initParams.externalId;
    this.externalType = initParams.externalType;
    this.externalRef = initParams.externalRef;
    this.startDate = initParams.startDate;
    this.endDate = initParams.endDate;
    this.userId = initParams.userId;
    this.timePeriods = initParams.timePeriods || [new TimePeriod()];
    this.closingDays = initParams.closingDays;
  }
}

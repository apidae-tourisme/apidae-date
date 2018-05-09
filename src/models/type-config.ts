import {TimePeriodType} from "./time-period-type";
import {ExternalType} from "./external-type";

export class TypeConfig {
  private static readonly ID_PREFIX = 'apidate_config_';

  public id: string;
  public _rev: string;
  public type: string;
  public description: string;
  public updatedAt: number;
  public updatedBy: string;
  public timePeriodsTypes: TimePeriodType[];
  public externalTypes: ExternalType[];

  constructor(configType, description, timePeriodsTypes?, externalTypes?) {
    this.id = TypeConfig.id(configType);
    this.type = configType;
    this.description = description;
    this.timePeriodsTypes = timePeriodsTypes ? timePeriodsTypes.map((tpt) => new TimePeriodType(tpt)) : [new TimePeriodType()];
    this.externalTypes = externalTypes ? externalTypes.map((ext) => new ExternalType(ext)) : [];
  }

  public static buildFrom(dbRecord) {
    let tc = new TypeConfig(dbRecord.type, dbRecord.description, dbRecord.timePeriodsTypes, dbRecord.externalTypes);
    tc._rev = dbRecord._rev;
    tc.updatedAt = dbRecord.updatedAt;
    tc.updatedBy = dbRecord.updatedBy;
    return tc;
  }

  public static id(configType) {
    return TypeConfig.ID_PREFIX + configType;
  }
}

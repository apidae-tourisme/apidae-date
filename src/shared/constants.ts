export class Weekday {
  public static readonly MONDAY = {ref: 'MON', label: 'Lundi'};
  public static readonly TUESDAY = {ref: 'TUE', label: 'Mardi'};
  public static readonly WEDNESDAY = {ref: 'WED', label: 'Mercredi'};
  public static readonly THURSDAY = {ref: 'THU', label: 'Jeudi'};
  public static readonly FRIDAY = {ref: 'FRI', label: 'Vendredi'};
  public static readonly SATURDAY = {ref: 'SAT', label: 'Samedi'};
  public static readonly SUNDAY = {ref: 'SUN', label: 'Dimanche'};
  public static readonly ALL_DAYS = [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY, Weekday.FRIDAY,
    Weekday.SATURDAY, Weekday.SUNDAY];
}

export class Locale {
  public static readonly FR = 'fr';
  public static readonly EN = 'en';
  public static readonly DE = 'de';
  public static readonly NL = 'nl';
  public static readonly IT = 'it';
  public static readonly ES = 'es';
  public static readonly RU = 'ru';
  public static readonly ZH = 'zh';
  public static readonly PT_BR = 'pt-br';

  public static readonly ALL_LANGS = [Locale.FR, Locale.EN, Locale.DE, Locale.NL, Locale.IT, Locale.ES, Locale.RU, Locale.ZH,
    Locale.PT_BR];
}

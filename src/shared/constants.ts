export class PeriodType {
  public static readonly OPENING = {label: "Horaires d'ouverture",
    text: {singular: "Ouverture", plural: "Ouverture"}, ref: "opening", continuous: false};
  public static readonly LAST_ENTRY = {label: "Horaires de dernière entrée",
    text: {singular: "Dernière entrée", plural: "Dernières entrées"}, ref: "last_entry", continuous: false};
  public static readonly CEREMONY = {label: "Horaires de cérémonie",
    text: {singular: "Cérémonie", plural: "Cérémonies"}, ref: "ceremony", continuous: false};
  public static readonly GUIDED_TOUR = {label: "Horaires de visite guidée",
    text: {singular: "Visite guidée", plural: "Visites guidées"}, ref: "guided_tour", continuous: false};
  public static readonly SUPERVISED_SWIMMING = {label: "Horaires de baignade surveillée",
    text: {singular: "Baignade surveillée", plural: "Baignade surveillée"}, ref: "surpervised_swimming", continuous: true};
  public static readonly SERVICE = {label: "Horaires de service",
    text: {singular: "Service", plural: "Service"}, ref: "service", continuous: true};
  public static readonly ARRIVAL = {label: "Horaires d'arrivée",
    text: {singular: "Arrivée", plural: "Arrivées"}, ref: "arrival", continuous: false};
  public static readonly DEPARTURE = {label: "Horaires de départ",
    text: {singular: "Départ", plural: "Départs"}, ref: "departure", continuous: false};
  public static readonly ALL_TYPES = [PeriodType.OPENING, PeriodType.LAST_ENTRY, PeriodType.CEREMONY,
    PeriodType.GUIDED_TOUR, PeriodType.SUPERVISED_SWIMMING, PeriodType.SERVICE, PeriodType.ARRIVAL, PeriodType.DEPARTURE];
}

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

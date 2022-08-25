import {throwError as observableThrowError, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DB_URL} from "../app/app.config";
import {TimeSchedule} from "../models/time-schedule";
import {TypeConfig} from "../models/type-config";

@Injectable()
export class StorageService {

  public ts: TimeSchedule;

  constructor(private http: HttpClient) {
  }

  public getSchedule(config, initDefaults, initParams): Observable<TimeSchedule> {
    return this.http.get(DB_URL + '/apidae_period', {headers: this.defaultHeaders(),
      params: {ids: '["' + initParams.externalId + '"]', singleorigin: 'true'}}).pipe(map((res: any): TimeSchedule => {
        if (res && res.length === 1) {
          return TimeSchedule.buildFrom(config, initDefaults, res[0], initParams);
        } else {
          return TimeSchedule.buildFrom(config, initDefaults, initParams);
        }
    }), catchError(this.handleError));
  }

  public saveSchedule(timeSchedule): Observable<TimeSchedule> {
    this.ts = {...timeSchedule};
    delete this.ts['_id'];
    delete this.ts['_rev'];
    return of(timeSchedule);
  }

  public deleteSchedule(timeSchedule) {
    return null;
  }

  public getConfigs(): Observable<any[]> {
    return null;
  }

  public getConfig(configType): Observable<TypeConfig> {
    return this.http.get(DB_URL + "/config", {headers: this.defaultHeaders(), params: {singleorigin: 'true'}}).pipe(
      map((res: Response): TypeConfig => {
        return TypeConfig.buildFrom(res);
      }), catchError(this.handleError));
  }

  public saveConfig(config: TypeConfig) {
    return null;
  }

  public getTimePeriodsCount(config: TypeConfig, periodType: string) {
    return null;
  }

  private defaultHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("X-Requested-With", "XMLHttpRequest");
    return headers;
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Server error';
    console.log('handleError : ' + JSON.stringify(error));
    return observableThrowError(errMsg);
  }
}

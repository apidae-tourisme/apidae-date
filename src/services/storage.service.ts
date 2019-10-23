import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DB_URL} from "../app/app.config";
import {TimeSchedule} from "../models/time-schedule";
import {TypeConfig} from "../models/type-config";

@Injectable()
export class StorageService {

  private static readonly CONFIGS_LIST = '/_all_docs?end_key="apidate_config_\ufff0"&start_key="apidate_config_"';
  private static readonly BY_EXTERNAL_ID = '/_design/api/_view/by-type-and-external-id';
  private static readonly BY_PERIOD_TYPE = '/_design/api/_view/by-type-and-period-type';

  constructor(private http: HttpClient) {
  }

  public getSchedule(config, initDefaults, initParams): Observable<TimeSchedule> {
    return this.http.get(DB_URL + StorageService.BY_EXTERNAL_ID, {headers: this.defaultHeaders(),
      params: {key: '["' + initParams.type + '","' + initParams.externalId + '"]'}}).pipe(map((res: Response): TimeSchedule => {
        if (res['rows'].length > 0) {
          let result = res['rows'][0];
          let doc = result.value;
          return TimeSchedule.buildFrom(config, initDefaults, doc, initParams);
        } else {
          return TimeSchedule.buildFrom(config, initDefaults, initParams);
        }
      }), catchError(this.handleError));
  }

  public saveSchedule(timeSchedule): Observable<TimeSchedule> {
    if (timeSchedule._id) {
      return this.http.put(DB_URL + "/" + timeSchedule._id, timeSchedule, {headers: this.defaultHeaders()}).pipe(
        map((res: Response): TimeSchedule => {
          if (res.ok) {
            timeSchedule._rev = res['rev'];
            return timeSchedule;
          } else {
            return null;
          }
      }), catchError(this.handleError));
    } else {
      return this.http.post(DB_URL, timeSchedule, {headers: this.defaultHeaders()}).pipe(map((res: Response): TimeSchedule => {
        if (res.ok) {
          timeSchedule._id = res['id'];
          return timeSchedule;
        } else {
          return null;
        }
      }), catchError(this.handleError));
    }
  }

  public deleteSchedule(timeSchedule) {
    if (timeSchedule._id) {
      return this.http.delete(DB_URL + "/" + timeSchedule._id + "?rev=" + timeSchedule._rev, {headers: this.defaultHeaders()}).pipe(
        map((res: Response): boolean => {
          console.log('delete resp : ' + JSON.stringify(res));
          return res.ok;
        }), catchError(this.handleError));
    }
  }

  public getConfigs(): Observable<any[]> {
    return this.http.get(DB_URL + StorageService.CONFIGS_LIST + '&include_docs=true', {headers: this.defaultHeaders()}).pipe(
      map((res: Response): any[] => {
        if (res['rows'].length > 0) {
          return res['rows'].map((r) => r.doc);
        } else {
          return [];
        }
      }), catchError(this.handleError));
  }

  public getConfig(configType): Observable<TypeConfig> {
    return this.http.get(DB_URL + "/" + TypeConfig.id(configType), {headers: this.defaultHeaders()}).pipe(
      map((res: Response): TypeConfig => {
        return TypeConfig.buildFrom(res);
    }), catchError(this.handleError));
  }

  public saveConfig(config: TypeConfig) {
    return this.http.put(DB_URL + "/" + config._id, config, {headers: this.defaultHeaders()}).pipe(
      map((res: Response): TypeConfig => {
        if (res.ok) {
          config._rev = res['rev'];
          return config;
        } else {
          return null;
        }
      }), catchError(this.handleError));
  }

  public getTimePeriodsCount(config: TypeConfig, periodType: string) {
    return this.http.get(DB_URL + StorageService.BY_PERIOD_TYPE, {headers: this.defaultHeaders(),
      params: {key: '["' + config.type + '","' + periodType + '"]'}}).pipe(
      map((res: Response): number => {
        if (res['rows'].length === 1) {
          return res['rows'][0].value;
        } else {
          return 0;
        }
      }), catchError(this.handleError));
  }

  private defaultHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("X-Requested-With", "XMLHttpRequest");
    return headers;
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Server error';
    return observableThrowError(errMsg);
  }
}

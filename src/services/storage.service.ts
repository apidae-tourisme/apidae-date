import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DB_AUTH, DB_URL} from "../app/app.config";
import {TimeSchedule} from "../models/time-schedule";
import {Observable} from "rxjs/Observable";
import {TypeConfig} from "../models/type-config";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";

@Injectable()
export class StorageService {

  private static readonly CONFIGS_LIST = "";
  private static readonly BY_EXTERNAL_ID = "/_design/search/_view/by-external-id";

  constructor(private http: HttpClient) {
  }

  public getSchedule(initParams): Observable<TimeSchedule> {
    return this.http.get(DB_URL + StorageService.BY_EXTERNAL_ID + '?include_docs=true', {headers: this.defaultHeaders(),
      params: {key: '["' + initParams.type + '","' + initParams.externalId + '"]'}}).map((res: Response): TimeSchedule => {
        if (res['rows'].length > 0) {
          let result = res['rows'][0];
          let doc = result.doc;
          doc.id = doc['_id'];
          return TimeSchedule.buildFrom(doc, initParams);
        } else {
          return TimeSchedule.buildFrom(initParams);
        }
      }).catch(this.handleError);
  }

  public saveSchedule(timeSchedule): Observable<TimeSchedule> {
    if (timeSchedule.id) {
      return this.http.put(DB_URL + "/" + timeSchedule.id, timeSchedule, {headers: this.defaultHeaders()})
        .map((res: Response): TimeSchedule => {
          if (res.ok) {
            timeSchedule._rev = res['rev'];
            return timeSchedule;
          } else {
            return null;
          }
      }).catch(this.handleError);
    } else {
      return this.http.post(DB_URL, timeSchedule, {headers: this.defaultHeaders()}).map((res: Response): TimeSchedule => {
        if (res.ok) {
          timeSchedule.id = res['id'];
          return timeSchedule;
        } else {
          return null;
        }
      }).catch(this.handleError);
    }
  }

  public getConfigs(): Observable<any[]> {
    return Observable.of([{type: 'apidae', description: 'Objets touristiques Apidae', updatedAt: 1525811411241,
      updatedBy: 'admin@hotentic.com'}]);
  }

  public getConfig(configType): Observable<TypeConfig> {
    return this.http.get(DB_URL + "/" + TypeConfig.id(configType), {headers: this.defaultHeaders()})
      .map((res: Response): TypeConfig => {
        return TypeConfig.buildFrom(res);
    }).catch(this.handleError);
  }

  public saveConfig(config: TypeConfig) {
    return this.http.put(DB_URL + "/" + config.id, config, {headers: this.defaultHeaders()})
      .map((res: Response): TypeConfig => {
        if (res.ok) {
          config._rev = res['rev'];
          return config;
        } else {
          return null;
        }
      }).catch(this.handleError);
  }

  private defaultHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", DB_AUTH);
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Server error';
    return Observable.throw(errMsg);
  }
}

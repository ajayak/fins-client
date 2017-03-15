import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
  isObject,
  isNil
} from 'lodash';

import { config } from '../../core';
import { SpinnerService } from '../spinner';
import { LogService } from './logger';

@Injectable()
export class ApiService {
  public headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private apiUrl: string = config.urls.base;

  constructor(
    private http: Http,
    private spinner: SpinnerService,
    private logger: LogService) { }

  public get(path: string): Observable<any> {
    this.spinner.show();
    return this.http.get(`${this.apiUrl}${path}`, { headers: this.headers })
      .map((res) => this.extractData(res))
      .catch((err) => this.catchBadResponse(err))
      .finally(() => this.spinner.hide());
  }

  public post(path: string, body): Observable<any> {
    this.spinner.show();
    return this.http.post(`${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .map((res) => this.extractData(res))
      .catch((err) => this.catchBadResponse(err))
      .finally(() => this.spinner.hide());
  }

  public put(path: string, body): Observable<any> {
    this.spinner.show();
    return this.http.put(`${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .map((res) => this.extractData(res))
      .catch((err) => this.catchBadResponse(err))
      .finally(() => this.spinner.hide());
  }

  public delete(path: string): Observable<any> {
    this.spinner.show();
    return this.http.delete(`${this.apiUrl}${path}`, { headers: this.headers })
      .map((res) => this.extractData(res))
      .catch((err) => this.catchBadResponse(err))
      .finally(() => this.spinner.hide());
  }

  public formEncodedPost(path: string, body): Observable<any> {
    this.spinner.show();
    return this.http.post(`${this.apiUrl}${path}`, body,
      {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        })
      }
    )
      .map((res) => this.extractData(res))
      .catch((err) => this.catchBadResponse(err))
      .finally(() => this.spinner.hide());
  }

  public setHeaders(headers) {
    Object.keys(headers)
      .forEach((header) => this.headers.set(header, headers[header]));
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json ? res.json() : null;
    return <T>(body || {});
  }

  private catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = <Response>errorResponse;
    let err;
    try {
      err = res.json();
      if (!isNil(err.error) && isObject(err.error)) {
        err.error_description = err.error.message;
        err.error = err.error.exception;
      }
    } catch (error) {
      err = {
        error: res['_body'],
        error_description: res['_body']
      };
    }
    this.logger.error('Http Error', err);
    if (err.currentTarget && err.currentTarget.status === 0) {
      // Request not sent
      const errMessage = 'Please check your internet connection';
      return Observable.throw({ error: errMessage, error_description: errMessage });
    }
    if (err.status === 403) {
      this.logger.error('Forbidden', err);
    }
    // const emsg = err ?
    //   (err.error ? err.error : JSON.stringify(err)) :
    //   (res.statusText || 'unknown error');
    return Observable.throw(err);
  }
}

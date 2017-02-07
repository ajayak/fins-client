import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
    return this.http.get(`${this.apiUrl}${path}`, this.headers)
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
    return this.http.delete(`${this.apiUrl}${path}`, this.headers)
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
    return <T>(body && body.data || {});
  }

  private catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = <Response>errorResponse;
    const err = res.json();
    const emsg = err ?
      (err.error ? err.error : JSON.stringify(err)) :
      (res.statusText || 'unknown error');
    this.logger.error('Http Error', err);
    return Observable.throw(emsg);
  }
}

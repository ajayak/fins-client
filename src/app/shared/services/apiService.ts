import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { config } from '../../core/config';

@Injectable()
export class ApiService {
  public headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private apiUrl: string = config.urls.baseUrl;

  constructor(private http: Http) { }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, this.headers)
      .map(this.checkForError)
      .catch((err) => Observable.throw(err))
      .map(this.getJson);
  }

  public post(path: string, body): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .map(this.checkForError)
      .catch((err) => Observable.throw(err))
      .map(this.getJson);
  }

  public put(path: string, body): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .map(this.checkForError)
      .catch((err) => Observable.throw(err))
      .map(this.getJson);
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`, this.headers)
      .map(this.checkForError)
      .catch((err) => Observable.throw(err))
      .map(this.getJson);
  }

  public setHeaders(headers) {
    Object.keys(headers)
      .forEach((header) => this.headers.set(header, headers[header]));
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error['response'] = response;
      console.log(error);
      throw error;
    }
  }
}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../components/shared/httpErrors';
import {ApplicationUser} from '../models/ApplicationUser';

const API_URL: string = environment.apiUrl;

export const SPECIALIZATION_URL: string = API_URL + '/applicationUser';

@Injectable()
export class ApplicationUserService {
  constructor(private _httpClient: HttpClient) {}

  public getApplicationUsers(): Observable<ApplicationUser[]> {
    return this._httpClient.get<ApplicationUser[]>(SPECIALIZATION_URL)
      .pipe(catchError(forObservable('Отримання користувачів', [])));
  }

}

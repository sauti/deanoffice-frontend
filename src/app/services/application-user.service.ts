import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../components/shared/httpErrors';
import {ApplicationUser} from '../models/ApplicationUser';

const API_URL: string = environment.apiUrl;

export const APPLICATION_USER_URL: string = API_URL + '/applicationUser';

@Injectable()
export class ApplicationUserService {
  constructor(private _httpClient: HttpClient) {}

  public getApplicationUsers(): Observable<ApplicationUser[]> {
    return this._httpClient.get<ApplicationUser[]>(APPLICATION_USER_URL)
      .pipe(catchError(forObservable('Отримання користувачів', [])));
  }

  create(body: ApplicationUser): Promise<any> {
    return this._httpClient.post(APPLICATION_USER_URL, body).toPromise()
      .catch(forPromise('Створення нового користувача'));
  }

  getById(sourceId: number): Observable<ApplicationUser> {
    return this._httpClient.get<ApplicationUser>(`${APPLICATION_USER_URL}/${sourceId}`)
      .pipe(catchError(forObservable('Отриманная користувача по Id', [])))
      .map(data => data as ApplicationUser)
  }

  delete(itemId: number): Promise<any> {
    return this._httpClient.delete(`${APPLICATION_USER_URL}/${itemId}`).toPromise()
      .catch(forPromise('Видалення користувача'));
  }

  update(body: ApplicationUser): Promise<any> {
    return this._httpClient.put(APPLICATION_USER_URL, body).toPromise()
      .catch(forPromise('Оновлення користувача'));
  }
}

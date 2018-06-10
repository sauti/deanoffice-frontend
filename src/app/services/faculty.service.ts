import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Faculty} from '../models/Faculty';

@Injectable()
export class FacultyService {
  private url = `${environment.apiUrl}/faculties`;

  constructor(private http: HttpClient) {
  }

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.url);
  }
}

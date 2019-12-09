import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected basePath = 'http://127.0.0.1:5000';
  public defaultHeaders = new HttpHeaders();

  constructor(
    protected httpClient: HttpClient
  ) {
  }

  public usersGet(name: string, age: number, gender: string): Observable<Array<User>> {
    let queryParameters = new HttpParams();

    if (name !== undefined && name !== null) {
      queryParameters = queryParameters.set('name', <any>name);
    }
    if (age != undefined && age !== null) {
      queryParameters = queryParameters.set('age', <any>age);
    }
    if (gender != undefined && gender !== null) {
      queryParameters = queryParameters.set('gender', <any>gender);
    }

    return this.httpClient.get<Array<User>>(`${this.basePath}/select`,
      {
        params: queryParameters
      }
    );
  }
}

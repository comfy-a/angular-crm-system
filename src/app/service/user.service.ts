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

  public userPost(name: string, age: number, gender: string): Observable<any> {

    let params: User = {
      name: name,
      age: age,
      gender: gender
    };

    return this.httpClient.post<any>(`${this.basePath}/create`,
      {
        params: params
      }
    );
  }

  public userPut(id: number, name: string, age: number, gender: string): Observable<any> {

    let params: User = {
      id: id,
      name: name,
      age: age,
      gender: gender
    };

    return this.httpClient.put<any>(`${this.basePath}/update`,
      {
        params: params
      }
    );
  }

  public userDelete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.basePath}/delete/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected basePath = 'http://127.0.0.1:8080/v2';
  public defaultHeaders = new HttpHeaders();

  constructor(
    protected httpClient: HttpClient
  ) {
  }

  public usersGet(name: string, age: number, gender: string): Observable<Array<User>> {
    let queryParameters = new HttpParams();

    if (name !== undefined && name !== null) {
      queryParameters = queryParameters.set('name',  name as any);
    }
    if (age !== undefined && age !== null) {
      queryParameters = queryParameters.set('age',  age as any);
    }
    if (gender !== undefined && gender !== null) {
      queryParameters = queryParameters.set('gender',  gender as any);
    }

    return this.httpClient.get<Array<User>>(`${this.basePath}/user`,
      {
        params: queryParameters
      }
    );
  }

  public userPost(name: string, age: number, gender: string, zipNo: string, baseAddr: string, detailAddr: string): Observable<any> {

    const user: User = {
      name,
      age,
      gender,
      addr: {
        zip_no: zipNo,
        base_addr: baseAddr,
        detail_addr: detailAddr
      }
    };

    return this.httpClient.post<any>(`${this.basePath}/user`, user);
  }

  public userPut(id: number, name: string, age: number, gender: string): Observable<any> {

    const user: User = {
      id,
      name,
      age,
      gender
    };

    return this.httpClient.put<any>(`${this.basePath}/user`, user);
  }

  public userDelete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.basePath}/user/${id}`);
  }
}

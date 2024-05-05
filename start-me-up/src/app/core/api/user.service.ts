import { Injectable } from '@angular/core';
import { ENDPOINT } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserSession } from 'src/app/model/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = ENDPOINT + 'users';

  constructor(private httpClient: HttpClient) {}

  public login(user: User): Observable<UserSession> {
    //extraer esto a un servicio dedicado a autenticación
    return this.httpClient.post<UserSession>(ENDPOINT + 'login', user);
  }

  public register(user: User): Observable<UserSession> {
    //extraer esto a un servicio dedicado a autenticación
    return this.httpClient.post<UserSession>(ENDPOINT + 'register', user);
  }

  public delete(user: User): Observable<User> {
    return this.httpClient.delete<User>(this.url + '/' + user.id);
  }
}

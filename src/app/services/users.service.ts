import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {st} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = environment.api_url;

  constructor(
      private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }
  deleteUser(id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/users/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url: string = environment.auth_url;
  private _token: string;
  private userAuth: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth);
  public userAuthEvent = this.userAuth.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  public get isAuth(): boolean {
    return !!this._token || !!localStorage.getItem('token');
  }

  private set token(token) {
    this._token = token;
    localStorage.setItem("token", token);
  }

  login(email: string, password: string):Observable<boolean> {
    return this.http.post(`${this.auth_url}/login`, {email, password}, {responseType: "text"}).pipe(
      map((res: string):boolean => {
        this.token = res;
        return true
      })
    );
  }

  signup(name:string, email: string, password: string) {
    return this.http.post(`${this.auth_url}/signup`, {name, email, password}, {responseType: "text"}).pipe(
      map((res: string):boolean => {
        this.token = res;
        return true
      })
    );
  }

  logout() {
    this.token = '';
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
import { LoggedInUser } from '../models/loggedinuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl: string = '';

  private loggedInSource = new BehaviorSubject<LoggedInUser>({ isLoggedIn: false, email: '', username: '' });
  loggedInObs = this.loggedInSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) {
    if (localStorage.getItem('loggedInUser')) {
      this.loggedInSource.next(JSON.parse(localStorage.getItem('loggedInUser')));
    }

    this.baseUrl = this.configService.getApiURI();
  }

  register(email: string, password: string, username: string) {
    this.http.post<any>(this.baseUrl + "/account/register", { username: username, password: password, email: email }).subscribe(data => {
      this.login(username, password);
    });
  }

  login(username, password) {
    this.http.post<any>(this.baseUrl + "/account/login", { username: username, password: password }).subscribe(data => {
      localStorage.setItem('token', data.token);
      var loggedInUser = { isLoggedIn: true, email: '', username: username };
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      this.loggedInSource.next(loggedInUser);
      this.router.navigateByUrl('product/list');
    });
  }

  logout() {
    localStorage.removeItem('token');
    var loggedInUser = { isLoggedIn: false, email: '', username: '' };
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.loggedInSource.next(loggedInUser);
  }
}

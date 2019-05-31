import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sign } from 'fake-jwt-sign' // For fakeAuthProvider only
import * as decode from 'jwt-decode'

import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { Role } from './role.enum';
import { transformError } from '../common/common';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService implements IAuthService {

  private readonly authProvider: (
    username: string,
    password: string
  ) => Observable<IServerAuthResponse>

  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);

  constructor(private httpClient: HttpClient) {
    super();
     // Fake login function to simulate roles
     this.authProvider = this.fakeAuthProvider;
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));
    // Example of a real login call to server-side
    // this.authProvider = this.exampleAuthProvider
  }

  private exampleAuthProvider(
    username: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(`${environment.smerfUrl}/v1/login`, {
      username: username,
      password: password,
    });
  }

  private fakeAuthProvider(
    username: string,
    password: string
  ): Observable<IServerAuthResponse> {
    if (!username.toLowerCase().endsWith('@test')) {
      return observableThrowError('Failed to login! Username needs to end with @test.');
    }

    const authStatus = {
      isAuthenticated: true,
      userId: 'e4d1bc2ab25c',
      userRole: username.toLowerCase().includes('ad')
        ? Role.Admin
        : Role.None,
    } as IAuthStatus;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }

  login(username: string, password: string): Observable<IAuthStatus> {
    this.logout()

    const loginResponse = this.authProvider(username, password).pipe(
      map(value => {
        this.setToken(value.accessToken);
        return decode(value.accessToken) as IAuthStatus;
      }),
      catchError(transformError)
    )

    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return observableThrowError(err);
      }
    )

    return loginResponse;
  }

  logout() {
    this.clearToken();
    this.authStatus.next(defaultAuthStatus)
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'));
  }

  getToken(): string {
    return this.getItem('jwt') || '';
  }

  private clearToken() {
    this.removeItem('jwt');
  }
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus = { isAuthenticated: false, userRole: Role.None, userId: null }

export interface IAuthService {
  logout();
  login(username: string, password: string): Observable<IAuthStatus>;
  getToken() : string;
  authStatus: BehaviorSubject<IAuthStatus>;
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface usernameAvailabelResponse {
  available: boolean
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  usernameAvailable(username: string) {
    return this.http.post<usernameAvailabelResponse>(
      this.rootUrl + '/auth/username', {username});
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup',
    credentials, {withCredentials: true}
    ).pipe(
      tap(() => {
        this.signedin$.next(true);
      }));
  }

  // is_SignedIn
  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`, {withCredentials: true})
    .pipe(
      tap(({authenticated}) => {
        this.signedin$.next(authenticated);
      })
    )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
    .pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials )
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      )
  }

}

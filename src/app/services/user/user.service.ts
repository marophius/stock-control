import { AuthResponse } from './../../models/interfaces/user/auth/auth.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { SignUpUserRequest } from '../../models/interfaces/user/signup.user.request';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from '../../models/interfaces/user/signup.user.response';
import { AuthRequest } from '../../models/interfaces/user/auth/auth.request';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) { }

  signUpUser(request: SignUpUserRequest): Observable<SignUpUserResponse> {
    return this.http.post<SignUpUserResponse>(`${this.apiUrl}/user`, request);
  }

  authUser(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, request);
  }

  isLoggedIn(): boolean {
    const jwt = this.cookieService.get('USER_INFO');
    return jwt ? true : false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
 
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dev-api.wanasti.com/api/v1/user/login?lang=en&currencyCode=KW%22'; 
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    const payload = {
    "email": email,
    "phone": "",
    "phoneCode": "965",
    "password": password,
    "deviceToken": "",
    "deviceType": "",
    "deviceModel": "",
    "appVersion": "",
    "osVersion": ""
  };
    const token ="dAwMpo/TAWLhFrwwr3Wzcmc8XTdmAgp6zmGLsFmJ9HAnEbTQAg937i/hqKFjtFVQ4TnQ2y6xlVSeTKy3VWcxvalwvmPq6qF7+UcLd3wBXYoVQ2Puj49mTweKh/v2Rvj9zyVjfbexFkjMNZ5XyGucmdOI6XMmI98Zvu38Jh1fOo8157YxlgCozKkonixczjGIn3RKLuv7v3gXDRl4irzRcS6lYKGJB8vfA847GUppsVjdZV9bAjADfqUP2Iyl6Nz8MOWrSHNy8tWqhM6mI165rCwH3xMv7HEexmsMO7Mi36c=s"
    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });


    return this.http.post<LoginResponse>(this.apiUrl,payload,{ headers }).pipe(
      map((res) => {
       
        if (res.token) {
          localStorage.setItem('token', res.token);
          return res.token;
        }
        throw new Error('Token not found in response');
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      
      errorMsg = `Error: ${error.error.message}`;
    } else {
      
      if (error.status === 401) errorMsg = 'Invalid email or password!';
      else if (error.error && error.error.message) errorMsg = error.error.message;
      else errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMsg);
  }
}
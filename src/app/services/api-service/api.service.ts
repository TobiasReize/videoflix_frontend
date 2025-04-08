import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private router = inject(Router);


  constructor() { }


  getData(endpoint: string, token: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Token ${token}`);
    return this.http.get<any>(endpoint, { headers });
  }


  postData(endpoint: string, payload = {}): Observable<any> {
    return this.http.post<any>(endpoint, payload);
  }


  postGuestData(): Observable<any> {
    const payload = {
      username: environment.guest.EMAIL,
      password: environment.guest.PASSWORD
    };
    return this.http.post<any>(environment.config.LOGIN_URL, payload);
  }


  checkCredentials() {
    const userID = sessionStorage.getItem('user_id') || '';
    const token = sessionStorage.getItem('token') || '';
    this.getData(environment.config.USER_PROFILE_URL + userID, token).subscribe({
      error: err => this.router.navigateByUrl('login?credentials=false'), 
    });
  }
  
}

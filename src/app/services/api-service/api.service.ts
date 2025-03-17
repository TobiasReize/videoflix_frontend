import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../shared/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  router = inject(Router);


  constructor() { }


  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(endpoint);
  }


  postData(endpoint: string, payload = {}): Observable<any> {
    return this.http.post<any>(endpoint, payload);
  }


  checkCredentials() {
    const userID = sessionStorage.getItem('user_id');
    this.getData(config.USER_PROFILE_URL + userID).subscribe({
      error: err => this.router.navigateByUrl('login?credentials=false'), 
    });
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8081/api/admin/login/${email}/${password}`);
  }
  profile(): Observable<Admin> {
    return this.http.get<Admin>("http://localhost:8081/api/admin/profile");
  }
  profileUpdate(updatedAdmin: Admin): Observable<Admin> {
    return this.http.get<Admin>("http://localhost:8081/api/admin/profile/update");
  }

  logout(): Observable<void> {
    return this.http.get<void>("http://localhost:8081/api/admin//logout");
  }
}

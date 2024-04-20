import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/register'; // Replace with your backend API URL
  private Url = 'http://localhost:3000/api/users'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  saveUserDetails(userDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userDetails);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.Url);
  }

  updateUser(userData: any): Observable<any> {
    const userId = userData.id;
    return this.http.put<any>(`http://localhost:3000/api/users/${userId}`, userData);
  }

  archiveUser(userId: string): Observable<any> {
    const url = `http://localhost:3000/api/users/archive/${userId}`;
    return this.http.put<any>(url, {});
  }
}

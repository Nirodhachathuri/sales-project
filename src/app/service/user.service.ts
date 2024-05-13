// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:3000/api/register'; // Replace with your backend API URL
//   private Url = 'http://localhost:3000/api/users'; // Replace with your backend API URL

//   // sale-backend-production.up.railway.app
//   constructor(private http: HttpClient) {}

//   saveUserDetails(userDetails: any): Observable<any> {
//     console.log(userDetails)
//     return this.http.post<any>(this.apiUrl, userDetails);
//   }

//   getAllUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.Url);
//   }

//   updateUser(userData: any): Observable<any> {
//     const userId = userData.id;
//     return this.http.put<any>(`http://localhost:3000/api/users/${userId}`, userData);
//   }

//   archiveUser(userId: string): Observable<any> {
//     const url = `http://localhost:3000/api/users/archive/${userId}`;
//     return this.http.put<any>(url, {});
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;
  private usersUrl: string;
 
  constructor(private http: HttpClient) {
  //   this.apiUrl = `https://sale-backend.up.railway.app/api/register`;
  //   this.usersUrl = `https://sale-backend.up.railway.app/api/users`;

    this.apiUrl = `http://localhost:3000/api/register`;
    this.usersUrl = `http://localhost:3000/api/users`;
  }

  saveUserDetails(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post<any>(this.apiUrl, userDetails);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  updateUser(userData: any): Observable<any> {
    const userId = userData.id;
    return this.http.put<any>(`${this.usersUrl}/${userId}`, userData);
  }

  archiveUser(userId: string): Observable<any> {
    const url = `${this.usersUrl}/archive/${userId}`;
    return this.http.put<any>(url, {});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private loggedIn = false;
  private userType: string | null = null;

  constructor(private router: Router, private http: HttpClient) { }

  getUser() {
    return { image: 'src/assets/user.jpeg' };
  }
  // Sample data entries
  logout() {
    // Perform logout actions here, such as clearing session data, removing tokens, etc.
    // For example, if you are using localStorage for storing authentication tokens:
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect the user to the login page after logout
    this.router.navigate(['/login']);
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', { username, password })
      .pipe(
        tap(response => {
          if (response && response.userType) {
            
            // Store the user type obtained from the backend
            this.userType = response.userType;
            this.loggedIn = true;
            // Store token and expiration time in local storage
            const now = new Date();
            const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds
            localStorage.setItem('token', response.token);
            localStorage.setItem('expires_at', JSON.stringify(expiresAt.getTime()));

          }


          return response;
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    const now = new Date().getTime();
    return of(now < expiresAt);
  }
  getUserType(): string | null {
    return this.userType;
  }

}
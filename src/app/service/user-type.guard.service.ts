import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Assuming you have an AuthService for managing user authentication

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check the user type from AuthService or your user service
    const userType = this.authService.getUserType(); // Adjust this according to your authentication logic

    // Check if the user is allowed to access the dashboard based on their user type
    if (userType === 'admin' || userType === 'accountAdmin') {
      return true; // Allow access to the dashboard
    } else {
      // Redirect unauthorized users to a different route (e.g., login page)
      this.router.navigate(['/login']);
      return false;
    }
  }
}

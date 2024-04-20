import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  sidenavWidth: string = '250px';
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService) {} // Corrected BreakpointObserver import
  
  // Logout function
  logout() {
    this.authService.logout(); // Call the logout method from your authentication service
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      if (result.matches) {
        // Adjust the width for smaller screens
        this.sidenavWidth = '420px'; // Adjust the width as per your requirement
      } else {
        // Default width for larger screens
        this.sidenavWidth = '1440px';
      }
    });
  }
}
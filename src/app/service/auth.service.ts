import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
let sampleData = [
    { id:1, name: 'John Doe', email: 'john@example.com', website: 'https://example.com' },
    { id:2, name: 'Jane Smith', email: 'jane@example.com', website: 'https://example.com' },
    // Add more entries as needed
    // For example:
    { id:3, name: 'Alice Johnson', email: 'alice@example.com', website: 'https://example.com' },
    { id:4, name: 'Bob Williams', email: 'bob@example.com', website: 'https://example.com' },
    { id:1, name: 'John Doe', email: 'john@example.com', website: 'https://example.com' },
    { id:2, name: 'Jane Smith', email: 'jane@example.com', website: 'https://example.com' },
    // Add more entries as needed
    // For example:
    { id:3, name: 'Alice Johnson', email: 'alice@example.com', website: 'https://example.com' },
    { id:4, name: 'Bob Williams', email: 'bob@example.com', website: 'https://example.com' },
    { id:1, name: 'John Doe', email: 'john@example.com', website: 'https://example.com' },
    { id:2, name: 'Jane Smith', email: 'jane@example.com', website: 'https://example.com' },
    // Add more entries as needed
    // For example:
    { id:3, name: 'Alice Johnson', email: 'alice@example.com', website: 'https://example.com' },
    { id:4, name: 'Bob Williams', email: 'bob@example.com', website: 'https://example.com' },
    { id:1, name: 'John Doe', email: 'john@example.com', website: 'https://example.com' },
    { id:2, name: 'Jane Smith', email: 'jane@example.com', website: 'https://example.com' },
    // Add more entries as needed
    // For example:
    { id:3, name: 'Alice Johnson', email: 'alice@example.com', website: 'https://example.com' },
    { id:4, name: 'Bob Williams', email: 'bob@example.com', website: 'https://example.com' },
    // ...
  ];

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  constructor() { }
    getUser() {
        return { image: 'src/assets/user.jpeg' };
    }
     // Sample data entries
     
    getSampleData(): Observable<any[]> {
       
        // Repeat the sample data to have a total of 10 entries
        const repeatedData = [];
        for (let i = 0; i < sampleData.length; i++) {
          repeatedData.push(sampleData[i]);
        }
    
        // Return the repeated sample data as an Observable
        return of(repeatedData);
      }
      getSampleDataId(id): Observable<any[]> {
       
        // Repeat the sample data to have a total of 10 entries
        const repeatedData = [];
        for (let i = 0; i < sampleData.length; i++) {
          if(sampleData[i].id == id){
            repeatedData.push(sampleData[i]);
          }
        }
        return of(repeatedData);
    
        // Return the repeated sample data as an Observable
        
      }
  // Implement your authentication logic here
}
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SalesService {

//   constructor(private http : HttpClient) { }

//   archiveSales(saleId: string): Observable<any> {

//     // const url = `http://localhost:3000/api/sales/archive/${saleId}`;

//     const url = `https://sfa.369dubai.com/api/sales/archive/${saleId}`;
//     return this.http.put<any>(url, {});
//   }

//   saveSalesDetails(saleDetails: any): Observable<any> {

//     // const url = `http://localhost:3000/api/sales-add`;

//     const url = `https://sfa.369dubai.com/api/sales-add`;

//     return this.http.post<any>(url, saleDetails);
//   }

//   getAllSales(): Observable<any[]> {
//     // const url = `http://localhost:3000/api/get-sales`;
//     const url = `https://sfa.369dubai.com/api/get-sales`;
//     return this.http.get<any[]>(url);
//   }

//   updateSales(salesData: any): Observable<any> {
//     const saleId = salesData.id;
//     // const url = `http://localhost:3000/api/sales/${saleId}`;
//     const url = `https://sfa.369dubai.com/api/sales/${saleId}`;
//     return this.http.put<any>(url, salesData);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  // private readonly baseUrl = 'https://sale-backend.up.railway.app/api'; // Define your base URL here
  private readonly baseUrl = 'http://localhost:3000/api';
  constructor(private http : HttpClient) { }

  archiveSales(saleId: string): Observable<any> {
    const url = `${this.baseUrl}/sales/archive/${saleId}`;
    return this.http.put<any>(url, {});
  }

  saveSalesDetails(saleDetails: any): Observable<any> {
    const url = `${this.baseUrl}/sales-add`;
    return this.http.post<any>(url, saleDetails);
  }

  getAllSales(): Observable<any[]> {
    const url = `${this.baseUrl}/get-sales`;
    return this.http.get<any[]>(url);
  }

  updateSales(salesData: any): Observable<any> {
    const saleId = salesData.id;
    const url = `${this.baseUrl}/sales/${saleId}`;
    return this.http.put<any>(url, salesData);
  }
}


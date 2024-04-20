import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http : HttpClient) { }

  archiveSales(productId: string): Observable<any> {
    const url = `http://localhost:3000/api/products/archive/${productId}`;
    return this.http.put<any>(url, {});
  }

  saveSalesDetails(userDetails: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/product-add`, userDetails);
  }
}

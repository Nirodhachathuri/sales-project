import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `http://localhost:3000/api`;
    // this.baseUrl = `https://sale-backend.up.railway.app/api`;
  }

  saveProductDetails(productDetails: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/product-add`, productDetails);
  }

  updateProduct(productData: any): Observable<any> {
    const productId = productData.id;
    return this.http.put<any>(`${this.baseUrl}/products/${productId}`, productData);
  }

  archiveProduct(productId: string): Observable<any> {
    const url = `${this.baseUrl}/products/archive/${productId}`;
    return this.http.put<any>(url, {});
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-products`);
  }
}

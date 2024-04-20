import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  saveProductDetails(userDetails: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/product-add`, userDetails);
  }
  updateProduct(productData: any): Observable<any> {
    const productId = productData.id;
    return this.http.put<any>(`http://localhost:3000/api/products/${productId}`, productData);
  }

  archiveProduct(productId: string): Observable<any> {
    const url = `http://localhost:3000/api/products/archive/${productId}`;
    return this.http.put<any>(url, {});
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/get-products`);
  }

}

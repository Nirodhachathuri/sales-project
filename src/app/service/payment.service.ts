import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl: string;

  constructor(private http:HttpClient) {
    this.baseUrl = `http://localhost:3000/api`;
    // this.baseUrl = `https://sale-backend.up.railway.app/api`;
   }
   getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-payments`);
  }
  savePaymentDetails(paymentData): Observable<any[]> {
    const paymentId = paymentData.id;
    return this.http.put<any[]>(`${this.baseUrl}/payments/${paymentId}`, paymentData);
  }

}

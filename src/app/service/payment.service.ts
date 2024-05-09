import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) {

   }
   getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/get-payments`);
  }
  savePaymentDetails(paymentData): Observable<any[]> {
    const paymentId = paymentData.id;
    return this.http.put<any[]>(`http://localhost:3000/api/payments/${paymentId}`, paymentData);
  }

}

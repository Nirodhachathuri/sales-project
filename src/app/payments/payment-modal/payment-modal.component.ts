import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public paymentData: any,
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
    console.log(this.paymentData)
  }

  initForm(): void {
    this.paymentForm = this.formBuilder.group({
      id: [''],
      orderId: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      status: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      note: ['']
    });
  }


  populateForm(): void {
    // Populate the form with the provided paymentData
    this.paymentForm.patchValue({
      id: this.paymentData.id,
      orderId: this.paymentData.orderId,
      price: this.paymentData.Order.price,
      quantity: this.paymentData.quantity,
      status: this.paymentData.status,
      paymentMethod: this.paymentData.paymentType,
      note: this.paymentData.note || ''
    });
  }

  save(): void {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      this.paymentService.savePaymentDetails(paymentData).subscribe(
        () => {
  
  
          // Close the dialog
          this.dialogRef.close();
        },
        error => {
          console.error('Error updating user:', error);
          // Handle error
        }
      );
      this.dialogRef.close();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesDeleteComponent } from 'src/app/dashboard/sales/sales.component';
import { CustomerService } from 'src/app/service/customer.service';
import { SalesService } from 'src/app/service/sales.service';

@Component({
  selector: 'app-customer-model',
  templateUrl: './customer-model.component.html',
  styleUrls: ['./customer-model.component.css']
})
export class CustomerModelComponent implements OnInit {

  customer: any = {}; // Object to store user details
  salesPersons: any = [];
  cities = ['Colombo',
    'Kandy',
    'Galle',
    'Jaffna',
    'Matara',
    'Negombo',
    'Anuradhapura',
    'Polonnaruwa',
    'Trincomalee',
    'Batticaloa',
    'Ratnapura',
    'Kurunegala',
    'Badulla',
    'Nuwara Eliya',
    'Kalutara',
    'Gampaha',
    'Hambantota',
    'Ampara',
    'Mannar',
    'Puttalam',
    'Kegalle',
    'Vavuniya',
    'Kilinochchi',
    'Mullaitivu',
    'Monaragala']; // Add more cities as needed

  customerForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<CustomerEditModelComponent>, private customerService: CustomerService, private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      cuname: ['', Validators.required],
      email: ['', [Validators.required]],
      cnumber: ['', Validators.required],
      shopName: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      salesname: ['', Validators.required],
    });
  }
  fetchSalesPersons(salesArea): void {
    this.customerService.getAllSales().subscribe(
      (salesReps: any[]) => {
        this.salesPersons = salesReps
          .filter(rep => rep.salesArea === salesArea)
          .map(rep => ({
            id: rep.id,
            name: rep.salesName,
            area: rep.salesArea
          }));
      },
      error => {
        console.error('Error fetching sales representatives:', error);
      }
    );
  }

  onSalesAreaChange(selectArea: string): void {
    this.fetchSalesPersons(selectArea);
  }

  ngOnInit(): void {

  }

  save(): void {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value; // Get the form values
      // Call your service method to save the data
      console.log(formData)
      this.customerService.saveCustomersDetails(formData).subscribe(
        response => {
          // Handle success response
          console.log('Product saved successfully:', response);
          // Optionally, reset the form after successful submission
          this.dialogRef.close(this.customer);
        },
        error => {
          // Handle error response
          console.error('Error saving user:', error);

          // Optionally, display an error message to the user
        }
      );
    } else {
      // Form is invalid, display error messages or take appropriate action
      this.dialogRef.close(this.customer);
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without passing any data back
  }

}
@Component({
  selector: 'app-customer-delete-model',
  templateUrl: './customer-delete-model.component.html',
  styleUrls: ['./customer-model.component.css']
})
export class CustomerDeleteModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomerDeleteModelComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancelClick(): void {
    this.dialogRef.close(false); // Pass false to indicate cancellation
  }

  onConfirmClick(): void {

    let id = this.data.customerId;
    console.log(id)
    // Call the userService method to archive the user data
    this.customerService.archiveCustomers(id).subscribe(
      () => {

        console.log(this.data)
        console.log('Product archived successfully');
        this.dialogRef.close(true); // Close the dialog and pass true to indicate success
      },
      (error) => {
        console.error('Error archiving user:', error);
        // Handle error as needed
      }
    );
  }

}

@Component({
  selector: 'app-customer-edit-model',
  templateUrl: './customer-edit-model.component.html',
  styleUrls: ['./customer-model.component.css']
})
export class CustomerEditModelComponent implements OnInit {

  customerForm: FormGroup;
  salesPersons: any = [];
  cities = ['Colombo',
    'Kandy',
    'Galle',
    'Jaffna',
    'Matara',
    'Negombo',
    'Anuradhapura',
    'Polonnaruwa',
    'Trincomalee',
    'Batticaloa',
    'Ratnapura',
    'Kurunegala',
    'Badulla',
    'Nuwara Eliya',
    'Kalutara',
    'Gampaha',
    'Hambantota',
    'Ampara',
    'Mannar',
    'Puttalam',
    'Kegalle',
    'Vavuniya',
    'Kilinochchi',
    'Mullaitivu',
    'Monaragala']; // Add more cities as needed

  constructor(@Inject(MAT_DIALOG_DATA) public customerData: any,
    private dialogRef: MatDialogRef<CustomerEditModelComponent>,
    private customerService: CustomerService,
    private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
    this.fetchSalesPersons(this.customerData.salesArea)
    console.log(this.customerData)
  }

  fetchSalesPersons(salesArea): void {
    this.customerService.getAllSales().subscribe(
      (salesReps: any[]) => {
        this.salesPersons = salesReps
          .filter(rep => rep.salesArea === salesArea)
          .map(rep => ({
            id: rep.id,
            salesName: rep.salesName,
            salesArea: rep.salesArea
          }));
      },
      error => {
        console.error('Error fetching sales representatives:', error);
      }
    );
  }

  initForm(): void {
    this.customerForm = this.formBuilder.group({
      id: [''],
      cuname: ['', Validators.required],
      email: ['', [Validators.required]],
      cnumber: ['', Validators.required],
      shopName: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      salesRep: [null, Validators.required],
    });
  }

  populateForm(): void {
    // Populate the form with user data
    const selectedSalesRep = this.customerData.salesRep

    this.customerForm.patchValue({
      id: this.customerData.id,
      cuname: this.customerData.customerName,
      email: this.customerData.email,
      cnumber: this.customerData.cnumber,
      city: this.customerData.salesArea,
      shopName: this.customerData.shopName,
      address: this.customerData.address,
      salesRep: selectedSalesRep,
    });
  }

  
  onSalesAreaChange(selectArea: string): void {
    this.fetchSalesPersons(selectArea);
  }

  save(): void {
    const updatedCustomersData = this.customerForm.value;

    this.customerService.updateCustomers(updatedCustomersData).subscribe(
      () => {
        // Close the dialog
        this.dialogRef.close();
      },
      error => {
        console.error('Error updating sales person:', error);
        // Handle error
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';
import { SalesService } from 'src/app/service/sales.service';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  saleRep: any = {}; // Object to store user details
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
 
  saleRepForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<SalesComponent>,private salesService: SalesService,private formBuilder: FormBuilder) {
    this.saleRepForm = this.formBuilder.group({
      salesname: ['', Validators.required],
      email: ['', [Validators.required]],
      cnumber: ['', Validators.required],
      city: [''],
    });
  }
  
  ngOnInit(): void {}
  
  save(): void {
      if (this.saleRepForm.valid) {
        const formData = this.saleRepForm.value; // Get the form values
        // Call your service method to save the data
        this.salesService.saveSalesDetails(formData).subscribe(
          response => {
            // Handle success response
            console.log('Product saved successfully:', response);
            // Optionally, reset the form after successful submission
            this.dialogRef.close(this.saleRep);
          },
          error => {
            // Handle error response
            console.error('Error saving user:', error);
            
            // Optionally, display an error message to the user
          }
        );
      } else {
        // Form is invalid, display error messages or take appropriate action
        this.dialogRef.close(this.saleRep);
      }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without passing any data back
  }

 

}

@Component({
  selector: 'app-sales-delete',
  templateUrl: './sales-delete.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesDeleteComponent implements OnInit {
 

  constructor(
    public dialogRef: MatDialogRef<SalesDeleteComponent>,
    private salesService:SalesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancelClick(): void {
    this.dialogRef.close(false); // Pass false to indicate cancellation
  }

  onConfirmClick(): void {
    
    let id = this.data.salesRepId;
    console.log(id)
    // Call the userService method to archive the user data
    this.salesService.archiveSales(id).subscribe(
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
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesEditComponent implements OnInit {

  salesForm: FormGroup;
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
  
  constructor(@Inject(MAT_DIALOG_DATA) public salesData: any,
  private dialogRef: MatDialogRef<SalesEditComponent>,
  private salesService: SalesService,
  private formBuilder: FormBuilder) { 
    this.salesForm = this.formBuilder.group({
      salesName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cnumber: ['', Validators.required],
      city:['',Validators.required],
    });
    }
    ngOnInit(): void {
      this.initForm();
      this.populateForm();
    }

    
  
    initForm(): void {
      this.salesForm = this.formBuilder.group({
        id:[''],
        salesName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cnumber: ['', Validators.required],
      city: [this.salesData.salesArea, Validators.required], 
      });
    }
  
    populateForm(): void {
      // Populate the form with user data
      this.salesForm.patchValue({
        id: this.salesData.id,
        salesName: this.salesData.salesName,
      email: this.salesData.email,
      cnumber: this.salesData.cnumber,
      city:this.salesData.salesArea
      });
    }
    save(): void {
      const updatedSalesData = this.salesForm.value;
    
      this.salesService.updateSales(updatedSalesData).subscribe(
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
    
 cancel(){
  this.dialogRef.close();
 }

}

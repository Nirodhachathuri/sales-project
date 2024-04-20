import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  user: any = {}; // Object to store user details
  userForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<ProductNewComponent>,private productService: ProductService,private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      productname: ['', Validators.required],
      price: ['', [Validators.required]],
      quantity: ['', Validators.required],
     
    });
  }
  
  ngOnInit(): void {}
  
  save(): void {
    // this.productService.saveProductDetails(this.user)
    //   .subscribe(response => {
    //     console.log('Product details saved successfully:', response);
    //     this.dialogRef.close(this.user); // Close the modal and pass user data back
    //     // Optionally, reset the form or show a success message
    //   }, error => {
    //     console.error('Error saving user details:', error);
    //     // Optionally, show an error message to the user
    //   });


      if (this.userForm.valid) {
        const formData = this.userForm.value; // Get the form values
        // Call your service method to save the data
        this.productService.saveProductDetails(formData).subscribe(
          response => {
            // Handle success response
            console.log('Product saved successfully:', response);
            // Optionally, reset the form after successful submission
            this.dialogRef.close(this.user);
          },
          error => {
            // Handle error response
            console.error('Error saving user:', error);
            
            // Optionally, display an error message to the user
          }
        );
      } else {
        // Form is invalid, display error messages or take appropriate action
        this.dialogRef.close(this.user);
      }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without passing any data back
  }

}


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./product-new.component.css']
})
export class EditProductComponent implements OnInit {

  userForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public userData: any,
  private dialogRef: MatDialogRef<EditProductComponent>,
  private productService: ProductService,
  private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      productname: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.email]],
      price: ['', Validators.required],
    });
    }
    ngOnInit(): void {
      this.initForm();
      this.populateForm();
      console.log(this.userData)
    }

    
  
    initForm(): void {
      this.userForm = this.formBuilder.group({
        id: [''],
        productname: [''],
        quantity: [''],
        price:[''],
        // Add other form controls here
      });
    }
  
    populateForm(): void {
      // Populate the form with user data
      this.userForm.patchValue({
        id:this.userData.id,
        productname: this.userData.productname,
        price: this.userData.price,
        quantity:this.userData.quantity,
      });
    }
    save(): void {
      const updatedProductData = this.userForm.value;
    
      this.productService.updateProduct(updatedProductData).subscribe(
        () => {
          
    
          // Close the dialog
          this.dialogRef.close();
        },
        error => {
          console.error('Error updating user:', error);
          // Handle error
        }
      );
    }
    
 cancel(){
  this.dialogRef.close();
 }
}


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./product-new.component.css']
})
export class DeleteProductComponent  {

  
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    private productService:ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false); // Pass false to indicate cancellation
  }

  onConfirmClick(): void {
    
    let id = this.data.productId;
    console.log(id)
    // Call the userService method to archive the user data
    this.productService.archiveProduct(id).subscribe(
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
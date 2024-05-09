import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {

  products: any = {}; // Object to store user details
  order: any = {};
  salesPersons: any = [];
  selectedShopId: string;
  orderForm: FormGroup;
  selectedProducts: any = [];
  totalPrice: number = 0;
  constructor(private dialogRef: MatDialogRef<OrderModalComponent>, private orderService: OrderService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { shopId: string },) {
    this.selectedShopId = data.shopId;
    this.orderForm = this.formBuilder.group({
      selectedShopId: [this.selectedShopId, Validators.required], // Assuming selectedShopId is already defined in your component
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      note: [''] // Add note field with an empty string as the default value
    });
  }
  onProductChange(productId: any) {
    this.orderService.getAllProducts().subscribe(
      (salesReps: any[]) => {
        this.products = salesReps

      },
      error => {
        console.error('Error fetching sales representatives:', error);
      }
    );
  }

  getAllProducts() {
    this.orderService.getAllProducts().subscribe(
      (salesReps: any[]) => {
        this.products = salesReps

      },
      error => {
        console.error('Error fetching sales representatives:', error);
      }
    );
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      selectedShopId: [this.selectedShopId, Validators.required], // Assuming selectedShopId is already defined in your component
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      note: [''] // Add note field with an empty string as the default value

    });
    console.log(this.data)
    // Subscribe to value changes in the form
    this.orderForm.get('quantity').valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
    this.getAllProducts();
  }

  calculateTotalPrice() {
    const selectedProductId = this.orderForm.get('product').value;
    const selectedProduct = this.products.find(product => product.id === selectedProductId);

    if (selectedProduct) {
      const unitPrice = selectedProduct.price;
      const quantity = this.orderForm.get('quantity').value;

      // Calculate total price based on unit price and quantity
      this.totalPrice = unitPrice * quantity;

      // Set the value of the 'price' form control to the total price
      this.orderForm.get('price').setValue(this.totalPrice);
    } else {
      // Reset total price if no product is selected
      this.totalPrice = 0;

      // Reset the value of the 'price' form control
      this.orderForm.get('price').setValue(null);
    }
  }

  save(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value; // Get the form values
      // Call your service method to save the data
      console.log(formData)
      this.orderService.saveOrderDetails(formData).subscribe(
        response => {
          // Handle success response
          console.log('Product saved successfully:', response);
          // Optionally, reset the form after successful submission
          this.dialogRef.close(this.order);
        },
        error => {
          // Handle error response
          console.error('Error saving user:', error);

          // Optionally, display an error message to the user
        }
      );
    } else {
      // Form is invalid, display error messages or take appropriate action
      this.dialogRef.close(this.orderForm);
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without passing any data back
  }


}

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderEditComponent implements OnInit {
  products: any[]; 
  orderForm: FormGroup;
  totalPrice: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public orderData: any,
    private dialogRef: MatDialogRef<OrderEditComponent>,
    private orderService: OrderService,
    private formBuilder: FormBuilder,private productService: ProductService) { }
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
    console.log(this.orderData);
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });

    // Calculate total price when form loads
   this.totalPrice = this.orderForm.get('price').value || 0;

     // Subscribe to value changes in the form
     this.orderForm.get('quantity').valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  onProductChange(productId: any) {
    // Implement your logic here
  }

  calculateTotalPrice() {
    const selectedProductId = this.orderForm.get('product').value;
    const selectedProduct = this.products.find(product => product.id === selectedProductId);

    if (selectedProduct) {
      const unitPrice = selectedProduct.price;
      const quantity = this.orderForm.get('quantity').value;

      // Calculate total price based on unit price and quantity
      this.totalPrice = unitPrice * quantity;

      // Set the value of the 'price' form control to the total price
      this.orderForm.get('price').setValue(this.totalPrice);
    } else {
      // Reset total price if no product is selected
      this.totalPrice = 0;

      // Reset the value of the 'price' form control
      this.orderForm.get('price').setValue(null);
    }
  }
  initForm(): void {
    this.orderForm = this.formBuilder.group({
      id: [''],
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      status: [''],
      price: ['']
    });
  }

  populateForm(): void {
    // Populate the form with user data
    this.orderForm.patchValue({
      id: this.orderData.id,
      product: this.orderData.productId, // Assuming you have productId in your order data
      quantity: this.orderData.quantity,
      status: this.orderData.status,
      price: this.orderData.price // Assuming you have totalPrice in your order data
    });
  }
  save(): void {
    const updatedOrderData = this.orderForm.value;

    this.orderService.updateOrders(updatedOrderData).subscribe(
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

  cancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDeleteComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancelClick(): void {
    this.dialogRef.close(false); // Pass false to indicate cancellation
  }

  onConfirmClick(): void {

    let id = this.data.orderId;
    console.log(id)
    // Call the userService method to archive the user data
    this.orderService.archiveOrders(id).subscribe(
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

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent, EditProductComponent, ProductNewComponent } from './product-new/product-new.component';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products$: any[] = [];
  products: any[] = [];
  selectedProductName: string = '';
  dtOptions: any = {
    pagingType: 'simple_numbers',
    lengthMenu: [10, 25, 50, 100]
    // Add other DataTables options as needed
  };
  
  
  
  constructor(private productService: ProductService, private dialog: MatDialog) { }
  iconSize: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Adjust icon size based on screen width
    if (window.innerWidth < 768) {
      this.iconSize = 'small'; // Set small icon size for smaller screens
    } else {
      this.iconSize = 'default'; // Set default icon size for larger screens
    }
  }
  ngOnInit(): void {
    
    
    this.fetchData();
  };

  fetchData() {
  
    this.productService.getAllProducts().subscribe(data => {
      this.products$ = data;
      this.products = data;
    });
     const filteredUsers = this.filteredData();
     this.products$ = filteredUsers;
  }
  
  filteredData() {
    // Filter the products based on selected product name
    return this.products$.filter(product => {
      return (!this.selectedProductName || product.productname === this.selectedProductName);
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(ProductNewComponent, {
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  editSalesRep(productId: string) {
    // Fetch sales rep data based on salesRepId
    // const salesRepData = /* fetch sales rep data */;
    const userData = this.products.find(product => product.id === productId);
    if (userData) {
      const dialogRef = this.dialog.open(EditProductComponent, {
        width: '400px', // adjust as needed
        data: userData, // pass user data to modal
      });
      console.log(userData)
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle modal close event if needed
      });
    } else {
      console.error('User not found');
      // Handle case where user data is not found
    }

  }

  onDeleteClick(productId: string): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?', productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion, handle delete action
        // For example:
        // this.deleteItem();
        console.log('Item deleted');
      } else {
        // User cancelled deletion
        console.log('Deletion cancelled');
      }
    });
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDeleteModelComponent, CustomerEditModelComponent, CustomerModelComponent } from './customer-model/customer-model.component';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers$: any[] = [];
  customers: any[] = [];
  selectedUserName: string = '';
  selectedSalesArea: string = '';
  dtOptions: any = {
    pagingType: 'simple_numbers',
    lengthMenu: [10, 25, 50, 100]
    // Add other DataTables options as needed
  };
  salesAreas: string[] = []; 
    constructor( private customerService: CustomerService,private dialog: MatDialog) {}

  ngOnInit():void {

   
    this.fetchData();
  };

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
  
fetchData(){
  this.customerService.getCustomersReps().subscribe(data => {
    this.customers$ = data;
    this.customers = data;
  });
   const filteredUsers = this.filteredData();
   this.customers$ = filteredUsers;
}

filteredData(){
  return this.customers$.filter(customer => {
    return (!this.selectedUserName || customer.name === this.selectedUserName) &&
           (!this.selectedSalesArea || customer.salesArea === this.selectedSalesArea);
  });
}
openCreateModal() {
  const dialogRef = this.dialog.open(CustomerModelComponent, {
    width: '400px', // Adjust the width as needed
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

editCustomer(customerId: string) {
  // Fetch sales rep data based on salesRepId
  // const salesRepData = /* fetch sales rep data */;
  const salesData = this.customers.find(customer => customer.id === customerId);
    if (salesData) {
      const dialogRef = this.dialog.open(CustomerEditModelComponent, {
        width: '400px', // adjust as needed
        data: salesData, // pass user data to modal
      });
      console.log(salesData)
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle modal close event if needed
      });
    } else {
      console.error('User not found');
      // Handle case where user data is not found
    }

  }

  onDeleteClick(customerId:string): void {
    const dialogRef = this.dialog.open(CustomerDeleteModelComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?',customerId: customerId  }
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

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
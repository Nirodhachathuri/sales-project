import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SalesComponent, SalesDeleteComponent, SalesEditComponent } from './sales/sales.component';
import { SalesService } from '../service/sales.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sales$: any[] = [];
  sales: any[] = [];
  selectedUserName: string = '';
  selectedSalesArea: string = '';
  dtOptions: any = {
    pagingType: 'simple_numbers',
    lengthMenu: [10, 25, 50, 100]
    // Add other DataTables options as needed
  };
  salesAreas: string[] = []; 
    constructor( private salesService: SalesService,private dialog: MatDialog,private router:Router) {}

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
     
    };

    this.salesAreas = ['Area 1', 'Area 2', 'Area 3']; // Example sales areas
    this.fetchData();
  };
fetchData(){
  this.salesService.getAllSales().subscribe(data => {
    this.sales$ = data;
    this.sales = data;
  });
   const filteredSales = this.filteredData();
   this.sales$ = filteredSales;
}

filteredData(){
  return this.sales$.filter(sale => {
    return (!this.selectedUserName || sale.name === this.selectedUserName) &&
           (!this.selectedSalesArea || sale.salesArea === this.selectedSalesArea);
  });
}
openCreateModal() {
  const dialogRef = this.dialog.open(SalesComponent, {
    width: '400px', // Adjust the width as needed
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });

  this.refreshPage();
}

editSalesRep(salesId: string) {
  // Fetch sales rep data based on salesRepId
  // const salesRepData = /* fetch sales rep data */;
  
  
  const salesData = this.sales.find(product => product.id === salesId);
    if (salesData) {
      const dialogRef = this.dialog.open(SalesEditComponent, {
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

  onDeleteClick(salesRepId:string): void {
    const dialogRef = this.dialog.open(SalesDeleteComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?', salesRepId: salesRepId }
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

    this.refreshPage();
  }

  refreshPage() {
    // Navigate to the current route
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
    });
}
viewSalesRep(saleId: string) {
  // Find the user with the specified userId
  const salesData = this.sales.find(sale => sale.id === saleId);

  // If user data is found
  if (salesData) {
    const dialogRef = this.dialog.open(ViewSalesComponent, {
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
}

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ViewSalesComponent implements OnInit {
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
  private formBuilder: FormBuilder,private dialogRef: MatDialogRef<ViewSalesComponent>,) { }

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
  cancel(){
    this.dialogRef.close();
   }
}
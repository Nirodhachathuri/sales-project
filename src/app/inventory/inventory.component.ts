import { Component, OnInit } from '@angular/core';
import { DeleteModelComponent } from '../delete-model/delete-model.component';
import { ModelComponent } from '../model/model.component';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  users$: any[] = [];
  users: any[] = [];
  selectedUserName: string = '';
  selectedSalesArea: string = '';
  dtOptions: DataTables.Settings = {};
  salesAreas: string[] = []; 
  constructor( private data: AuthService,private dialog: MatDialog) {}

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
     
    };

    this.salesAreas = ['Area 1', 'Area 2', 'Area 3']; // Example sales areas
    this.fetchData();
  };
fetchData(){
  this.data.getSampleData().subscribe(data => {
    this.users$ = data;
    this.users = data;
  });
   const filteredUsers = this.filteredData();
   this.users$ = filteredUsers;
}

filteredData(){
  return this.users$.filter(user => {
    return (!this.selectedUserName || user.name === this.selectedUserName) &&
           (!this.selectedSalesArea || user.salesArea === this.selectedSalesArea);
  });
}
openCreateModal() {
  const dialogRef = this.dialog.open(ModelComponent, {
    width: '400px', // Adjust the width as needed
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

editSalesRep(userId: string) {
  // Fetch sales rep data based on salesRepId
  // const salesRepData = /* fetch sales rep data */;
  this.data.getSampleDataId(userId).subscribe(userData=> {
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '400px', // adjust as needed
      data: userData, // pass sales rep data to modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle modal close event if needed
    });
  });
  }

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
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

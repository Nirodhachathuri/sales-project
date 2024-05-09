import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../service/payment.service';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  users$: any[] = [];
  users: any[] = [];
  selectedUserName: string = '';
  selectedSalesArea: string = '';


  salesAreas: string[] = []; 
  dtOptions: { pagingType: string; };
  constructor( private paymentService: PaymentService,private dialog: MatDialog) {}

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

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
     
    };

    this.salesAreas = ['Area 1', 'Area 2', 'Area 3']; // Example sales areas
    this.fetchData();
  };
fetchData(){
  this.paymentService.getAllPayments().subscribe(data => {
    this.users$ = data;
    this.users = data;
    console.log(data)
  });
  //  const filteredUsers = this.filteredData();
  //  this.users$ = filteredUsers;
}

// filteredData(){
//   return this.users$.filter(user => {
//     return (!this.selectedUserName || user.name === this.selectedUserName) &&
//            (!this.selectedSalesArea || user.salesArea === this.selectedSalesArea);
//   });
// }

editPayment(paymentId: string) {
  // Fetch sales rep data based on salesRepId
  // const salesRepData = /* fetch sales rep data */;
  console.log(this.users)
  const paymentData = this.users.find(payment => payment.id === paymentId);
  if (paymentData) {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '400px', // adjust as needed
      data: paymentData, // pass user data to modal
    });
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

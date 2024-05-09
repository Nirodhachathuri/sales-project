import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../service/order.service';
import { OrderDeleteComponent, OrderEditComponent, OrderModalComponent } from './order-modal/order-modal.component';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders$: any[] = [];
  orders: any[] = [];
  products: any[] = [];
  selectedShopName: string = '';
  selectedSalesArea: string = '';
  ongoingOrders: any[] = []; // Assuming ongoingOrders is an array of objects
  deliveredOrders: any[] = []; // Assuming deliveredOrders is an array of objects
  selectedShopId: string = '';

  salesAreas: string[] = [];
  dtOptions: { pagingType: string; };
  isShopSelected: boolean = false;
  constructor(private orderService: OrderService, private notificationService: NotificationService, private dialog: MatDialog) { }
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
    this.dtOptions = {
      pagingType: 'simple_numbers',

    };
    this.fetchData();
    this.getOrders();
    this.getDelivered();
    
  };
  getDelivered(){
    this.orderService.deliveredOrders().subscribe(data=>{
    //  this.deliveredOrders = data
    //  console.log(this.deliveredOrders)

    this.deliveredOrders = data.map(payment => {
      const orderId = payment.orderId; // Assuming you have a productName field in your order object
      const order = this.ongoingOrders.find(order => order.id === orderId);
      const product = this.products.find(product => product.id === order.productId);
      const productName = product ? product.productname : null;

      // Find the corresponding shop for the order
      const selectedShop = this.orders$.find(shop => shop.id === order.salesRep);
      const shopName = selectedShop ? selectedShop.shopName : null;

      return { ...payment, productName: productName, shopName: shopName };
    });
    })
    
  }
  onShopSelect() {
    // Check if a shop name is selected
    this.isShopSelected = !!this.selectedShopName;
    console.log(this.selectedShopName)
    const selectedShop = this.orders$.find(order => order.shopName === this.selectedShopName);
    this.selectedShopId = selectedShop ? selectedShop.id : '';
  }
  getOrders() {
    this.orderService.getAllOrders().subscribe(data => {
      // Map product names to product IDs in each order
      this.ongoingOrders = data.map(order => {
        const productId = order.productId; // Assuming you have a productName field in your order object
        const product = this.products.find(product => product.id === productId);
        const productName = product ? product.productname : null;

        // Find the corresponding shop for the order
        const selectedShop = this.orders$.find(shop => shop.id === order.salesRep);
        const shopName = selectedShop ? selectedShop.shopName : null;

        return { ...order, productName: productName, shopName: shopName };
      });
    });
  }
  fetchData() {
    this.orderService.getAllShopNames().subscribe(data => {
      this.orders$ = data;
      this.orders = data;
    });
    this.orderService.getAllProducts().subscribe(data => {

      this.products = data;
    });
    // const filteredUsers = this.filteredData();
    // this.orders$ = filteredUsers;
  }

  filteredData() {
    return this.orders$.filter(user => {
      return (!this.selectedShopName || user.name === this.selectedShopName) &&
        (!this.selectedSalesArea || user.salesArea === this.selectedSalesArea);
    });
  }
  openCreateModal() {
    console.log(this.selectedShopId)
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '400px', // Adjust the width as needed
      data: { shopId: this.selectedShopId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  editOrder(orderId: string) {
    // Fetch sales rep data based on salesRepId
    // const salesRepData = /* fetch sales rep data */;
    console.log(this.ongoingOrders)
    const orderData = this.ongoingOrders.find(order => order.id === orderId);
    if (orderData) {
      const dialogRef = this.dialog.open(OrderEditComponent, {
        width: '400px', // adjust as needed
        data: orderData, // pass user data to modal
      });
      console.log(orderData)
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle modal close event if needed
      });
    } else {
      console.error('User not found');
      // Handle case where user data is not found
    }

  }

  onDeleteClick(orderId: string): void {
    const dialogRef = this.dialog.open(OrderDeleteComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?', orderId: orderId }
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

  addNotification() {
    this.notificationService.addNotification("New notification message");
  }
}

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./orders.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

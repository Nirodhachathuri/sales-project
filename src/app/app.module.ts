import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import MatButtonModule
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card'
import {FormsModule} from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent,ViewSalesComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteModelComponent } from './users/user/delete-model/delete-model.component';
import { CustomerComponent,ViewCustomerComponent } from './customer/customer.component';
import { OrdersComponent,ViewOrderComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UserComponent, ViewUserComponent } from './users/user/user.component';
import { UserModelComponent } from './users/user/user-model/user-model.component';
import { MatSelectModule } from '@angular/material/select';
import { EditUserModelComponent } from './users/user/edit-user-model/edit-user-model.component';
import { ProductNewComponent,EditProductComponent,DeleteProductComponent} from './inventory/product-new/product-new.component';
import { SalesComponent, SalesDeleteComponent, SalesEditComponent } from './dashboard/sales/sales.component';
import { CustomerModelComponent,CustomerEditModelComponent,CustomerDeleteModelComponent } from './customer/customer-model/customer-model.component';
import { OrderModalComponent,OrderEditComponent,OrderDeleteComponent } from './orders/order-modal/order-modal.component';
import { PaymentModalComponent } from './payments/payment-modal/payment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    DeleteModelComponent,
    CustomerComponent,
    OrdersComponent,
    PaymentsComponent,
    InventoryComponent,
    UserComponent,
    UserModelComponent,
    EditUserModelComponent,
    ViewUserComponent,
    ProductNewComponent,
    EditProductComponent,
    DeleteProductComponent,
    SalesComponent,
    SalesEditComponent,
    SalesDeleteComponent,
    ViewSalesComponent,
    CustomerModelComponent,
    CustomerEditModelComponent,
    CustomerDeleteModelComponent,
    ViewCustomerComponent,
    OrderModalComponent,
    PaymentModalComponent,
    OrderEditComponent,
    OrderDeleteComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    DataTablesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatDialogModule,
  ],
  exports: [
    FormsModule,
    ToastrModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentsComponent } from './payments/payments.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UserComponent } from './users/user/user.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: '',component: LoginComponent }, { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
{ path: 'customers', canActivate: [AuthGuard], component: CustomerComponent }, { path: 'orders', canActivate: [AuthGuard], component: OrdersComponent },
{ path: 'payments', canActivate: [AuthGuard], component: PaymentsComponent }, { path: 'inventory', canActivate: [AuthGuard], component: InventoryComponent }, { path: 'user', canActivate: [AuthGuard], component: UserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

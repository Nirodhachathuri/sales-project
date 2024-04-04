import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentsComponent } from './payments/payments.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';


const routes: Routes = [{ path: '', component: LoginComponent },{path:'dashboard', component:DashboardComponent},
{path:'customers',component:CustomerComponent},{path:'orders',component:OrdersComponent},
{path:'payments',component:PaymentsComponent},{path:'inventory',component:InventoryComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

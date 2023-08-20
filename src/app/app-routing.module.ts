import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { ListmobileComponent } from './listmobile/listmobile.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  { path: '', component: ListmobileComponent }, 
  { path: 'Login', component: LoginComponent },
  { path: 'Createaccount', component: CreateaccountComponent },
  { path: 'Listmobile', component: ListmobileComponent },
  { path: 'orderconfirmation', component: OrderConfirmationComponent },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

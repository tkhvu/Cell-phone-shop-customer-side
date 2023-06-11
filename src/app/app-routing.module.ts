import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Createaccount', component: CreateaccountComponent },
  { path: 'Shop', component: ShopComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

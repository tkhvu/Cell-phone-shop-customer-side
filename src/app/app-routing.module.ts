import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { ListmobileComponent } from './listmobile/listmobile.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Createaccount', component: CreateaccountComponent },
  { path: 'Listmobile', component: ListmobileComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

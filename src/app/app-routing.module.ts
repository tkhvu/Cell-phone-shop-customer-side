import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { adduserComponent } from './adduser/adduser.component';
import { ListmobileComponent } from './listmobile/listmobile.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { DirectorComponent } from './director/director.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AdminGuard } from './Role-based-authentication';

const routes: Routes = [
  { path: '', component: ListmobileComponent}, 
  { path: 'Login', component: LoginComponent },
  { path: 'Createaccount', component: adduserComponent },
  { path: 'Listmobile', component: ListmobileComponent  },
  { path: 'orderconfirmation', component: OrderConfirmationComponent },
  { path: 'Director', component: DirectorComponent, canActivate: [AdminGuard] },
  { path: 'Favourites', component: FavouritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

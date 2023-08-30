import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListmobileComponent } from './listmobile/listmobile.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StrengthCheckerComponent } from './createaccount/strength-checker.component';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import {NgIf} from '@angular/common';
import {TextFieldModule} from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { DirectorComponent } from './director/director.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    ListmobileComponent,
    LoginComponent,
    CreateaccountComponent,
    StrengthCheckerComponent,
    CartDialogComponent,
    OrderConfirmationComponent,
    DirectorComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ScrollingModule,
    MatMenuModule,
    MatDialogModule,
    TextFieldModule,
    NgIf,
    MatSelectModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule
 



  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ListmobileComponent } from './listmobile/listmobile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { WagonComponent } from './wagon/wagon.component';
import {MatTableModule} from '@angular/material/table';
import { MaterialComponent } from './material/material.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { TryComponent } from './try/try.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StrengthCheckerComponent } from './createaccount/strength-checker.component';



@NgModule({
  declarations: [
    AppComponent,
    ListmobileComponent,
    WagonComponent,
    MaterialComponent,
    LoginComponent,
    CreateaccountComponent,
    TryComponent,
    StrengthCheckerComponent
    
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
    MatProgressSpinnerModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

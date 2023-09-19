import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  firstNameAutofilled: boolean | undefined;
  lastNameAutofilled: boolean | undefined;

  bioSection: FormGroup;
  constructor(private fb: FormBuilder, public api: ApiService,  private router: Router) {
    this.bioSection = this.fb.group({
      // firstname: ['', Validators.required],
      // lastname: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Housenumber: ['', Validators.required],
      Apartmentnumber: ['', Validators.required],
    });
  }


  OrderConfirmation() {
    this.api.combinedData = {
      user: this.api.user,
      orders: this.api.cartItems,
      DeliveryDetails: this.bioSection.value
    };
    this.api.Emailorderconfirmation(this.api.combinedData)
    if(this.api.email = "Email sent successfully"){
      this.openSnackBar()
    }
  }
  displayedColumns: string[] = ['name', 'price', "src"];


  getTotalCost() {
    return this.api.cartItems.reduce((total, item) => total + (item.price! * item.count), 0);
  }

  openSnackBar() {
    window.alert("הזמנה הסתימה בהצלחה");
    console.log(this.api.user[0].cart[0])
    const _id = `/?_id=${this.api.user[0].cart[0]}`;
    this.api.ademptyCart(_id)
    this.router.navigate(['/Listmobile']);
  }
}

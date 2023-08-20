import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  firstNameAutofilled: boolean | undefined;
  lastNameAutofilled: boolean | undefined;
  
  bioSection: FormGroup;

  constructor(private fb: FormBuilder, public api: ApiService) {
    this.bioSection = this.fb.group({
      // firstname: ['', Validators.required],
      // lastname: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.pattern('^[0-9]+$'), Validators.required]],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Housenumber: ['', Validators.required],
      Apartmentnumber: ['', Validators.required],
    });
  }


  OrderConfirmation(){


    this.api.combinedData = {
      user: this.api.user,
      orders: this.api.cartItems,
      DeliveryDetails: this.bioSection.value
  };
  console.log(this.api.combinedData);

    this.api.addUser1( this.api.combinedData)

  }


// callingFunction(event: Event){

//   console.log(event);
//   this.api.addUser1(event)
// }
}

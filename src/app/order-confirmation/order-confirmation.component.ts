import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';



@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  firstNameAutofilled: boolean | undefined;
  lastNameAutofilled: boolean | undefined;

  bioSection: FormGroup;
  constructor(private fb: FormBuilder, public api: ApiService, public dialog: MatDialog, private router: Router) {
    this.bioSection = this.fb.group({
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
    this.DeletionConfirmation()
  }
  displayedColumns: string[] = ['name', 'price', "src"];


  getTotalCost() {
    return this.api.cartItems.reduce((total, item) => total + (item.price! * item.count), 0);
  }


  ActionConfirmationMessage() {
    const data = "ההזמנה בוצעה";
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      
        this.router.navigate(['/Listmobile']);
      
    })
  }

  DeletionConfirmation() {
    const data = "לבצע את ההזמנה";
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.Emailorderconfirmation(this.api.combinedData)
        if (this.api.email = "Email sent successfully") {
          const _id = `/?_id=${this.api.user[0].cart[0]}`;
          this.api.ademptyCart(_id);
          this.ActionConfirmationMessage()
        }
      }
    })
  }
}

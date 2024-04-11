import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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

  // ngOnInit() {
  //   const _id = localStorage.getItem('_id');
  //   const id = `/?_id=${this.api.user.cart}`;
  //   if (_id != null) {
  //     this.api.MobileDetails(id)
  //       .subscribe((data: any) => {
  //         this.api.cartItems = data[0].cart;
  //         this.getCart()
  //       }
  //       );
  //   }
  // }

  //   getCart() {
  //   const id = `/?_id=${this.api.user.cart}`

  //   this.api.getCart(id).subscribe({
  //     next: (data) => {

  //       this.api.totalCount = 0;

  //       for (const item of data.cart) {
  //         this.api.totalCount += item.count;
  //       }
  //       this.api.cart = data.cart;

  //       const combinedArray = this.api.cartItems.map((item) => {
  //         const matchingCountItem = this.api.cart.find((countItem) => countItem._id === item._id);
  //         if (matchingCountItem) {
  //           return { ...item, count: matchingCountItem.count };
  //         }
  //         return item;
  //       });
  //       this.api.cartItems = combinedArray
  //     },
  //     error: (err) => console.error('Error fetching cart:', err),
  //  });
  // }


  OrderConfirmation() {

    this.api.cartItems = this.api.cartItems.map(item => {
      const newItem = { ...item }; 
      delete newItem.src;          
      return newItem;              
    });

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
    const data = "ההזמנה בוצעה בהצלחה";
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      
        this.router.navigate(['/Listmobile']);
        this.api.totalCount = 0;
    })
  }


  DeletionConfirmation() {
    const data = "?האם ברצונך לבצע את ההזמנה";
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
         this.api.Emailorderconfirmation(this.api.combinedData).subscribe({
          next: (data) => {
            this.api.email = data.message;
            if (this.api.email === "Email sent successfully") {
              const _id = `/?_id=${this.api.user.cart}`;
              this.api.ademptyCart(_id);
              this.ActionConfirmationMessage();
            }
          },
          error: (err) => {
            console.error('Failed to send confirmation', err);
          }
        });
      }
    });
  }
}

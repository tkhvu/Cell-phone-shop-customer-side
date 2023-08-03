import { Component, OnInit } from '@angular/core';
import { ApiService } from './serviccs/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public apiService: ApiService, public dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.restoreFocus = false;
    dialogConfig.position = {
      top: '65px',
      left: '15px'
    };

    const dialogRef = this.dialog.open(CartDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }


  cartItems: { cart: string }[] = [];
  cart = false;

  ngOnInit() {
    const _id = localStorage.getItem('_id');
    if (_id === null) {
      this.apiService.LogOut();
    }
  }

  // getCart() {
  //   const _id = localStorage.getItem('_id');
  //   const id = `/?_id=${_id}` ;
  //   if (_id != null) {
  //     this.apiService.getCart(id)
  //       .subscribe((data: any) => {
  //         this.cartItems = data
  //         this.cart = true;
  //       }
  //       );
  //   }
  // }
}

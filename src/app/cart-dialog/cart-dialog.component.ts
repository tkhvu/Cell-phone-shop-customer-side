import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {

  constructor(public apiService: ApiService,) { }

  cartItems: { cart: string }[] = [];
  ngOnInit() {
    const _id = localStorage.getItem('_id');
    const id = `/?_id=${this.apiService.user[0].cart[0]}`;
    if (_id != null) {
      this.apiService.MobileDetails(id)
        .subscribe((data: any) => {
          this.cartItems = data[0].cart;
          console.log(this.cartItems)
        }
        );
    
    }
  }


  deleteItem(index: number, _id: string) {
    let data = this.cartItems;
    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
      this.cartItems = [...data];
      let id = `/?_id=${this.apiService.user[0].cart.toString()}&id=${_id}`
      this.apiService.deleteFromcart(id);
    }
  }
}


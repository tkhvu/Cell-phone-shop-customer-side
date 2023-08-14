import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { CartItem } from '../interfaces';



@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {

  constructor(public apiService: ApiService,) { }

  cartItems: CartItem[] = [];
  ngOnInit() {
    this.getCart()
    const _id = localStorage.getItem('_id');
    const id = `/?_id=${this.apiService.user[0].cart[0]}`;
    if (_id != null) {
      this.apiService.MobileDetails(id)
        .subscribe((data: any) => {
          this.cartItems = data[0].cart;
          this.apiService.cart = Object.values(this.apiService.cart).flat();
          const combinedArray = this.cartItems.map((item) => {
            const matchingCountItem = this.apiService.cart.find((countItem) => countItem._id === item._id);
            if (matchingCountItem) {
              return { ...item, count: matchingCountItem.count };
            }
            return item;
          });

          this.cartItems = combinedArray
        }
        );
    }
  }

  getCart() {
    const id = `/?_id=${this.apiService.user[0].cart[0]}`
    this.apiService.getCart(id).subscribe((data: any) => {
      let totalCount = 0;
      for (const item of data.cart) {
        totalCount += parseInt(item.count, 10);
      }
      this.apiService.cartLength = totalCount;
    }
    );
  }

  deleteItem(index: number, _id: string) {
    let data = this.cartItems;
    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
      this.cartItems = [...data];
      let id = `/?_id=${this.apiService.user[0].cart.toString()}&id=${_id}`
      this.apiService.updateAddCart(id);
    }
  }


  updateAddCart(item: any, action: string) {
    if (action === "remove") {
      item.count--;
    } else {
      item.count++;
    }
    let id = `/?_id=${this.apiService.user[0].cart.toString()}&id=${item._id}&count=${item.count}`
    this.apiService.updateAddCart(id);
    console.log("cartItems===", this.cartItems)
  }
}


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { CartItem } from '../interfaces';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  constructor(public apiService: ApiService, private router: Router) { }
  cartLength = 8


  ngOnInit() {
    const _id = localStorage.getItem('_id');
    const id = `/?_id=${this.apiService.user[0].cart[0]}`;
    if (_id != null) {
      this.apiService.MobileDetails(id)
        .subscribe((data: any) => {
          this.apiService.cartItems = data[0].cart;
          this.getCart()
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
      this.apiService.cart = data;
      this.apiService.cart = Object.values(this.apiService.cart).flat();

      const combinedArray = this.apiService.cartItems.map((item) => {
        const matchingCountItem = this.apiService.cart.find((countItem) => countItem._id === item._id);
        if (matchingCountItem) {
          return { ...item, count: matchingCountItem.count };
        }
        return item;
      });
      this.apiService.cartItems = combinedArray
    }
    );
  }

  deleteItem(index: number, element: any) {
    let data = this.apiService.cartItems;
    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
      this.apiService.cartItems = [...data];
      let id = `/?_id=${this.apiService.user[0].cart.toString()}&id=${element._id}`
      this.apiService.updateAddCart(id);
      this.apiService.cartLength -= element.count;
      console.log(this.apiService.cartLength)
    }
  }


  updateAddCart(index: number, item: any, action: string) {
    if (action === "remove") {
      item.count--;
      if(item.count < 1){

        this.deleteItem(index, item)
      }
      this.apiService.cartLength--;
    } else {
      item.count++;
      this.apiService.cartLength++;
    }
    let id = `/?_id=${this.apiService.user[0].cart.toString()}&id=${item._id}&count=${item.count}`
    this.apiService.updateAddCart(id);
  }


 navigateToorderconfirmation() {
    this.router.navigate(['/orderconfirmation']);
  }
}


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  constructor(public apiService: ApiService, private router: Router) { }

  ngOnInit() {
    const _id = localStorage.getItem('_id');
    const id = `/?_id=${this.apiService.user.cart}`;
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
    const id = `/?_id=${this.apiService.user.cart}`

    this.apiService.getCart(id).subscribe((data: any) => {
      let totalCount = 0;
      for (const item of data.cart) {
        totalCount += parseInt(item.count, 10);
      }
      this.apiService.cartLength = totalCount;
      this.apiService.cart = data.cart;

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

  deleteItem(index: number, element: any){
    let item = this.apiService.cartItems;
    if (index >= 0 && index < item.length){
      item.splice(index, 1);
      this.apiService.cartItems = [...item];
      let id = `/?_id=${this.apiService.user.cart}&id=${element._id}`
      this.apiService.updateAddCart(id);
      this.apiService.cartLength -= element.count;
    }
  }


  updateAddCart( item: any, action: string) {
    if (action === "remove") {
      item.count--;
      this.apiService.cartLength--;
    } else {
      item.count++;
      this.apiService.cartLength++;
    }
    let id = `/?_id=${this.apiService.user.cart}&id=${item._id}&count=${item.count}`
    this.apiService.updateAddCart(id);
  }


  navigateToorderconfirmation() {
    this.router.navigate(['/orderconfirmation']);
  }
}


import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {

  constructor(public apiService: ApiService, ) { }

  cartItems: { cart: string }[] = [];
  ngOnInit() {
    const _id = localStorage.getItem('_id');
    const id = `/?_id=${_id}&type=favorites`;
    if (_id != null) {
      this.apiService.getCart(id)
        .subscribe((data: any) => {
          this.cartItems = data[0].favorites;
          console.log(this.cartItems)
        }
        );
    }
  }
  

  deleteItem(index: number){
    let data = this.cartItems;
    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
    this.cartItems = [...data];
  }
}
}

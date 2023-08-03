import { Component, OnInit } from '@angular/core';
import { events } from '../interfaces';
import { ApiService } from '../serviccs/api.service';
import { from, Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],

})
export class ListmobileComponent implements OnInit {

  constructor(public api: ApiService) { }

  listmobileMock: events[] = [];
  secondsCounter = interval(1000);

   ngOnInit() {
    const id = localStorage.getItem('_id');
    if (id) {
      this.localStorage(id);
    }
    this.api.getmobile().subscribe((data) => {
      this.listmobileMock = data;
      if (this.listmobileMock.length > 0) {
        if (this.api.user.length > 0) {
          const mobileIds: string[] = this.api.user[0].favorites;
          this.listmobileMock = this.listmobileMock.map((mobile) => ({
            ...mobile,
            love: mobileIds.includes(mobile._id)
          }));
        } else {
          this.listmobileMock = this.listmobileMock.map((mobile) => ({
            ...mobile,
            love: false
          }));
        }
      }
    });
  }


  localStorage(_id: string) {
    const id = `/?_id=${_id}`;
    this.api.localStorage(id).subscribe((data: any) => {
      this.api.isLoading = false;
      this.api.loginerror = false;
      this.api.user = [data];
      this.getCart();
      this.api.Connected = true;
      this.api.getmobile().subscribe((data) => {
        this.listmobileMock = data;
        if (this.listmobileMock.length > 0) {
          const mobileIds: string[] = this.api.user[0].favorites;
          this.listmobileMock = this.listmobileMock.map((mobile) => ({
            ...mobile,
            love: mobileIds.includes(mobile._id)
          }));
        }
      }
      );
    })
  }



  getCart() {
    const id1 = `/?_id=${this.api.user[0].cart[0]}`
    this.api.getCart(id1).subscribe((data: any) => {
      let totalCount = 0;
      for (const item of data.cart) {
        totalCount += item.count;
      }
      this.api.cartLength = totalCount;
    }
    );
  }

  deleteFavorites(_id: string) {
    const id = `/?_id=${this.api.user[0]._id}&id=${_id}`;
    this.api.deleteFavorites(id);
  }


  addCart(_id: any) {
    const id = `/?_id=${this.api.user[0].cart[0]}&id=${_id}`;
    this.api.addCart(id);
  }


  addFavorites(_id: string) {
    const id = `/?_id=${this.api.user[0]._id}&id=${_id}`;
    this.api.addFavorites(id);
  }

  onScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 200;
    }
  }

}

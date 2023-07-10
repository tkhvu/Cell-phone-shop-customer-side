import { Component, OnInit } from '@angular/core';
import { events } from '../interfaces';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],

})
export class ListmobileComponent implements OnInit {

  constructor(public api: ApiService) { }

  listmobileMock: events[] = [];


   ngOnInit() {
 
    const id = localStorage.getItem('_id');
    if (id) {
       this.localStorage(id) 
    }
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
  }
  
  localStorage(_id: string){
    const id = `/?_id=${_id}`;
    this.api.localStorage(id).subscribe((data: any) => {
      this.api.isLoading = false;
      this.api.loginerror = false;
      this.api.user = [data];
      this.api.cartLength = this.api.user[0].cart.length;
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




  deleteFavorites(_id: string) {
    const id = `/?_id=${this.api.user[0]._id}&id=${_id}`;
    this.api.deleteFavorites(id);
  }


  Addcart(_id: any) {
    this.api.userid = localStorage.getItem('_id') || '';
    const id = `/?_id=${this.api.user[0]._id}&id=${_id}`;
    this.api.Cartmobile(id);
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

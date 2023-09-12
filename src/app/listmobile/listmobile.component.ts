import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { events } from '../interfaces';


@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],

})
export class ListmobileComponent {

  constructor(public api: ApiService) { }

  dataSource: any = [];

  displayedColumns: string[] = [ 'name', 'price',  'Image', 'actions'  ];

  displayFavorites: boolean = false;

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
  filter(mobile: any) {
    const filteredProducts = this.api.sourceData.filter(product => product.category === mobile._id);
    this.api.listmobileMock = filteredProducts;
  }
  showall(){
    this.api.listmobileMock = this.api.sourceData;
  }

  Favorites() {
    this.dataSource.data = this.api.listmobileMock.filter((mobile) => mobile.love === true);
      console.log(this.dataSource);
      this.displayFavorites = !this.displayFavorites;
    }

  removeRow(_id: string) {
    this.deleteFavorites(_id)
    this.dataSource.data = this.dataSource.data.filter(
      (u: events) => u._id !== _id,
    )
  }
}

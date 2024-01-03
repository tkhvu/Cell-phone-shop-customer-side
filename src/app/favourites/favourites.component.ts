import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { Ievents } from '../interfaces';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  constructor(public api: ApiService) { }

  displayedColumns: string[] = ['Image', 'name', 'price', 'actions'  ];


  removeRow(_id: string) {
    this.deleteFavorites(_id)
    this.api.dataFavorites.data = this.api.dataFavorites.data.filter(
      (u: Ievents) => u._id !== _id,
    )
  }
  deleteFavorites(_id: string) {
    const id = `/?_id=${this.api.user._id}&id=${_id}`;
    this.api.deleteFavorites(id);
  }
}
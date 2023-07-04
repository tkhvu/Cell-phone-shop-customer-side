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
    this.api.getmobile().subscribe((data) => {
      this.listmobileMock = data;
      if (this.listmobileMock.length > 0) {
        const mobileIds: string[] = this.api.User[0].favorites;
        this.listmobileMock = this.listmobileMock.map((mobile) => ({
          ...mobile,
          love: mobileIds.includes(mobile._id)
        }));
      }
    });
  }


  deleteFavorites(_id: string) {
    
    const id = `/?_id=${this.api.userid}&id=${_id}`;
    this.api.deleteFavorites(id);
  }


    onSelect(_id: string) {
      const id = `/?_id=${this.api.userid}&id=${_id}`;
      this.api.Cartmobile(id);
    }
 
  
  addFavorites(_id: string) {
    const id = `/?_id=${this.api.userid}&id=${_id}`;
    this.api.addFavorites(id);
  }

  onScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
     scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 200;
    }
  }

}

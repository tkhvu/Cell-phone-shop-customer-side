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
    this.api.getmobile()
      .subscribe((data) => {
        this.listmobileMock = data;
        if (this.listmobileMock.length>0){
          this.listmobileMock = this.listmobileMock.map(moobile => {
            const mobileIds: string[] = this.api.User[0].favorites
            return {
              ...moobile,
              love: mobileIds.join().includes(moobile._id)

            }
          })
        }

      })
  }


  deleteFavorites(_id: string) {
    
    const addid = `/?username=${this.api.username}&id=${_id}`;
    this.api.deleteFavorites(addid);
  }


    onSelect(mobile: any, username: string) {
      const mobileob = {"username": username, "id": mobile.id};
      this.api.Cartmobile(mobileob);
    }
 
  
  addFavorites(_id: string) {
    const addid = `/?username=${this.api.username}&id=${_id}`;
    this.api.addFavorites(addid);
  }

  onScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
     scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 200;
    }
  }

}

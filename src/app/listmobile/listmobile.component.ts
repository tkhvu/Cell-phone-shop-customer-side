import { Component, OnInit } from '@angular/core';
import { USER, events } from '../interfaces';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],
  
})
export class ListmobileComponent implements OnInit {

  constructor(public api: ApiService) { }

  love: USER[] = [];
  listmobileMock: events[] = [];

  ngOnInit() {
    this.api.getmobile()
      .subscribe((data) => {
        this.listmobileMock = data;
        if (this.api.a = 2) {
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


  deletefavorites(_id: string) {
    
    this.api.id = "/?username=" + this.api.username + "&id=" + _id;
    this.api.deletefavorites()
  }

  // onSelect(mobile: any,  username: string) {

  //   const mobiled{"username": username, "id": mobile.id}
  //   this.api.Cartmobile(mobiled)

    onSelect(mobile: any, username: string) {
      const mobileob = {"username": username, "id": mobile.id};
      this.api.Cartmobile(mobileob);
    }
 

  addfavorites(_id: string) {
    this.api.id = "/?username=" + this.api.username + "&id=" + _id;
    console.log(this.api.id)
    this.api.addfavorites()
  }
  


  onScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const isNearBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 200;

    }
  }

}

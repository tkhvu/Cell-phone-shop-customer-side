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
            const mobileIds: string[] = this.api.User[0].love
            return {
              ...moobile,
              love: mobileIds.join().includes(moobile._id)

            }
          })
        }

      })
  }


  deletelove(_id: string) {
    
    this.api.id = "/?Username=" + this.api.Username + "&id=" + _id;
    this.api.deletelove()
  }

  onSelect(mobile: any) {
    this.api.Cartmobile(mobile)
  }

  addid(_id: string) {
    this.api.id = "/?Username=" + this.api.Username + "&id=" + _id;
    console.log(this.api.id)
    this.api.addid()
  }
  


  onScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const isNearBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 200;
      if (isNearBottom) {
        // Load more items or perform any desired action
        console.log('Reached near bottom. Loading more items...');
      }
    }
  }

}

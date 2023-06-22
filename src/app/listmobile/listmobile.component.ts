import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { USER, events } from '../interfaces';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css']
})
export class ListmobileComponent implements OnInit {

  constructor(public api: ApiService) { }

  love: USER[] = [];
  listmobileMock: events[] = [];
  dataSource: any = [];

  a = "";
  id = 0;
  Like = 0

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
    this.dataSource.push(mobile);
    console.log(this.dataSource);
  }

  addid(_id: string) {
    this.api.id = "/?Username=" + this.api.Username + "&id=" + _id;
    console.log(this.api.id)
    this.api.addid()
  }

  @Input() listmobileview?: boolean;

}

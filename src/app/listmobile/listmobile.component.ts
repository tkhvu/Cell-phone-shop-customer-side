import { Component, Input, OnInit } from '@angular/core';
import { events } from '../interfaces';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css']
})
export class ListmobileComponent implements OnInit {
  constructor(private api: ApiService) { }

  items: any = []; 
  listmobileMock: events[] = [];
  dataSource: any = []; 

  ngOnInit(){
    this.api.getmobile()
    .subscribe((data) => {
      this.listmobileMock = data;
    })
  }


 a = "";
 b = "dffdf2222E";

  userMatch(){
    this.api.t = "/?category=" + this.a + "&password=" + this.b;
    this.api.userMatch()
    .subscribe((data) => {
      console.log(data)
    })
  }

  onSelect(mobile: any ) {
    this.api.Cartmobile(mobile)
    this.dataSource.push(mobile);
    
    console.log(this.dataSource);
  }

  @Input() listmobileview?: boolean;
}

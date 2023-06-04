import { Component, OnInit } from '@angular/core';
import { events } from '../interfaces';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-wagon',
  templateUrl: './wagon.component.html',
  styleUrls: ['./wagon.component.css'],
})
export class WagonComponent implements OnInit{
  constructor(public api: ApiService) { }

  ELEMENT_DATA: events[] = [];

  ngOnInit(){
    this.api.getshps()
    .subscribe((data) => {
      this.ELEMENT_DATA = data;
      console.log("ELEMENT_DATA==", this.ELEMENT_DATA)
    })
  }

  displayedColumns: string[] = [ 'name', 'price'];
  // dataSource = this.ELEMENT_DATA;
  

}

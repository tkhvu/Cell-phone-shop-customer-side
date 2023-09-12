import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-displayusers',
  templateUrl: './displayusers.component.html',
  styleUrls: ['./displayusers.component.css']
})
export class DisplayusersComponent {
  constructor(private api: ApiService,) { }
  usersData: any = [];
  displayedColumnsusers: string[] = ['email', 'lastname', 'firstname'];

  ngOnInit() {
    this.api.getUsers().subscribe((data) => {
      this.usersData.data = data
    })
  }
}

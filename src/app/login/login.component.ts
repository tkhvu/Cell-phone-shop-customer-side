import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public api: ApiService, private router: Router,) { }
  model = new USER1('', '');
  hide = true;

  username = this.model.username;
  password = this.model.password;
  c = true
  v: any
  onSubmit(heroForm: any) {
    this.c = !this.c;
    this.username = heroForm.value.username;
    this.password = heroForm.value.password;
    console.log(this.username, this.password)
    this.userMatch()
  }

  userMatch() {
    this.api.t = "/?username=" + this.username + "&password=" + this.password;
    this.api.userMatch()
      .subscribe((data: any) => {
        this.connect(data[0].firstname)
        this.api.Connected = data[0].firstname + " " + data[0].lastname;
        this.api.username = data[0].firstname;
        this.api.User = data;
      })
  }

  connect(v: string = "") {
    if (v.length > 0) {
      this.api.a = 2,
      this.api.navigateToshop()
    };
    console.log(this.api.a)
  }



}

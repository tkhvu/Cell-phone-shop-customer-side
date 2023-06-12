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

  a = this.model.Username;
  b = this.model.password;
  c = true
  v: any
  onSubmit(heroForm: any) {
    this.c = !this.c;
    this.a = heroForm.value.Username;
    this.b = heroForm.value.password;
    console.log(this.a, this.b)
    this.userMatch()
  }

  userMatch() {
    this.api.t = "/?category=" + this.a + "&password=" + this.b;
    this.connect(this.v)
    this.api.userMatch()
      .subscribe((data: any) => {
        // if(data = null){this.api.a = 2}
        // console.log("api a==", this.api.a)
        console.log(data[0].first)
        this.connect(data[0].first)
        this.api.Connected = data[0].first + " " + data[0].Family;
      })
  }

  connect(v: string = "") {
    if (v.length > 0) {
      this.api.a = 2,
      this.navigateToAbout()
    };
    console.log(this.api.a)
  }

  goBack() {
    
  }
  navigateToAbout() {
    this.api.navigateToAbout()
  }
}

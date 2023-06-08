import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';
import { json } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api: ApiService){}
  model = new USER1( '', '');

  a = this.model.Username;
  b = this.model.password;

  onSubmit(heroForm:any) {
    this.a = heroForm.value.Username;
    this.b = heroForm.value.password;
    console.log(this.a, this.b)
    this.userMatch()
  }

  userMatch(){
    this.api.t = "/?category=" + this.a + "&password=" + this.b;
    this.api.userMatch()
    .subscribe((data:any) => {
      console.log(data[0].Username)
      this.api.Connected = data[0].Username;
    })
  }
}

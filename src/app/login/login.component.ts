import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public api: ApiService) { }
  model = new USER1('', '');
  hide = true;

  username = this.model.username;
  password = this.model.password;
  v: string = "";

  onSubmit(connection: any) {
    this.username = connection.value.username;
    this.password = connection.value.password;
    this.userMatch()
  }

  userMatch() {
    this.api.isLoading = true;
    const t = `/?username=${this.username}&password=${this.password}`;
    this.api.userMatch(t)
      .subscribe((data: any) => {
        this.api.isLoading = false;
        this.api.Connected = `${data[0].firstname} ${data[0].lastname}`;
        this.api.username = data[0].username;
        this.api.User = data;
        if(data[0].firstname.length>1)
        this.api.navigateToshop()
      })
  }

}

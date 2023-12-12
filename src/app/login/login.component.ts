import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public api: ApiService) { }

  username = '';
  password = '';
  onSubmit(connection: any) {
    if (connection.form.valid) {
      this.userMatch()
    }
  }

  userMatch() {
    this.api.isLoading = true;
    this.api.logindetails = { username: this.username, password: this.password };
    this.api.userMatch(this.api.logindetails)
  }

}

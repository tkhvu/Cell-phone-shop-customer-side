import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public api: ApiService, private router: Router) { }

  logindetails = {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.userMatch()
    }
  }

  userMatch() {
    this.api.isLoading = true;
    this.logindetails = this.loginForm.value;
    this.api.userMatch(this.loginForm.value)
  }

  enrollment(){

    this.router.navigate(['/Createaccount']);

  }



}

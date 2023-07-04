import { Component } from '@angular/core';
import {  Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent {

  hide = true;
  passwordIsValid = false;
  bioSection: FormGroup;
  model: USER1 = new USER1('', '', '', '', '');

  constructor(public api: ApiService, private fb: FormBuilder) {
    this.bioSection = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$"), Validators.required]],
      password: ['', [Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'), Validators.required]]
    });
  }

  passwordValid(event: any) {
    this.passwordIsValid = event;
  }

  onSelect (name: any) {
    this.api.isLoading = true;
    this.api.user(name);
    this.api.isLoading = false;
  }

  callingFunction() {
    if (this.bioSection.valid) {
      this.onSelect(this.bioSection.value);
      this.api.Connected = this.bioSection.value.firstname;
      this.api.User = this.bioSection.value;
      this.navigateToAbout();
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.bioSection.get(controlName);
    if (control?.hasError('required')) {
      return 'עליך להזין ערך';
    }
    if (control?.hasError('email')) {
      return 'אימייל לא חוקי';
    }
    if (control?.hasError('pattern')) {
      return controlName === 'password' ? 'מינימום 8 תווים וחובה אותיות גדולות וקטנות באנגלית ומספרים' : 'שם משתמש לא תקין';
    }
    return '';
  }

  navigateToAbout() {
    this.api.navigateToshop();
  }
}

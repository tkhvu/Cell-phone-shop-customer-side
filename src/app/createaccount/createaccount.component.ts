import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent {

  constructor(public api: ApiService, private fb: FormBuilder) { }

  hide = true;
  passwordIsValid = false;
  passwordValid(event: any) {
    this.passwordIsValid = event;
  }


  bioSection = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(null, [Validators.required, Validators.email,]),
    username: new FormControl(null, [
      Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$"),
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),
      Validators.required
    ]
    ),
  });

  onSelect(name: any) {
    this.api.isLoading = true;
    this.api.user(name);
    this.api.isLoading = false;
  }



  model = new USER1('', '', '', '', '',);

  callingFunction() {
    console.log(this.bioSection.value);
    this.onSelect(this.bioSection.value)
    this.api.Connected = this.bioSection.value.firstname;
    this.api.User = this.bioSection.value;
    this.navigateToAbout()
  }

  getErrorMessage() {
    return this.bioSection.controls['email'].hasError('required') ? 'עליך להזין ערך' :
      this.bioSection.controls['email'].hasError('email') ? 'אימייל לא חוקי' :
        '';
  }

  getErrorMessageUsername() {
    return this.bioSection.controls['username'].hasError('required') ? 'עליך להזין ערך' :
      this.bioSection.controls['username'].hasError('pattern') ? 'Not a valid Username' :
        '';
  }

  getErrorMessagepassword() {

    return this.bioSection.controls['password'].hasError('required') ? 'עליך להזין ערך' :
      this.bioSection.controls['password'].hasError('pattern') ? 'מינימום 8 תווים וחובה אותיות גדולות וקטנות באנגלית ומספרים' :
        '';
  }

  navigateToAbout() {
    this.api.navigateToshop()
  }

}

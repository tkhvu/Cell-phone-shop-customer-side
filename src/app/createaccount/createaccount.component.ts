import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER } from '../modeluser';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent {

  passwordIsValid = false;
  bioSection: FormGroup;
  model: USER = new USER('', '', '', '', '');

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

  onSelect(name: any) {
    this.api.addUser(name) }

  callingFunction() {
    if (this.bioSection.valid) {
      this.onSelect(this.bioSection.value);
      const query = `/?username=${this.bioSection.value.username}&password=${this.bioSection.value.password}`;
      this.api.userMatch(query)
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

      if (controlName === 'password') {
        return 'מינימום 8 תווים וחובה אותיות גדולות וקטנות באנגלית ומספרים';
      } else {

        return "שם משתמש לא תקין"
      }
    }
    return '';
  }

  navigateToshop() {
    this.api.navigateToshop();
  }
}

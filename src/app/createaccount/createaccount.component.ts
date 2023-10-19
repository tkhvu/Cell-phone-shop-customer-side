import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER } from '../modeluser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent {
  

  passwordIsValid = false;
  bioSection: FormGroup;
  model: USER = new USER('', '', '', '', '');
  usersData: any = [];
  username = "33331www";

  constructor(public api: ApiService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.bioSection = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.pattern("^[0-9a-zA-Z]{5,29}$"), Validators.required]],
      password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$'), Validators.required]]
    });
  }

  ngOnInit() {
    this.api.getUsers().subscribe((data) => {
      this.usersData = data
    })
  }

  passwordValid(event: any) {
    this.passwordIsValid = event;
  }

  onSelect(name: any) {
    this.api.addUser(name)
   }

  callingFunction() {
    if (this.bioSection.valid) {
      this.api.query = `/?username=${this.bioSection.value.username}`;
      this.api.UsernameCheck(this.api.query)
      .subscribe((data: any) => {
        this.api.query = `/?username=${this.bioSection.value.username}&password=${this.bioSection.value.password}`;
       if(data.available){
        this.onSelect(this.bioSection.value);
      } else {
        this.showErrorMessage('שם משתמש תפוס');
      }
    })
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
        return 'מינימום 8 תווים וחובה אותיות באנגלית ומספרים';
      } else {
        return "שם משתמש לא תקין"
      }
    }
    return '';
  }

  UsernameCheck() {
    this.api.query = `/?username=${this.bioSection.value.username}`;
    this.api.UsernameCheck(this.api.query).subscribe((data: any) => {
      // this.api.query = `/?username=${this.bioSection.value.username}&password=${this.bioSection.value.password}`;
     if(data.available){
    //   this.onSelect(this.bioSection.value);
    // } else {
      this.showErrorMessage('שם משתמש תפוס');
    }
  })
  }


  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      panelClass: ['error-snackbar'], // Add your custom CSS class for styling
    });
  }

  navigateToshop() {
    this.api.navigateToshop();
  }
}

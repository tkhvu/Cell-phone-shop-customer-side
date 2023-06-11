import { Component } from '@angular/core';
import { FormControl, NgForm, Validators,  AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent {
  
  constructor(private api: ApiService, private fb: FormBuilder) { }

  hide = true;
  passwordIsValid = false;

  passwordValid(event: any) {
    this.passwordIsValid = event;
  }


  bioSection = new FormGroup({
    first: new FormControl(''),
    Family: new FormControl(''),
    email: new FormControl(null, [Validators.required, Validators.email, ]),
    Username: new FormControl(null, [
      Validators.pattern('^[a-zA-Z0-9]+$'),
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),
      Validators.required
    ]
    ),
  });

  async onSelect(name: any ) {

    await this.api.user(name)
    
  }



model = new USER1( '', '','', '','',);

  callingFunction() {
    console.log(this.bioSection.value);
    this.onSelect(this.bioSection.value)
    this.api.Connected = this.bioSection.value.first
    this.navigateToAbout()
   }

  getErrorMessage() {
    return this.bioSection.controls['email'].hasError('required') ? 'You must enter a value' :
    this.bioSection.controls['email'].hasError('email') ? 'Not a valid email' :
            '';
  }

   getErrorMessageUsername() {
    return this.bioSection.controls['Username'].hasError('required') ? 'You must enter a value' :
    this.bioSection.controls['Username'].hasError('pattern') ? 'Not a valid Username' :
            '';
  }

  getErrorMessagepassword() {
    return this.bioSection.controls['password'].hasError('required') ? 'You must enter a value' :
    this.bioSection.controls['password'].hasError('pattern') ? 'מינימום 8 תווים וחובה אותיות גדולות וקטנות באנגלית ומספרים' :
            '';
  }

  navigateToAbout(){
    this.api.navigateToAbout() 
   }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { USER1 } from '../hero';


@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent implements OnInit{

  passwordIsValid = false;
  hide = true;


  model = new USER1( '', '','', '','',);
 
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
constructor(private fb: FormBuilder) { }
ngOnInit() {
  }
  callingFunction() {
    console.log(this.bioSection.value);
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
  passwordValid(event: any) {
    this.passwordIsValid = event;
  }
}




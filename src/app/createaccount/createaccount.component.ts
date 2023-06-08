import { Component } from '@angular/core';
import { FormControl, NgForm, Validators,  AbstractControl, FormBuilder,
  FormGroup } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { USER1 } from '../hero';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent {
  
  constructor(private api: ApiService, private fb: FormBuilder) { }
  passwordIsValid = false;

  passwordValid(event: any) {
    this.passwordIsValid = event;
  }






  onSubmit(f: NgForm) {
    console.log(f.value)
    this.onSelect(f.value)
  }
  dataSource: any = [{}]; 


  hide = true;

  async onSelect(name: any ) {

    await this.api.user(name)
    
    this.dataSource.push(name);
    
    console.log(this.dataSource);
  }



model = new USER1( '', '','', '','',);

submitted = false;

onSubmit1() { 
  this.submitted = true;
  this.onSelect(this.model)
  console.log(this.model) }

}

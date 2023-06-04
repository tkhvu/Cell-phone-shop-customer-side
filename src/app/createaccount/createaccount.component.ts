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

  form?: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
       
        
      },
      
    );
  }


  // email = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(10),
  // ]);
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'Not a valid email';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  onSubmit(f: NgForm) {
    console.log(f.value)
    this.onSelect(f.value)
  }
  dataSource: any = [{}]; 


  hide = true;

  async onSelect(name: any ) {
    //showSpinner = true
    await this.api.user(name)
    //showSpinner = false
    //
    this.dataSource.push(name);
    
    console.log(this.dataSource);
  }



model = new USER1( '', '','', '','',);

submitted = false;

onSubmit1() { this.submitted = true;
  this.onSelect(this.model)
  console.log(this.model) }
newHero() {
  this.model = new USER1( '', '','', '','',);
}




}

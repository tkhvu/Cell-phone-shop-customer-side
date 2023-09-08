import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.css']
})
export class CategorieDeleteComponent {
  myForm: FormGroup 
  constructor(private fb: FormBuilder, private api: ApiService) { 
    this.myForm = this.fb.group({
      category: [''] // Define your form control here
    });
  }

  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.categories = data
    });
  }
  categories: any = [];

  categorieDelete(){

    console.log()
  }

}

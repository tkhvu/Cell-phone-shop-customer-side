import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';

@Component({
  selector: 'app-adding-category',
  templateUrl: './adding-category.component.html',
  styleUrls: ['./adding-category.component.css']
})
export class AddingCategoryComponent {

  constructor( private api: ApiService) {}

  category = ""
  
  addCategory(){
    const category = {
      category: this.category
    }
    this.api.addCategory(category)
  }
}

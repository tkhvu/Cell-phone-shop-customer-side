import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';

const USER_DATA = [
  {"name": "John Smith", "occupation": "Advisor", "age": 36},
  {"name": "Muhi Masri", "occupation": "Developer", "age": 28},
  {"name": "Peter Adams", "occupation": "HR", "age": 20},
  {"name": "Lora Bay", "occupation": "Marketing", "age": 43}
];

const COLUMNS_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "Full Name"
  },
  {
      key: "occupation",
      type: "text",
      label: "Occupation"
  },
  {
      key: "age",
      type: "number",
      label: "Age"
  },
  {
      key: "isEdit",
      type: "isEdit",
      label: ""
  }
]
@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.css']
})
export class CategorieDeleteComponent {
  constructor(private api: ApiService) { 
  
  }

  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.categories = data
    });
  }

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
  categories: any = [];
  category: string = "";

  

  categorieDelete(_id: string){
    const id = `/?_id=${_id}`;
    this.api.deleteCategory(id)
    console.log(id)
  }
}

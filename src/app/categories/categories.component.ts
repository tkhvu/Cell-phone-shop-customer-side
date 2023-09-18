import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(private api: ApiService) {}
  displayedColumns: string[] = [  'category', 'actions' ];

  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.data = this.dataSource.data.map((Category) => ({
        ...Category,
        isEdit: false
      }
      ));
    });
  }

  dataSource = new MatTableDataSource<any>();
  
  categorieDelete(_id: string){
    const id = `/?_id=${_id}`;
    this.api.deleteCategory(id)
    this.dataSource.data = this.dataSource.data.filter(
      (u: any) => u._id !== _id,
    )}

    CategoryUpdate(element: Category){

      let id = `/?_id=${element._id}&category=${element.category}`

      this.api.categoryUpdate(id)
      console.log(id)
    }

    addRow() {
      const newRow: Category = {
        category: '',
        isEdit: true,
      }
      this.dataSource.data = [newRow, ...this.dataSource.data]
    }
    
}

import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { MatTableDataSource } from '@angular/material/table';

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
    condition = "A"

    CategoryUpdate(element: {}){

      console.log(element)
    }
}

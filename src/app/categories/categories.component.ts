import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Icategory } from '../interfaces';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {
  constructor(private api: ApiService) {}
  displayedColumns: string[] = [ 'category', 'actions' ];

  ngOnInit() {
    this.getCategory()
  }

  dataSource = new MatTableDataSource<Icategory>();
  
  categorieDelete(_id: string){
    const id = `/?_id=${_id}`;
    this.api.deleteCategory(id);
    this.dataSource.data = this.dataSource.data.filter(
      (product: Icategory) => product._id !== _id,
    )}


    async CategoryUpdate(element: Icategory): Promise<void> {
      let id = `/?_id=${element._id}&category=${element.category}`;
      await lastValueFrom(this.api.categoryUpdate(id)); 
    
      if (!element._id) {
        this.getCategory();
      }
    }

    addRow() {
      const newRow: Icategory = {
        category: '',
        isEdit: true,
      }
      this.dataSource.data = [newRow, ...this.dataSource.data]
    } 
    getCategory(){
      this.api.getCategory().subscribe((data) => {
        this.dataSource.data = data.map((Category) => ({
          ...Category,
          isEdit: false
        }));
      });
    }
    
}

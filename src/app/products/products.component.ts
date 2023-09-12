import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { events } from '../interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private api: ApiService) {}
  displayedColumns: string[] = [ 'name', 'price',  'Image', 'actions' ];

  ngOnInit() {
    this.api.getmobile().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.data = this.dataSource.data.map((mobile) => ({
        ...mobile,
        isEdit: false
      }
      ));
    });
  }

  dataSource = new MatTableDataSource<events>();
  removeRow(_id: string) {
    this.deleteProduct(_id)
    this.dataSource.data = this.dataSource.data.filter(
      (u: events) => u._id !== _id,
    )
  }

  deleteProduct(_id: string){
    const id = `/?_id=${_id}`;
    this.api.deleteProduct(id)
  }

  CategoryUpdate(element: {}){

    console.log(element)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  selectedFile: File | undefined;

}

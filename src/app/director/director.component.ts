import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import {MatTableDataSource } from '@angular/material/table';
import { events } from '../interfaces';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { AddingProductDialogComponent } from '../adding-product-dialog/adding-product-dialog.component';
// import { AddingCategoryComponent } from '../adding-category/adding-category.component';
// import { CategorieDeleteComponent } from '../categorie-delete/categorie-delete.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit{

  constructor(private fb: FormBuilder, public api: ApiService, private router: Router) {
    this.bioSection = this.fb.group({
      price: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      name: ['', Validators.required],
      src: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.bioSection1 = this.fb.group({
      category: ['', Validators.required],
    });
  }

  displayedColumns: string[] = [ 'name', 'price',  'Image', 'actions'  ];
  displayedColumnsusers: string[] = [ 'email',  'lastname', 'firstname' ];

  dataSource = new MatTableDataSource<events>();
  usersData: any = [];
  categories: any = [];
  bioSection: FormGroup;
  bioSection1: FormGroup;
  selectedFile: File | undefined;
  displayuser: boolean = false


  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.categories = data
    });

    this.api.getmobile().subscribe((data) => {
      this.dataSource.data = data
    });
  }


  OrderConfirmation() {
    this.uploadProduct()
  }



  uploadProduct() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.bioSection.value.name);
      formData.append('price', this.bioSection.value.price);
      formData.append('category', this.bioSection.value.category);

      formData.append('image', this.selectedFile);

      this.api.uploadProduct( formData);
    }
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addCategory(){
    this.api.addCategory(this.bioSection1.value)
  }
 

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

  BackMain(){
  this.router.navigate(['/Listmobile']);
}
}

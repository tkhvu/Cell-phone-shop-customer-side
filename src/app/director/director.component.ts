import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import {MatTableDataSource } from '@angular/material/table';
import { events } from '../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddingProductDialogComponent } from '../adding-product-dialog/adding-product-dialog.component';
import { AddingCategoryComponent } from '../adding-category/adding-category.component';
import { CategorieDeleteComponent } from '../categorie-delete/categorie-delete.component';



@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit{

  constructor(private fb: FormBuilder, public api: ApiService, public dialog: MatDialog) {
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

  displayedColumns: string[] = [ 'name', 'price', 'Image', 'actions' ];
  dataSource = new MatTableDataSource<events>();
  categories: any = [];
  bioSection: FormGroup;
  bioSection1: FormGroup;
  selectedFile: File | undefined;


  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.categories = data
    });

    this.api.getmobile().subscribe((data) => {
      this.dataSource.data = data
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.restoreFocus = false;
    dialogConfig.position = {
      top: '65px',
    };

    const dialogRef = this.dialog.open(AddingProductDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  openDialog1() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.restoreFocus = false;
    dialogConfig.position = {
      top: '65px',
    };

    const dialogRef = this.dialog.open(AddingCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  openDialog2() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.restoreFocus = false;
    dialogConfig.position = {
      top: '65px',
    };

    const dialogRef = this.dialog.open(CategorieDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
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
 

  removeRow(_id: number) {
  
    this.dataSource.data = this.dataSource.data.filter(
      (u: events) => u._id !== _id,
    )
    console.log(this.dataSource)

  }
}

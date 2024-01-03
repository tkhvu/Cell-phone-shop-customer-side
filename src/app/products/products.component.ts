import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Ievents } from '../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddingProductDialogComponent } from '../adding-product-dialog/adding-product-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private api: ApiService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['name', 'price', 'Image', 'actions'];
  dataSource = new MatTableDataSource<Ievents>();
  
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


  AddingProductDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.restoreFocus = false;
    dialogConfig.position = {
      top: '65px',
    };

    const dialogRef = this.dialog.open(AddingProductDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  addRow() {
    const newRow: Ievents = {
      name: '',
      price: 0,
      isEdit: true,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(_id: string) {
    this.openDialog(_id);

  }

  deleteProduct(_id: string) {
    const id = `/?_id=${_id}`;
    this.api.deleteProduct(id)
  }

  ProductUpdate(element: Ievents) {
    let id = `/?_id=${element._id}&name=${element.name}&price=${element.price}`
    this.api.ProductUpdate(id)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  selectedFile: File | undefined;

  openDialog(_id: string) {
    const data = "מאשר להסיר מוצר";
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(_id)
        this.dataSource.data = this.dataSource.data.filter(
          (u: Ievents) => u._id !== _id,
        )
      }
    })
  }
}
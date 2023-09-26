import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './serviccs/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { events } from './interfaces';

export const UserColumns = [
  {
    key: 'name',
    type: 'text',
    label: 'name',
  },
  {
    key: 'price',
    type: 'text',
    label: 'price',
  },

  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
 
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public api: ApiService, public dialog: MatDialog, private router: Router, private http: HttpClient) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.restoreFocus = false;
    dialogConfig.position = {
      top: '65px',
      left: '15px'
    };

    const dialogRef = this.dialog.open(CartDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<events>();


  cartItems: { cart: string }[] = [];
  cart = false;
  director = false;
  ngOnInit() {

    const id = localStorage.getItem('_id');
    if (id) {
      this.localStorage(id);
    }
    this.api.getmobile().subscribe((data) => {
      this.api.listmobileMock = data;
      if (this.api.listmobileMock.length > 0) {
        if (this.api.user.length > 0) {
          const mobileIds: string[] = this.api.user[0].favorites;
          this.api.listmobileMock = this.api.listmobileMock.map((mobile) => ({
            ...mobile,
            love: mobileIds.includes(mobile._id)
          }));
        } else {
          this.api.listmobileMock = this.api.listmobileMock.map((mobile) => ({
            ...mobile,
            love: false
          }
          ));
        }
      }
    });
  }


  localStorage(_id: string) {
    const id = `/?_id=${_id}`;
    this.api.localStorage(id).subscribe((data: any) => {
      this.api.isLoading = false;
      this.api.loginerror = false;
      this.api.user = [data];
      this.api.getCategory().subscribe((data) => {
        this.api.Category = data
      })
      this.getCart();
      this.api.Connected = true;
      this.api.getmobile().subscribe((data) => {
        this.api.listmobileMock = data;
        this.dataSource.data = [...data];
        if (this.api.listmobileMock.length > 0) {
          const mobileIds: string[] = this.api.user[0].favorites;
          this.api.listmobileMock = this.api.listmobileMock.map((mobile) => ({
            ...mobile,
            love: mobileIds.includes(mobile._id)
          }));
        }
        this.api.sourceData = [...this.api.listmobileMock];
      }
      );
    })
  }

  getCart() {
    const id = `/?_id=${this.api.user[0].cart[0]}`
    this.api.getCart(id).subscribe((data: any) => {
      let totalCount = 0;
      for (const item of data.cart) {
        totalCount += parseInt(item.count, 10);
      }
      this.api.cartLength = totalCount;
      this.api.cart = data;
    }
    );
  }

  Login(){
    this.router.navigate(['/Login']);
    this.api.login = !this.api.login;  }

    Definitions(){
      this.router.navigate(['/Director']);
      }

      element1(col: any){

        console.log(col)
      }
      
      addRow() {
        const newRow: events = {
          id: 0,
          name: '',
          price: 0,
          category: '',
          isEdit: true,
        };
        this.dataSource.data = [newRow, ...this.dataSource.data];
      }
      editRow(row:events ) {
        console.log(row)

      }

      removeRow(_id: number) {
      
        this.dataSource.data = this.dataSource.data.filter(
          (u: events) => u._id !== _id,
        )
      }

      BackMain(){
        this.router.navigate(['/Listmobile']);
      }
}

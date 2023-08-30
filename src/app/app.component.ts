import { Component, OnInit } from '@angular/core';
import { ApiService } from './serviccs/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public apiService: ApiService, public dialog: MatDialog, private router: Router, private http: HttpClient) { }

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


  cartItems: { cart: string }[] = [];
  cart = false;

  ngOnInit() {
    const _id = localStorage.getItem('_id');
    if (_id === null) {
      this.apiService.LogOut();
    }
  }

  Login(){
    this.router.navigate(['/Login']);
    this.apiService.login = !this.apiService.login;  }

    Login1(){
      this.router.navigate(['/Director']);
      }
}

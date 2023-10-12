import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { events } from '../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';


@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],

})
export class ListmobileComponent {

  constructor(public api: ApiService, public dialog: MatDialog) { }
  activeButton: any;
  dataSource: any = [];

  displayedColumns: string[] = ['Image', 'name', 'price', 'actions'  ];


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

  deleteFavorites(_id: string) {
    const id = `/?_id=${this.api.user[0]._id}&id=${_id}`;
    this.api.deleteFavorites(id);
  }


  addCart(_id: any) {
    const id = `/?_id=${this.api.user[0].cart[0]}&id=${_id}`;
    this.api.addCart(id);
  }


  addFavorites(_id: string) {
    const id = `/?_id=${this.api.user[0]._id}&id=${_id}`;
    this.api.addFavorites(id);
  }

  filter(mobile: any) {
    if(this.api.sourceData.length<1){
      this.api.sourceData = this.api.listmobileMock
      // console.log(this.api.listmobileMock, "hhh")
    }
    const filteredProducts = this.api.sourceData.filter(product => product.category === mobile._id);
    this.api.listmobileMock = filteredProducts;
  }
  showall(){
    this.api.listmobileMock = this.api.sourceData;
  }

  // Favorites() {
  //   this.dataSource.data = this.api.listmobileMock.filter((mobile) => mobile.love === true);
  //     this.api.displayFavorites = !this.api.displayFavorites;
  //   }

  removeRow(_id: string) {
    this.deleteFavorites(_id)
    this.api.dataFavorites.data = this.api.dataFavorites.data.filter(
      (u: events) => u._id !== _id,
    )
  }
}

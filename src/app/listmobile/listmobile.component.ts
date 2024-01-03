import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { Ievents } from '../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],

})
export class ListmobileComponent {

  constructor(public api: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  activeButton: any;
  dataSource: any = [];

  displayedColumns: string[] = ['Image', 'name', 'price', 'actions'];


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
    const id = `/?_id=${this.api.user._id}&id=${_id}`;
    this.api.deleteFavorites(id);

  }


  addCart(_id: any) {
    if (this.api.Connected) {
      const id = `/?_id=${this.api.user.cart}&id=${_id}`;
      this.api.addCart(id);
    } else {
      this.showErrorMessage('על מנת לשמור את המוצר בסל שלך, יש להתחבר');
    }

  }


  addFavorites(_id: string) {
    if (this.api.Connected) {
      const id = `/?_id=${this.api.user._id}&id=${_id}`;
      this.api.addFavorites(id);
    } else {
      this.showErrorMessage('על מנת לשמור את המוצר ברשימת המועדפים שלך, יש להתחבר');
    }
  }

  filter(mobile: any) {
    if (this.api.sourceData.length < 1) {
      this.api.sourceData = this.api.listmobileMock
    }
    const filteredProducts = this.api.sourceData.filter(product => product.category === mobile._id);
    this.api.listmobileMock = filteredProducts;
  }
  showall() {
    this.api.listmobileMock = this.api.sourceData;
  }



  removeRow(_id: string) {
    this.deleteFavorites(_id)
    this.api.dataFavorites.data = this.api.dataFavorites.data.filter(
      (u: Ievents) => u._id !== _id,
    )
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}

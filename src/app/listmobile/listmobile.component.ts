import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { Ievents } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listmobile',
  templateUrl: './listmobile.component.html',
  styleUrls: ['./listmobile.component.css'],

})
export class ListmobileComponent {

  constructor(public api: ApiService, private snackBar: MatSnackBar) { }
  activeButton: any;
  dataSource: any = [];

  displayedColumns: string[] = ['Image', 'name', 'price', 'actions'];


  deleteFavorites(_id: string) {
    const id = `/?_id=${this.api.user._id}&id=${_id}`;
    this.api.deleteFavorites(id);

  }

  addFavorites(_id: string) {
    if (this.api.Connected) {
      const id = `/?_id=${this.api.user._id}&id=${_id}`;
      this.api.addFavorites(id);
    } else {
      this.showErrorMessage('על מנת לשמור את המוצר ברשימת המועדפים שלך, יש להתחבר');
    }
  }


  addCart(_id: any) {
    if (this.api.Connected) {
      const id = `/?_id=${this.api.user.cart}&id=${_id}`;
      this.api.addCart(id);
    } else {
      this.showErrorMessage('על מנת לשמור את המוצר בסל שלך, יש להתחבר');
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

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}

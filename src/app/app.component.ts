import { Component, OnInit } from '@angular/core';
import { ApiService } from './serviccs/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(public api: ApiService, public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) { }
  

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

  ngOnInit() {

    const id = localStorage.getItem('_id');
    if (id) {
      this.localStorage(id);
    }
    this.api.getCategory().subscribe((data) => {
      this.api.Category = data
    })
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
      console.log(data.Director);
      this.api.director = data.Director
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

  Login() {
    this.router.navigate(['/Login']);
    this.api.login = !this.api.login;
  }

  Definitions() {
    this.router.navigate(['/Director']);
  }

  BackMain() {
    this.router.navigate(['/Listmobile']);
  }


  // async getmobile(): Promise<any> {
  //   const data = await this.api.getmobile().pipe(take(1)).toPromise();
  //   this.data = this.modifyMyData(data);
  // }

  // async function getData(this: any) {
  //   try {
  //     const data = await this.api.getmobile();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

}

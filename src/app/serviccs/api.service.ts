import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { events, USER } from '../interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  Connected: boolean = false;
  user: any = [];
  isLoading: boolean = false;
  cartLength: number = 0;
  error = "";
  loginerror: boolean = false;


  public getshps(): Observable<events[]> {
    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getshps";
    return this.http.get<events[]>(url,);
  }


  public getmobile() {

    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getMobile";
    return this.http.get<events[]>(url)

  }


  public localStorage(id: string) {

    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/localStorage" + id;
    return this.http.get<USER>(url)
  }

  public getCart(id: string) {

    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getCart" + id;
    console.log(url)
    return this.http.get<USER>(url)
  }




  public Cartmobile(addid: string) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/cartMobile" + addid;
    this.cartLength++;
    return this.http.get<events[]>(url)
      .subscribe();
  }

  public addUser(user: USER[]) {
    this.isLoading = true;
    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/CreatingUser";
    return this.http.post<USER[]>(url, user).subscribe(() => { this.isLoading = false });;
  }


  public userMatch(query: string) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/userMatch" + query;
    return this.http.get<USER>(url)
      .subscribe((data: any) => {
        this.isLoading = false;
        if (data.length === 0) {
          this.loginerror = true;
          this.error = 'שם המשתמש או הסיסמה אינם נכונים.';
          return;
        }
        this.loginerror = false;
        this.user = data;
        localStorage.setItem('_id', this.user[0]._id);
        this.cartLength = this.user[0].cart.length;
        this.navigateToshop()
        this.Connected = true;
      })

  }

  addFavorites(addid: string) {


    const url: string = " https://us-central1-fine-command-384813.cloudfunctions.net/favorites" + addid;
    this.http.get(url)
      .subscribe()
  }

  public getUsers() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getUsers";
    return this.http.get<USER[]>(url)

  }

  public deleteFavorites(addid: string) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/deleteFavorites" + addid;
    return this.http.get<USER[]>(url)
      .subscribe()
  }


  public navigateToshop() {
    this.router.navigate(['/Listmobile']);
  }


  LogOut() {
    this.Connected = false
    this.router.navigate(['/Login']);
    localStorage.removeItem('_id');
    this.user = [];
    this.cartLength = 0;

  }

}





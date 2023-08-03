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
  query = ""


  public getmobile() {

    const url: string = "http://localhost:3000/getMobile";
    return this.http.get<events[]>(url)

  }

  public localStorage(id: string): Observable<USER> {
   
    const url: string = "http://localhost:3000/localStorage" + id;
    return this.http.get<USER>(url)
  }

  public MobileDetails(id: string) {

    const url: string = "http://localhost:3000/MobileDetails" + id;
    return this.http.get<USER>(url)
  }


  public getCart(id: string)  {

    const url: string = "http://localhost:3000/getCart" + id;
    return this.http.get<USER>(url)
  }
  




  public addCart(addid: string) {


    const url: string = "http://localhost:3000/addCart" + addid;
    console.log(url)
    this.cartLength++;
    return this.http.get<events[]>(url)
      .subscribe();
  }

  public async addUser(user: USER[]) {
    this.isLoading = true;
    const url: string = "http://localhost:3000/CreatingUser";
    return this.http.post<USER[]>(url, user).subscribe((data) => {
      this.isLoading = false;
      const dataString = JSON.stringify(data);
      const parsedData = JSON.parse(dataString);
      const insertedId = parsedData.insertedId;
      localStorage.setItem('_id', insertedId);
      this.userMatch(this.query)
    });;
  }


  public userMatch(query: string) {


    const url: string = "http://localhost:3000/userMatch" + query;
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


    const url: string = " http://localhost:3000/addFavorites" + addid;
    this.http.get(url)
      .subscribe()
  }

  public getUsers() {


    const url: string = "http://localhost:3000/getUsers";
    return this.http.get<USER[]>(url)

  }

  public deleteFavorites(addid: string) {


    const url: string = "http://localhost:3000/deleteFavorites" + addid;
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

  deleteFromcart(addid: string) {

    const url: string = "http://localhost:3000/deleteFromcart" + addid;
    console.log(url)
    return this.http.get<USER[]>(url)
      .subscribe()

  }

}





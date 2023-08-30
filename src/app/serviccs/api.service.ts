import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, events, USER, combinedData } from '../interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  Connected: boolean = false;
  login: boolean = false;
  user: USER[] = [];
  cart: CartItem[] = [];
  isLoading: boolean = false;
  cartLength: number = 0;
  error = "";
  loginerror: boolean = false;
  query = ""
  combinedData = {} as combinedData;
  cartItems: CartItem[] = [];

  public getmobile() {
    const url: string = "https://server-side-58yz.onrender.com/getMobile";
    return this.http.get<events[]>(url)

  }

  public localStorage(id: string): Observable<USER> {

    const url: string = "https://server-side-58yz.onrender.com/localStorage" + id;
    return this.http.get<USER>(url)
  }

  public MobileDetails(id: string) {

    const url: string = "https://server-side-58yz.onrender.com/MobileDetails" + id;
    return this.http.get<USER>(url)
  }


  public getCart(id: string) {

    const url: string = "https://server-side-58yz.onrender.com/getCart" + id;
    return this.http.get<USER>(url)
  }





  public addCart(addid: string) {

    const url: string = "https://server-side-58yz.onrender.com/addCart" + addid;
    this.cartLength++;
    return this.http.get<events[]>(url)
      .subscribe();
  }

  public async addUser(user: USER[]) {
    this.isLoading = true;
    const url: string = "https://server-side-58yz.onrender.com/CreatingUser";
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


    const url: string = "https://server-side-58yz.onrender.com/userMatch" + query;
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


    const url: string = " https://server-side-58yz.onrender.com/addFavorites" + addid;
    this.http.get(url)
      .subscribe()
  }

  public getUsers() {


    const url: string = "https://server-side-58yz.onrender.com/getUsers";
    return this.http.get<USER[]>(url)

  }

  public deleteFavorites(addid: string) {


    const url: string = "https://server-side-58yz.onrender.com/deleteFavorites" + addid;
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

  updateAddCart(addid: string) {

    const url: string = "https://server-side-58yz.onrender.com/cartUpdate" + addid;
    return this.http.get<USER[]>(url)
      .subscribe()

  }


  public async addUser1(combinedData: combinedData) {
    console.log(combinedData)
    const url: string = "https://server-side-58yz.onrender.com/Emailorderconfirmation";
    return this.http.post<combinedData>(url, combinedData).subscribe((data) => {
    });;
  }

}





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
  query = "";
  logindetails: {} = {}
  combinedData = {} as combinedData;
  cartItems: CartItem[] = [];
  listmobileMock: events[] = [];
  dataFavorites: any = [];
  Category: any = [];
  sourceData: events[] = [];
  email: any;
  director = false
  url: string = "http://localhost:3000";
  // https://lonely-kilt-tick.cyclic.app
  // https://server-side-58yz.onrender.com
  // https://api-pi72mex7aq-uc.a.run.app/

  public getmobile() {
    const url: string = `${this.url}/getMobile`;
    return this.http.get<events[]>(url)

  }

  public getCategory() {
    const url: string = `${this.url}/getCategory`;
    return this.http.get<any[]>(url)

  }

  public deleteCategory(id: string) {
    const url: string = `${this.url}/deleteCategory` + id;
    return this.http.get<string>(url).subscribe();

  }

  public deleteProduct(id: string) {
    const url: string = `${this.url}/deleteProduct` + id;
    return this.http.get<string>(url).subscribe();

  }

  public localStorage(id: string) {

    const url: string = `${this.url}/localStorage` + id;
    return this.http.get<USER>(url)
  }

  public MobileDetails(id: string) {

    const url: string = `${this.url}/MobileDetails` + id;
    return this.http.get<USER>(url)
  }


  public getCart(id: string) {
    const url: string = `${this.url}/getCart` + id;
    return this.http.get<USER>(url)
  }





  public addCart(addid: string) {
    const url: string = `${this.url}/addCart` + addid;
    this.cartLength++;
    return this.http.get<events[]>(url)
      .subscribe();
  }

  public async addUser(user: USER[]) {
    this.isLoading = true;
    const url: string = `${this.url}/CreatingUser`;
    return this.http.post<USER[]>(url, user).subscribe((data) => {
      this.isLoading = false;
      const dataString = JSON.stringify(data);
      const parsedData = JSON.parse(dataString);
      const insertedId = parsedData.insertedId;
      localStorage.setItem('_id', insertedId);
      this.userMatch(this.logindetails)
    });;
  }


  public UsernameCheck(query: string) {
    const url: string = `${this.url}/UsernameCheck` + query;
    return this.http.get<USER>(url)
  }

  public userMatch(logindetails: {}) {

    const url: string = `${this.url}/userMatch`;
    return this.http.post<Body>(url, logindetails, {withCredentials: true})
      .subscribe((data: any) => {
        console.log(data);
        this.director = data.Director
        this.isLoading = false;
        if (data.length === 0) {
          this.loginerror = true;
          this.error = 'שם המשתמש או הסיסמה אינם נכונים.';
          return;
        }
        this.loginerror = false;
        this.user = data;
        localStorage.setItem('_id', this.user[0]._id);
        const id = `/?_id=${this.user[0].cart[0]}`

        this.getCart(id).subscribe((data: any) => {
          let totalCount = 0;
          for (const item of data.cart) {
            totalCount += parseInt(item.count, 10);
          }
          this.cartLength = totalCount;
          this.cart = data;
        }
        );
        this.login = false;
        this.navigateToshop()
        this.Connected = true;
      })
  }

  addFavorites(addid: string) {


    const url: string = `${this.url}/addFavorites` + addid;
    this.http.get(url)
      .subscribe()
  }

  public getUsers() {

    const url: string = `${this.url}/getUsers`;
    return this.http.get<USER[]>(url, {withCredentials: true})

  }

  public deleteFavorites(addid: string) {


    const url: string = `${this.url}/deleteFavorites` + addid;
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

    const url: string = `${this.url}/cartUpdate` + addid;
    return this.http.get<USER[]>(url)
      .subscribe()

  }


  public async Emailorderconfirmation(combinedData: combinedData) {
    const url: string = `${this.url}/Emailorderconfirmation`;
    return this.http.post<combinedData>(url, combinedData, {withCredentials: true})
  }

  public async uploadProduct(formData: {}) {

    this.http.post(`${this.url}/upload`, formData).subscribe();
  }

  public async addCategory(category: {}) {


    this.http.post(`${this.url}/addCategory`, category).subscribe();
  }

  categoryUpdate(addid: string) {

    const url: string = `${this.url}/categoryUpdate` + addid;
    console.log(url)
    return this.http.get<USER[]>(url)
      .subscribe()

  }

  ProductUpdate(addid: string) {

    const url: string = `${this.url}/ProductUpdate` + addid;
    return this.http.get<USER[]>(url).subscribe()
  }

  ademptyCart(addid: string) {

    const url: string = `${this.url}/emptyCart` + addid;
    console.log(url)
    return this.http.get<USER[]>(url).subscribe()
  }

  Favorites() {
    this.dataFavorites.data = this.listmobileMock.filter((mobile) => mobile.love === true);
    this.router.navigate(['/Favourites']);
  }

}





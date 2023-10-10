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
  listmobileMock: events[] = [];
  dataFavorites: any = [];
  Category: any = [];
  sourceData: events[] = [];
  email: any
  displayFavorites: boolean = false;
  // https://server-side-58yz.onrender.com
  // http://localhost:3000

  public getmobile() {
    const url: string = "https://lonely-kilt-tick.cyclic.app/getMobile";
    return this.http.get<events[]>(url)

  }

  public getCategory() {
    const url: string = "https://lonely-kilt-tick.cyclic.app/getCategory";
    return this.http.get<any[]>(url)

  }

  public deleteCategory(id: string) {
    const url: string = "https://lonely-kilt-tick.cyclic.app/deleteCategory" + id;
    return this.http.get<string>(url).subscribe();

  }

  public deleteProduct(id: string) {
    const url: string = "https://lonely-kilt-tick.cyclic.app/deleteProduct" + id;
    return this.http.get<string>(url).subscribe();

  }

  public localStorage(id: string): Observable<USER> {

    const url: string = "https://lonely-kilt-tick.cyclic.app/localStorage" + id;
    return this.http.get<USER>(url)
  }

  public MobileDetails(id: string) {

    const url: string = "https://lonely-kilt-tick.cyclic.app/MobileDetails" + id;
    return this.http.get<USER>(url)
  }


  public getCart(id: string) {
    const url: string = "https://lonely-kilt-tick.cyclic.app/getCart" + id;
    return this.http.get<USER>(url)
  }





  public addCart(addid: string) {
    const url: string = "https://lonely-kilt-tick.cyclic.app/addCart" + addid;
    this.cartLength++;
    return this.http.get<events[]>(url)
      .subscribe();
  }

  public async addUser(user: USER[]) {
    this.isLoading = true;
    const url: string = "https://lonely-kilt-tick.cyclic.app/CreatingUser";
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


    const url: string = "https://lonely-kilt-tick.cyclic.app/userMatch" + query;
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


    const url: string = " https://lonely-kilt-tick.cyclic.app/addFavorites" + addid;
    this.http.get(url)
      .subscribe()
  }

  public getUsers() {


    const url: string = "https://lonely-kilt-tick.cyclic.app/getUsers";
    return this.http.get<USER[]>(url)

  }

  public deleteFavorites(addid: string) {


    const url: string = "https://lonely-kilt-tick.cyclic.app/deleteFavorites" + addid;
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

    const url: string = "https://lonely-kilt-tick.cyclic.app/cartUpdate" + addid;
    return this.http.get<USER[]>(url)
      .subscribe()

  }


  public async Emailorderconfirmation(combinedData: combinedData) {
    const url: string = "https://lonely-kilt-tick.cyclic.app/Emailorderconfirmation";
    return this.http.post<combinedData>(url, combinedData).subscribe((data) => {
      this.email = data
      console.log(this.email)
    });;
  }

  public async uploadProduct(formData: {}) {


    this.http.post('https://lonely-kilt-tick.cyclic.app/upload', formData).subscribe();
  }

  public async addCategory(category: {}) {


    this.http.post('https://lonely-kilt-tick.cyclic.app/addCategory', category).subscribe();
  }

  categoryUpdate(addid: string) {

    const url: string = "https://lonely-kilt-tick.cyclic.app/categoryUpdate" + addid;
    console.log(url)
    return this.http.get<USER[]>(url)
      .subscribe()

  }

  ProductUpdate(addid: string) {

    const url: string = "https://lonely-kilt-tick.cyclic.app/ProductUpdate" + addid;
    return this.http.get<USER[]>(url).subscribe()
  }

  ademptyCart(addid: string) {

    const url: string = "https://lonely-kilt-tick.cyclic.app/emptyCart" + addid;
    console.log(url)
    return this.http.get<USER[]>(url).subscribe()
  }

  Favorites() {
    this.dataFavorites.data = this.listmobileMock.filter((mobile) => mobile.love === true);
    this.displayFavorites = !this.displayFavorites;
  }

}





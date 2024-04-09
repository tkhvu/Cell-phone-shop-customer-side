import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcartItem, Ievents, Iuser, IcombinedData, ICart } from '../interfaces';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  Connected: boolean = false;
  user = {} as Iuser;
  cart: IcartItem[] = [];
  isLoading: boolean = false;
  totalCount: number = 0;
  error = "";
  loginerror: boolean = false;
  query = "";
  combinedData = {} as IcombinedData;
  cartItems: IcartItem[] = [];
  listmobileMock: Ievents[] = [];
  dataFavorites: any = [];
  Category: any = [];
  sourceData: Ievents[] = [];
  email: any;
  director = false
  url: string = "http://localhost:3000";


  public getmobile() {
    const url: string = `${this.url}/api/mobile/getMobile`;
    return this.http.get<Ievents[]>(url)

  }

  public getCategory() {
    const url: string = `${this.url}/api/category/getCategory`;
    return this.http.get<any[]>(url)

  }

  public deleteCategory(id: string) {
    const url: string = `${this.url}/api/category/deleteCategory` + id;
    return this.http.get<string>(url).subscribe();

  }

  public deleteProduct(id: string) {
    const url: string = `${this.url}/api/mobile/deleteProduct` + id;
    return this.http.delete<string>(url).subscribe();

  }

  public localStorage() {

    const url: string = `${this.url}/api/users/localStorage`;
    return this.http.get<Iuser>(url, { withCredentials: true })
  }

  public MobileDetails(id: string) {

    const url: string = `${this.url}/api/mobile/MobileDetails` + id;
    return this.http.get<Iuser>(url)
  }


 


  public addCart(addid: string) {
    const url: string = `${this.url}/api/cart/addCart` + addid;
    this.totalCount++;
    return this.http.get<Ievents[]>(url)
      .subscribe();
  }

  public async addUser(user: Iuser[]) {
    this.isLoading = true;
    const url: string = `${this.url}/api/users/CreatingUser`;
    return this.http.post<Iuser[]>(url, user).subscribe((data) => {
      this.isLoading = false;
      const dataString = JSON.stringify(data);
      const parsedData = JSON.parse(dataString);
      const insertedId = parsedData.insertedId;
      localStorage.setItem('_id', insertedId);
      this.userMatch(user)
    });;
  }


  public UsernameCheck(query: string) {
    const url: string = `${this.url}/api/users/UsernameCheck` + query;
    return this.http.get<Iuser>(url)
  }


  public getCart(id: string): Observable<any> {
    const url: string = `${this.url}/api/cart/getCart${id}`;
    return this.http.get<any>(url).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  public userMatch(logindetails: {}): void {

    const url: string = `${this.url}/api/users/userMatch`;
     this.http.post<Body>(url, logindetails, {withCredentials: true})
      .subscribe((data: any) => {
        this.director = data.Director
        this.isLoading = false;
        if (!data) {
          this.loginerror = true;
          this.error = 'שם המשתמש או הסיסמה אינם נכונים.';
          return;
        }
        // this.loginerror = false;
        this.user = data;

        localStorage.setItem('_id', this.user._id);
        const id = `/?_id=${this.user.cart}`

        this.getCart(id).subscribe((data: ICart ) => {
          this.totalCount = 0;
          for (const item of data.cart) {
            this.totalCount += item.count;
          }
        });

        this.navigateToshop()
        this.Connected = true;
      })
  }



  //   public userMatch(logindetails: {}): Observable<any> {

  //     const url: string = `${this.url}/userMatch`;
  //     return this.http.post<Iuser>(url, logindetails, { withCredentials: true })
  //       .pipe(
  //         switchMap((data: any) => {
  //           this.director = data.Director
  //           this.isLoading = false;
  //           if (data.length === 0) {
  //             this.loginerror = true;
  //             this.error = 'שם המשתמש או הסיסמה אינם נכונים.';
  //             return;
  //           }
  //           this.loginerror = false;
  //           this.user = data;

  //           localStorage.setItem('_id', this.user._id);
  //           const id = `/?_id=${this.user.cart}`


  //           this.login = false;
  //           this.navigateToshop()
  //           this.Connected = true;
  // })
  // )},
  // this.getCart(id).subscribe((data: any) => {
  //           let totalCount = 0;
  //           for (const item of data.cart) {
  //             totalCount += parseInt(item.count, 10);
  //           }
  //           this.cartLength = totalCount;
  //           this.cart = data;
  //         }
  //         );
  //         this.login = false;
  //         this.navigateToshop()
  //         this.Connected = true;
  //       }),


  addFavorites(addid: string) {


    const url: string = `${this.url}/api/favorites/addFavorites` + addid;
    this.http.get(url)
      .subscribe()
  }

  public getUsers() {

    const url: string = `${this.url}/api/users/getUsers`;
    return this.http.get<Iuser[]>(url, { withCredentials: true })


  }

  public deleteFavorites(addid: string) {


    const url: string = `${this.url}/api/favorites/deleteFavorites` + addid;
    return this.http.delete<Iuser[]>(url)
      .subscribe()
  }


  public navigateToshop() {
    this.router.navigate(['/Listmobile']);
  }


  LogOut() {
    this.Connected = false
    this.router.navigate(['/Login']);
    localStorage.removeItem('_id');
    this.user = {} as Iuser;
    this.totalCount = 0;

  }

  updateAddCart(addid: string) {

    const url: string = `${this.url}/api/cart/cartUpdate` + addid;
    return this.http.get<Iuser[]>(url)
      .subscribe()

  }


  Emailorderconfirmation(combinedData: IcombinedData): Observable<any> {
    const url: string = `${this.url}/api/email/Emailorderconfirmation`;
    return this.http.post<IcombinedData>(url, combinedData, { withCredentials: true })
  }

  public async uploadProduct(formData: {}) {

    this.http.post(`${this.url}/api/upload/upload`, formData).subscribe();
  }

  public async addCategory(category: {}) {

    this.http.post(`${this.url}/api/category/addCategory`, category).subscribe();
  }


  categoryUpdate(addid: string): Observable<Iuser[]> {
    const url: string = `${this.url}/api/category/categoryUpdate${addid}`;
    return this.http.get<Iuser[]>(url);
  }

  ProductUpdate(addid: string) {
    console.log(addid)

    const url: string = `${this.url}/api/mobile/ProductUpdate` + addid;
    return this.http.get<Iuser[]>(url).subscribe()
  }

  ademptyCart(addid: string) {

    const url: string = `${this.url}/api/cart/emptyCart` + addid;
    return this.http.get<Iuser[]>(url).subscribe()
  }

  Favorites() {
    this.dataFavorites.data = this.listmobileMock.filter((mobile) => mobile.love === true);
    this.router.navigate(['/Favourites']);
  }

}
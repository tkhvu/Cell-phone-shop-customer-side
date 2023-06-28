import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { events, USER } from '../interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  Connected: any = "";
  username: string = "";
  User: any = [];
  t: string = "";
  a: number = 0;
  id: any = "";

  public getshps(): Observable<events[]> {
    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getshps";
    return this.http.get<events[]>(url,);
  }


  public getmobile() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getMobile";
    return this.http.get<events[]>(url)
    //  .subscribe((data) => {
    //   this.dataSource = data;
    // })
  }


  public Cartmobile(mobile: any) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/cartMobile";
  
    return this.http.post<events[]>(url, mobile)
      .subscribe();
  }

  public user(user: USER[]) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/CreatingUser";
    return this.http.post<USER[]>(url, user)
      .subscribe();
  }


  public userMatch() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/userMatch" + this.t;
    return this.http.get<USER>(url)
  
  }

   addfavorites() {


    const url: string = " https://us-central1-fine-command-384813.cloudfunctions.net/favorites" + this.id;
   this.http.get(url)
     .subscribe()
  }

  public getUsers() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getUsers";
    return this.http.get<USER[]>(url)
  
  }

  public deletefavorites() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/deleteFavorites" + this.id;

    return this.http.get<USER[]>(url)
    .subscribe()
  }


  public navigateToshop() {
    this.router.navigate(['/shop']);
  }

  public navigateToLogin() {
    this.router.navigate(['/Login']);
  }
}





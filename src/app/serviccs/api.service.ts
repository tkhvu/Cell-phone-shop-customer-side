import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Albums, Albums1 } from '../albums';
import { events, USER } from '../interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  Connected: any = "";
  Username: string = "";
  User: any = [];
  t: string = "";
  a: number = 0;
  id: any = "";

  public getshps(): Observable<events[]> {
    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getshps";
    return this.http.get<events[]>(url,);
  }


  // public getmobile(): Observable<Albums1[]>  {
  //   // const url: string = "https://jsonplaceholder.typicode.com/albums";

  // // const httpOptions = {
  // //   headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  // // };
  //  const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getmobile";
  //   return this.http.post<Albums1[]>(url, ac)
  //   // .subscribe((res)=>{ console.log(res) });
  // }
  public getmobile() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getmobile";
    return this.http.get<events[]>(url)
    //  .subscribe((data) => {
    //   this.dataSource = data;
    // })
  }


  public Cartmobile(mobile: events[]) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/Cartmobile";
    return this.http.post<events[]>(url, mobile)
      .subscribe();
  }

  public user(name: USER[]) {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/user";
    return this.http.post<USER[]>(url, name)
      .subscribe();
  }


  public userMatch() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/category" + this.t;
    return this.http.get<USER>(url)
  
  }

   addid() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/love" + this.id;
   this.http.get(url)
     .subscribe()
  }

  public getUsers() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/getUsers";
    return this.http.get<USER[]>(url)
  
  }

  public deletelove() {


    const url: string = "https://us-central1-fine-command-384813.cloudfunctions.net/deleteOne" + this.id;

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





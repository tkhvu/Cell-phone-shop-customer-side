// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { User } from './interfaces';
// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private serviceUrl = 'https://dummyjson.com/users';
//   constructor(private http: HttpClient) {}
//   getUsers(): Observable<User[]> {
//     return this.http
//       .get(this.serviceUrl)
//       .pipe<User[]>(map((data: any) => data.users));
//   }
// }
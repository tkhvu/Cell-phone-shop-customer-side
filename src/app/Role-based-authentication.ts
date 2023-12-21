import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './serviccs/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private router: Router, private api: ApiService) {}
  // ngOnInit() {

  //   const id = localStorage.getItem('_id');
  // }
 
  canActivate() {
    // const id = localStorage.getItem('_id');
    if (this.api.director) {
      return true;
    } else {
      this.router.navigate(['/Listmobile']);
      return false;
    }
}
}


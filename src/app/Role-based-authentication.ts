import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './serviccs/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private router: Router, private api: ApiService) { }


  canActivate() {
    if (this.api.director) {
      return true;
    } else {
      this.router.navigate(['/Listmobile']);
      return false;
    }
  }
}


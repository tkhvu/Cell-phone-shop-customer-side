import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private router: Router) {}
  ngOnInit() {

    const id = localStorage.getItem('_id');
  }
 
  canActivate() {
    const id = localStorage.getItem('_id');
    if (id == "654b6bbaf4bc6fe44d64a750") {
      return true;
    } else {
      this.router.navigate(['/Listmobile']);
      return false;
    }
}
}
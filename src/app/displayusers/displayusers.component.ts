import { Component } from '@angular/core';
import { ApiService } from '../serviccs/api.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displayusers',
  templateUrl: './displayusers.component.html',
  styleUrls: ['./displayusers.component.css']
})
export class DisplayusersComponent {
  constructor(private api: ApiService, private router: Router) { }
  usersData: any = [];
  displayedColumnsusers: string[] = ['email', 'lastname', 'firstname'];
  LoadingComplete: boolean = false;

  ngOnInit() {
    this.api.getUsers().pipe(
      catchError((error) => {
        console.error('Error received from getUsers:', error.error.error);
if (error.error.error === "jwt expired"){
  this.router.navigate(['/Login']);
}
        return "  טוקן לא בתוקף";
      })
    ).subscribe((data) => {
      this.usersData.data = data
    })
    this.LoadingComplete = true
  }
  
}

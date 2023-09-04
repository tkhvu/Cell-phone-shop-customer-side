import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit{

  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.categories = data
    })
  }
  ManagerChange = 0;
  categories: any = [];
  isEditable = false;


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  bioSection: FormGroup;
  bioSection1: FormGroup;

  constructor(private fb: FormBuilder, public api: ApiService, private http: HttpClient,private _snackBar: MatSnackBar) {
    this.bioSection = this.fb.group({
      price: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      name: ['', Validators.required],
      src: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.bioSection1 = this.fb.group({
      category: ['', Validators.required],
    });
  }

  OrderConfirmation() {
    this.uploadProduct()
    const action = "סגור";
    const message = "העלאה הסתיימה בהצלחה"
    this.openSnackBar(action, message)
  }


  selectedFile: File | undefined;

  uploadProduct() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.bioSection.value.name);
      formData.append('price', this.bioSection.value.price);
      formData.append('category', this.bioSection.value.category);

      formData.append('image', this.selectedFile);

      this.http.post('https://server-side-58yz.onrender.com/upload', formData).subscribe();
    }
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addCategory(){
    console.log(this.bioSection1.value)
    this.http.post('https://server-side-58yz.onrender.com/addCategory', this.bioSection1.value).subscribe(response => {
      console.log(response);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(action, message, {
      duration: 10000, // משך הצגת ההודעה במילי-שניות
      panelClass: ['custom-class'], // עיצוב נוסף
    });
  }
}

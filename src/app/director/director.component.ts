import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent {

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
  constructor(private fb: FormBuilder, public api: ApiService, private http: HttpClient) {
    this.bioSection = this.fb.group({
      price: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      name: ['', Validators.required],
      src: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  OrderConfirmation() {
    this.uploadProduct()
  }


  selectedFile: File | undefined;

  uploadProduct() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.bioSection.value.name);
      formData.append('price', this.bioSection.value.price);
      formData.append('category', this.bioSection.value.category);

      formData.append('image', this.selectedFile);

      this.http.post('http://localhost:3000/upload', formData).subscribe(response => {
        console.log(response);
      });
    }
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

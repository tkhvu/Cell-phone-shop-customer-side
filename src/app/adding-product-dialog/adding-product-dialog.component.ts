import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../serviccs/api.service';


@Component({
  selector: 'app-adding-product-dialog',
  templateUrl: './adding-product-dialog.component.html',
  styleUrls: ['./adding-product-dialog.component.css']
})
export class AddingProductDialogComponent {

  ngOnInit() {
    this.api.getCategory().subscribe((data) => {
      this.categories = data
    });
  } 

  categories: any = [];

  selectedFile: File | undefined;

  bioSection: FormGroup;

  constructor(private fb: FormBuilder, public api: ApiService) {
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

  uploadProduct() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.bioSection.value.name);
      formData.append('price', this.bioSection.value.price);
      formData.append('category', this.bioSection.value.category);

      formData.append('image', this.selectedFile);

      this.api.uploadProduct( formData);
    }
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  




}

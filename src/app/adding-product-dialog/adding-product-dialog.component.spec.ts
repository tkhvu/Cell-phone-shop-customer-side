import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingProductDialogComponent } from './adding-product-dialog.component';

describe('AddingProductDialogComponent', () => {
  let component: AddingProductDialogComponent;
  let fixture: ComponentFixture<AddingProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddingProductDialogComponent]
    });
    fixture = TestBed.createComponent(AddingProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingCategoryComponent } from './adding-category.component';

describe('AddingCategoryComponent', () => {
  let component: AddingCategoryComponent;
  let fixture: ComponentFixture<AddingCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddingCategoryComponent]
    });
    fixture = TestBed.createComponent(AddingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

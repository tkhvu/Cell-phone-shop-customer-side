import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDeleteComponent } from './categorie-delete.component';

describe('CategorieDeleteComponent', () => {
  let component: CategorieDeleteComponent;
  let fixture: ComponentFixture<CategorieDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieDeleteComponent]
    });
    fixture = TestBed.createComponent(CategorieDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

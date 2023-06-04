import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmobileComponent } from './listmobile.component';

describe('ListmobileComponent', () => {
  let component: ListmobileComponent;
  let fixture: ComponentFixture<ListmobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListmobileComponent]
    });
    fixture = TestBed.createComponent(ListmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

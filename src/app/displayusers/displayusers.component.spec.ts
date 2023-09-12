import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayusersComponent } from './displayusers.component';

describe('DisplayusersComponent', () => {
  let component: DisplayusersComponent;
  let fixture: ComponentFixture<DisplayusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayusersComponent]
    });
    fixture = TestBed.createComponent(DisplayusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateaccountComponent } from './adduser.component';

describe('CreateaccountComponent', () => {
  let component: CreateaccountComponent;
  let fixture: ComponentFixture<CreateaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateaccountComponent]
    });
    fixture = TestBed.createComponent(CreateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

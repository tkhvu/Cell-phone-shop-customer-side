import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagonComponent } from './wagon.component';

describe('WagonComponent', () => {
  let component: WagonComponent;
  let fixture: ComponentFixture<WagonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WagonComponent]
    });
    fixture = TestBed.createComponent(WagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailCustomerComponent } from './show-detail-customer.component';

describe('ShowDetailCustomerComponent', () => {
  let component: ShowDetailCustomerComponent;
  let fixture: ComponentFixture<ShowDetailCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailHouseComponent } from './show-detail-house.component';

describe('ShowDetailHouseComponent', () => {
  let component: ShowDetailHouseComponent;
  let fixture: ComponentFixture<ShowDetailHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

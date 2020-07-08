import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryHouseComponent } from './history-house.component';

describe('HistoryHouseComponent', () => {
  let component: HistoryHouseComponent;
  let fixture: ComponentFixture<HistoryHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailUserComponent } from './show-detail-user.component';

describe('ShowDetailUserComponent', () => {
  let component: ShowDetailUserComponent;
  let fixture: ComponentFixture<ShowDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

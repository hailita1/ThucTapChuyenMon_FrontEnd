import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDealsComponent } from './delete-deals.component';

describe('DeleteDealsComponent', () => {
  let component: DeleteDealsComponent;
  let fixture: ComponentFixture<DeleteDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

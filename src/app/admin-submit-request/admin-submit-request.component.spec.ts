import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubmitRequestComponent } from './admin-submit-request.component';

describe('AdminSubmitRequestComponent', () => {
  let component: AdminSubmitRequestComponent;
  let fixture: ComponentFixture<AdminSubmitRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubmitRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubmitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

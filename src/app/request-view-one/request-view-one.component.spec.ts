import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestViewOneComponent } from './request-view-one.component';

describe('RequestViewOneComponent', () => {
  let component: RequestViewOneComponent;
  let fixture: ComponentFixture<RequestViewOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestViewOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

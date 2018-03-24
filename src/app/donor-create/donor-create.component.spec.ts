import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorCreateComponent } from './donor-create.component';

describe('DonorCreateComponent', () => {
  let component: DonorCreateComponent;
  let fixture: ComponentFixture<DonorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

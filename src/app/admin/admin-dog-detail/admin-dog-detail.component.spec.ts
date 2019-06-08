import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDogDetailComponent } from './admin-dog-detail.component';

describe('AdminDogDetailComponent', () => {
  let component: AdminDogDetailComponent;
  let fixture: ComponentFixture<AdminDogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

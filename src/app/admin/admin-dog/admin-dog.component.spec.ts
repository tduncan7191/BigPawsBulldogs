import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDogComponent } from './admin-dog.component';

describe('AdminDogComponent', () => {
  let component: AdminDogComponent;
  let fixture: ComponentFixture<AdminDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

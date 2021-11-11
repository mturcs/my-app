import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrNavbarComponent } from './gr-navbar.component';

describe('GrNavbarComponent', () => {
  let component: GrNavbarComponent;
  let fixture: ComponentFixture<GrNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

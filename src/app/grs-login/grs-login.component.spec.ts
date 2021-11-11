import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsLoginComponent } from './grs-login.component';

describe('GrsLoginComponent', () => {
  let component: GrsLoginComponent;
  let fixture: ComponentFixture<GrsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrsLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

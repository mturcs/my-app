import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsStoreComponent } from './grs-store.component';

describe('GrsStoreComponent', () => {
  let component: GrsStoreComponent;
  let fixture: ComponentFixture<GrsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrsStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

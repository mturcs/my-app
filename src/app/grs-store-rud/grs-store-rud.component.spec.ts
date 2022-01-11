import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsStoreRudComponent } from './grs-store-rud.component';

describe('GrsStoreRudComponent', () => {
  let component: GrsStoreRudComponent;
  let fixture: ComponentFixture<GrsStoreRudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrsStoreRudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsStoreRudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

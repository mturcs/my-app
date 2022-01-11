import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsSupplyComponent } from './grs-supply.component';

describe('GrsSupplyComponent', () => {
  let component: GrsSupplyComponent;
  let fixture: ComponentFixture<GrsSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrsSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

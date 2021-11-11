import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsRegistryRudComponent } from './grs-registry-rud.component';

describe('GrsRegistryRudComponent', () => {
  let component: GrsRegistryRudComponent;
  let fixture: ComponentFixture<GrsRegistryRudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrsRegistryRudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsRegistryRudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

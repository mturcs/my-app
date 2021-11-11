import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsRegistryCreComponent } from './grs-registry-cre.component';

describe('GrsRegistryCreComponent', () => {
  let component: GrsRegistryCreComponent;
  let fixture: ComponentFixture<GrsRegistryCreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrsRegistryCreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsRegistryCreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

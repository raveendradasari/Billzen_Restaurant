import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotPrintConfigComponent } from './kot-print-config.component';

describe('KotPrintConfigComponent', () => {
  let component: KotPrintConfigComponent;
  let fixture: ComponentFixture<KotPrintConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KotPrintConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotPrintConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

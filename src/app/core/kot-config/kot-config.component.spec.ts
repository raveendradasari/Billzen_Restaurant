import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotConfigComponent } from './kot-config.component';

describe('KotConfigComponent', () => {
  let component: KotConfigComponent;
  let fixture: ComponentFixture<KotConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KotConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

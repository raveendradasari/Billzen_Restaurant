import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcPageComponent } from './nc-page.component';

describe('NcPageComponent', () => {
  let component: NcPageComponent;
  let fixture: ComponentFixture<NcPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

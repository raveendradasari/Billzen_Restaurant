import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatwisereportComponent } from './subcatwisereport.component';

describe('SubcatwisereportComponent', () => {
  let component: SubcatwisereportComponent;
  let fixture: ComponentFixture<SubcatwisereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcatwisereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcatwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

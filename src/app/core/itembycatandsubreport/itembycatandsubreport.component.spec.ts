import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItembycatandsubreportComponent } from './itembycatandsubreport.component';

describe('ItembycatandsubreportComponent', () => {
  let component: ItembycatandsubreportComponent;
  let fixture: ComponentFixture<ItembycatandsubreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItembycatandsubreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItembycatandsubreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

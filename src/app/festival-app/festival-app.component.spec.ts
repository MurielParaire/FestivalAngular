import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalAppComponent } from './festival-app.component';

describe('FestivalAppComponent', () => {
  let component: FestivalAppComponent;
  let fixture: ComponentFixture<FestivalAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

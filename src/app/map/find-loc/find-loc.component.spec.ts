import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLocComponent } from './find-loc.component';

describe('FindLocComponent', () => {
  let component: FindLocComponent;
  let fixture: ComponentFixture<FindLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindLocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

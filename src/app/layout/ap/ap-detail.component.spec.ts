import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApDetailComponent } from './ap-detail.component';

describe('ApDetailComponent', () => {
  let component: ApDetailComponent;
  let fixture: ComponentFixture<ApDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

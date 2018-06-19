import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSvgComponent } from './network-svg.component';

describe('NetworkSvgComponent', () => {
  let component: NetworkSvgComponent;
  let fixture: ComponentFixture<NetworkSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

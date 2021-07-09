import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanlockComponent } from './loanlock.component';

describe('LoanlockComponent', () => {
  let component: LoanlockComponent;
  let fixture: ComponentFixture<LoanlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

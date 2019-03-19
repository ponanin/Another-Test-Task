import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFormDataComponent } from './second-form-data.component';

describe('SecondFormDataComponent', () => {
  let component: SecondFormDataComponent;
  let fixture: ComponentFixture<SecondFormDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondFormDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

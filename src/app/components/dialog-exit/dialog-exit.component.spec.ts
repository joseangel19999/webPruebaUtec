import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExitComponent } from './dialog-exit.component';

describe('DialogExitComponent', () => {
  let component: DialogExitComponent;
  let fixture: ComponentFixture<DialogExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataExampleDialog } from './popup.component';

describe('PopupComponent', () => {
  let component: DialogDataExampleDialog;
  let fixture: ComponentFixture<DialogDataExampleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDataExampleDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogDataExampleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

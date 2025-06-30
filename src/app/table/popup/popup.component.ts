import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../../types/PeriodicElement';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'popup.component.html',
  standalone: true,
  styleUrls: ['popup.component.scss'],
  imports: [MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DialogDataExampleDialog {
  data: { element: PeriodicElement, editRow: (row: PeriodicElement) => void } = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogDataExampleDialog>);
  editedElement: PeriodicElement;

  constructor() {
    this.editedElement = { ...this.data.element };
  }

  save(): void {
    this.data.editRow(this.editedElement);
    this.dialogRef.close();
  }
}

import { Component, inject, input, Input } from '@angular/core';
import { PeriodicElement } from '../../types/PeriodicElement';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogDataExampleDialog } from './popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: PeriodicElement[] = [];
  @Input() columnNames: string[] = [];
  @Input() editRow: (row: PeriodicElement) => void = () => { };
  get displayedColumns(): string[] {
    return [...this.columnNames, 'Edit'];
  }
  dialog = inject(MatDialog);
  edit(element: PeriodicElement): void {
    console.log('Edit element:', element);
    this.dialog.open(DialogDataExampleDialog, {
      data: { element: JSON.parse(JSON.stringify(element)), editRow: this.editRow },
    });
  }
}

import { Component, effect, inject, signal } from '@angular/core';
import { ElementStore } from './elementStore.store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TableComponent } from './table/table.component';
import { PeriodicElement } from '../types/PeriodicElement';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatCardModule, TableComponent, FormsModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store = inject(ElementStore);

  filterValue = signal('');
  private filterTimeout?: any;

  filteredData = this.store.filteredElements;
  isLoading = this.store.isLoading;

  columnNames = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.store.loadElements();
  }

  onFilterChange(value: string) {
    this.filterValue.set(value);
    clearTimeout(this.filterTimeout);
    this.isLoading.set(true);
    this.filterTimeout = setTimeout(() => {
      this.store.setFilter(this.filterValue());
      this.isLoading.set(false);
    }, 2000);
  }

  editRow = (row: PeriodicElement) => {
    this.store.updateElement(row);
  };
}
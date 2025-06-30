import { Component } from '@angular/core';
import { PeriodicElement } from '../types/PeriodicElement';
import { TableComponent } from './table/table.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatCardModule, TableComponent, FormsModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'my-app';
  periodicData = [] as PeriodicElement[];
  filterValue = '';
  columnNames = ['Number', 'Name', 'Weight', 'Symbol'];
  isLoading = false;
  isLoadingTable = true;
  private filterSubject = new Subject<string>();
  private subscriptions = new Subscription();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.isLoadingTable = true;
    this.dataService.getPeriodicElements().subscribe(data => {
      this.periodicData = data;
      this.isLoadingTable = false;
    });

    this.subscriptions.add(this.filterSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(debouncedFilterValue => {
      this.performFilter(debouncedFilterValue);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  editRow(row: PeriodicElement) {
    this.periodicData = this.periodicData.map(element => {
      if (element.position === row.position) {
        return row;
      } else {
        return element;
      }
    });
    console.log(this.periodicData)
  }
  applyFilter(filterValue: string) {
    this.filterSubject.next(filterValue);
  }

  private performFilter(filterValue: string): void {
    this.isLoading = true;
    this.dataService.filterPeriodicElements(filterValue).subscribe(filteredData => {
      this.periodicData = filteredData;
      this.isLoading = false;
    });
  }
}

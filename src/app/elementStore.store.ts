import { Injectable, signal, computed } from '@angular/core';
import { PeriodicElement } from '../types/PeriodicElement';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class ElementStore {
    private elements = signal<PeriodicElement[]>([]);
    private filter = signal<string>('');
    isLoading = signal<boolean>(false);

    filteredElements = computed(() => {
        const filterVal = this.filter().toLowerCase();
        return this.elements().filter(e =>
            Object.values(e).some(v => v.toString().toLowerCase().includes(filterVal))
        );
    });

    constructor(private dataService: DataService) { }

    loadElements() {
        this.isLoading.set(true);
        this.dataService.getPeriodicElements().subscribe(data => {
            this.elements.set(data);
            this.isLoading.set(false);
        });
    }

    setFilter(value: string) {
        this.filter.set(value);
    }

    updateElement(updated: PeriodicElement) {
        const updatedList = this.elements().map(el =>
            el.position === updated.position ? updated : el
        );
        this.elements.set(updatedList);
    }
}

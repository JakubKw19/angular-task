import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PeriodicElement } from '../types/PeriodicElement';

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() { }

    getPeriodicElements(): Observable<PeriodicElement[]> {
        return of(ELEMENT_DATA.map(e => ({ ...e }))).pipe(delay(2000));
    }

    filterPeriodicElements(filterValue: string): Observable<PeriodicElement[]> {
        const filteredData = ELEMENT_DATA.filter(element =>
            element.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            element.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
            element.weight.toString().includes(filterValue)
        );
        return of(filteredData).pipe(delay(2000));
    }
}
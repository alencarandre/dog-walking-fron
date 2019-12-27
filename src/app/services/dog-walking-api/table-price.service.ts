import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TablePrice } from "src/app/models/table-price.model";
import { DogWalkingRequest } from './dog-walking-request.service'

@Injectable({
  providedIn: 'root'
})

export class TablePriceService extends DogWalkingRequest {
  list(): Observable<TablePrice[]> {
    return this.http.get<TablePrice[]>(this.url('/table_prices'))
      .pipe(
        tap(TablePrices => console.log('TablePrices listed')),
        catchError(this.handleError('getTablePrices', []))
      );
  }
}

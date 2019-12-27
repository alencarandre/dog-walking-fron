import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Dog } from "src/app/models/dog.model";
import { DogWalkingRequest } from './dog-walking-request.service'

@Injectable({
  providedIn: 'root'
})

export class DogService extends DogWalkingRequest {
  list(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.url('/dogs'))
      .pipe(
        tap(dogs => console.log('Dogs listed')),
        catchError(this.handleError('getDogs', []))
      );
  }
}

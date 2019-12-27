import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Dog } from "src/app/models/dog.model";
import { TablePrice } from "src/app/models/table-price.model";
import { DogWalking } from '../../models/dog-walking.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const baseUrl = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})

export class DogWalkingRequest {
  constructor(protected http: HttpClient) { }

  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  protected url(path : string) : string {
    return `${baseUrl}${path}`;
  }
}

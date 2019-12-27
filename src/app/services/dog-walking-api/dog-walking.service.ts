import { Injectable, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { DogWalking } from '../../models/dog-walking.model';
import { DogWalkingRequest } from './dog-walking-request.service'
import { DateTimeService } from '../date-time.service';

@Injectable({
  providedIn: 'root',
})

export class DogWalkingService extends DogWalkingRequest {
  list(params = { upcoming: false }): Observable<DogWalking[]> {
    let path = `/dog_walkings${this.dogWalkingUriParam(params)}`;

    return this.http.get<DogWalking[]>(this.url(path))
      .pipe(
        tap(dogWalking => console.log('Dog walking listed')),
        catchError(this.handleError('getDogWalking', []))
      );
  }

  get(id : number): Observable<DogWalking> {
    return this.http.get<DogWalking>(this.url(`/dog_walkings/${id}`))
      .pipe(
        tap(dogWalking => console.log('Dog walking listed')),
        catchError(this.handleError('getDogWalking', null))
      );
  }

  create(dogWalking: DogWalking): Observable<DogWalking> {
    const dogWalkingSerialized = this.serializeDogWalkingToCreate(dogWalking)

    return this.http.post<DogWalking>(this.url('/dog_walkings'), { dog_walking: dogWalkingSerialized })
      .pipe(
        tap(dogWalking => console.log('Dog walking created')),
        catchError(this.handleError<any>('createDogWalking', []))
      )
  }

  startWalking(id: number) : Observable<DogWalking> {
    return this.http.patch<DogWalking>(this.url(`/dog_walkings/${id}/start_walking`), {})
      .pipe(
        tap(dogWalking => console.log('Dog walking listed')),
        catchError(this.handleError('getDogWalking', null))
      );
  }

  finishWalking(id: number) : Observable<DogWalking> {
    return this.http.patch<DogWalking>(this.url(`/dog_walkings/${id}/finish_walking`), {})
      .pipe(
        tap(dogWalking => console.log('Dog walking listed')),
        catchError(this.handleError('getDogWalking', null))
      );
  }

  private dogWalkingUriParam(params = { upcoming: false }) {
    let uriParams = '';

    if(params.upcoming) {
      uriParams = '?upcoming=true';
    }

    return uriParams;
  }

  private serializeDogWalkingToCreate(dogWalking : DogWalking) : {} {
    let pets = []
    dogWalking.pets.forEach(pet => {
      pets.push(pet.id)
    });

    return {
      latitude: dogWalking.latitude,
      longitude: dogWalking.longitude,
      duration: dogWalking.duration,
      scheduled_at: new DateTimeService(dogWalking.scheduled_at).ansiFormat(),
      pet_ids: pets
    }
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DogService } from './dog.service';

describe('DogWalking/DogService', () => {
  let httpTestingController: HttpTestingController;
  let service: DogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.configureTestingModule({
      providers: [DogService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DogService);
  })

  describe('#list', () => {
    it('Observable should match the right data', () => {
      const mockDogs = [{
        id: 1,
        name: 'Xandinho',
        age: 1,
        dog_breed: {
          id: 99,
          name: 'Chow Chow'
        }
      }, {
        id: 2,
        name: 'Tob',
        age: 3,
        dog_breed: {
          id: 110,
          name: 'Beagle'
        }
      }];

      service.list()
        .subscribe(dogsData => {
          expect(dogsData[0].id).toEqual(1);
          expect(dogsData[0].name).toEqual('Xandinho');
          expect(dogsData[0].age).toEqual(1);
          expect(dogsData[0].dog_breed.id).toEqual(99);
          expect(dogsData[0].dog_breed.name).toEqual('Chow Chow');

          expect(dogsData[1].id).toEqual(2);
          expect(dogsData[1].name).toEqual('Tob');
          expect(dogsData[1].age).toEqual(3);
          expect(dogsData[1].dog_breed.id).toEqual(110);
          expect(dogsData[1].dog_breed.name).toEqual('Beagle');
        });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dogs'
      );

      req.flush(mockDogs);
    })
  })
});
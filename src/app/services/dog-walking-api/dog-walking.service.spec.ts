import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DogWalkingService } from './dog-walking.service';
import { DogWalking } from 'src/app/models/dog-walking.model';
import { Dog } from 'src/app/models/dog.model';
import { DogBreed } from 'src/app/models/dog-breed.model';

describe('DogWalking/DogWalkingService', () => {
  let httpTestingController: HttpTestingController;
  let service: DogWalkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.configureTestingModule({
      providers: [DogWalkingService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DogWalkingService);
  })

  describe('#list', () => {
    it('returns all dog walking', () => {
      const mockDogWalking = [{
        id: 1,
        status: 'scheduled',
        latitude: 100.9999,
        longitude: 200.8888,
        duration: 30,
        price: 25,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: null,
        finished_at: null,
        pets: [{
          id: 10,
          name: 'Tob',
          age: 1,
          dog_breed: {
            id: 100,
            name: 'Beagle'
          }
        }]
      }, {
        id: 2,
        status: 'walking',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 60,
        price: 35,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: '2500-12-25 12:01:00',
        finished_at: null,
        pets: [{
          id: 20,
          name: 'Lilica',
          age: 2,
          dog_breed: {
            id: 200,
            name: 'Chow Chow'
          }
        }]
      }, {
        id: 3,
        status: 'finished',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 30,
        price: 35,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: '2500-12-25 12:01:00',
        finished_at: '2500-12-25 12:30:00',
        pets: [{
          id: 30,
          name: 'Shellow',
          age: 2,
          dog_breed: {
            id: 300,
            name: 'Dalmatian'
          }
        }]
      }];

      service.list()
        .subscribe(dogWalkingData => {
          console.log(dogWalkingData[0]);

          mockDogWalking.forEach((dw, index) => {
            expect(dw.id).toEqual(dogWalkingData[index].id);
            expect(dw.status).toEqual(dogWalkingData[index].status);
            expect(dw.latitude).toEqual(dogWalkingData[index].latitude);
            expect(dw.longitude).toEqual(dogWalkingData[index].longitude);
            expect(dw.duration).toEqual(dogWalkingData[index].duration);
            expect(dw.price).toEqual(dogWalkingData[index].price);
            expect(dw.final_price).toEqual(dogWalkingData[index].final_price);
            // TODO: Check how expect datetime from API works
            // expect(new Date(dw.scheduled_at)).toEqual(dogWalkingData[index].scheduled_at);
            // expect(new Date(dw.started_at)).toEqual(dogWalkingData[index].started_at);
            // expect(new Date(dw.finished_at)).toEqual(dogWalkingData[index].finished_at);
            expect(dw.pets[0].id).toEqual(dogWalkingData[index].pets[0].id);
            expect(dw.pets[0].name).toEqual(dogWalkingData[index].pets[0].name)
            expect(dw.pets[0].age).toEqual(dogWalkingData[index].pets[0].age);
          });
        });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dog_walkings'
      );

      req.flush(mockDogWalking);
    })

    it('returns all dog walking filtered by upcoming', () => {
      const mockDogWalking = [{
        id: 2,
        status: 'walking',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 60,
        price: 35,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: '2500-12-25 12:01:00',
        finished_at: null,
        pets: [{
          id: 20,
          name: 'Lilica',
          age: 2,
          dog_breed: {
            id: 200,
            name: 'Chow Chow'
          }
        }]
      }];

      service.list({ upcoming: true })
        .subscribe(dogWalkingData => {
          console.log(dogWalkingData[0]);

          mockDogWalking.forEach((dw, index) => {
            expect(dw.id).toEqual(dogWalkingData[index].id);
            expect(dw.status).toEqual(dogWalkingData[index].status);
            expect(dw.latitude).toEqual(dogWalkingData[index].latitude);
            expect(dw.longitude).toEqual(dogWalkingData[index].longitude);
            expect(dw.duration).toEqual(dogWalkingData[index].duration);
            expect(dw.price).toEqual(dogWalkingData[index].price);
            expect(dw.final_price).toEqual(dogWalkingData[index].final_price);
            // TODO: Check how expect datetime from API works
            // expect(new Date(dw.scheduled_at)).toEqual(dogWalkingData[index].scheduled_at);
            // expect(new Date(dw.started_at)).toEqual(dogWalkingData[index].started_at);
            // expect(new Date(dw.finished_at)).toEqual(dogWalkingData[index].finished_at);
            expect(dw.pets[0].id).toEqual(dogWalkingData[index].pets[0].id);
            expect(dw.pets[0].name).toEqual(dogWalkingData[index].pets[0].name)
            expect(dw.pets[0].age).toEqual(dogWalkingData[index].pets[0].age);
          });
        });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dog_walkings?upcoming=true'
      );

      req.flush(mockDogWalking);
    })
  })

  describe('#get', () => {
    it('returns dog walking', () => {
      const mockDogWalking = {
        id: 2,
        status: 'walking',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 60,
        price: 35,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: '2500-12-25 12:01:00',
        finished_at: null,
        pets: [{
          id: 20,
          name: 'Lilica',
          age: 2,
          dog_breed: {
            id: 200,
            name: 'Chow Chow'
          }
        }]
      }

      service.get(2)
        .subscribe(dogWalkingData => {
          expect(dogWalkingData.id).toEqual(2);
          expect(dogWalkingData.status).toEqual('walking');
          expect(dogWalkingData.latitude).toEqual(300.9999);
          expect(dogWalkingData.longitude).toEqual(500.8888);
          expect(dogWalkingData.duration).toEqual(60);
          expect(dogWalkingData.price).toEqual(35);
          expect(dogWalkingData.final_price).toEqual(null);
          // TODO: Check how expect datetime from API works
          // expect(dogWalkingData.scheduled_at).toEqual(new Date('2500-12-25 12:00'));
          // expect(dogWalkingData.started_at).toEqual(new Date('2500-12-25 12:01'));
          // expect(dogWalkingData.finished_at).toEqual(null);
          expect(dogWalkingData.pets[0].id).toEqual(20);
          expect(dogWalkingData.pets[0].name).toEqual('Lilica')
          expect(dogWalkingData.pets[0].age).toEqual(2);
          expect(dogWalkingData.pets[0].dog_breed.id).toEqual(200);
          expect(dogWalkingData.pets[0].dog_breed.name).toEqual('Chow Chow');
        })

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dog_walkings/2'
      );

      req.flush(mockDogWalking);
    })
  })

  describe('#create', () => {
    it('returns dog walking created', () => {
      const mockDogWalking = {
        id: 2,
        status: 'scheduled',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 60,
        price: 35,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: null,
        finished_at: null,
        pets: [{
          id: 20,
          name: 'Lilica',
          age: 2,
          dog_breed: {
            id: 200,
            name: 'Chow Chow'
          }
        }]
      }

      let dogBreed = new DogBreed();
      dogBreed.id = 200;

      let dog = new Dog();
      dog.id = 20;

      let dogWalking = new DogWalking();
      dogWalking.latitude = 300.9999;
      dogWalking.longitude = 500.8888;
      dogWalking.duration = 60;
      dogWalking.scheduled_at = new Date('2500-12-25 13:00:00')
      dogWalking.pets  = [ dog ];

      service.create(dogWalking)
        .subscribe(dogWalkingData => {
          expect(dogWalkingData.id).toEqual(2);
          expect(dogWalkingData.status).toEqual('scheduled');
          expect(dogWalkingData.latitude).toEqual(300.9999);
          expect(dogWalkingData.longitude).toEqual(500.8888);
          expect(dogWalkingData.duration).toEqual(60);
          expect(dogWalkingData.price).toEqual(35);
          expect(dogWalkingData.final_price).toEqual(null);
          // TODO: Check how expect datetime from API works
          // expect(dogWalkingData.scheduled_at).toEqual(new Date('2500-12-25 12:00'));
          // expect(dogWalkingData.started_at).toEqual(new Date('2500-12-25 12:01'));
          expect(dogWalkingData.finished_at).toEqual(null);
          expect(dogWalkingData.pets[0].id).toEqual(20);
          expect(dogWalkingData.pets[0].name).toEqual('Lilica')
          expect(dogWalkingData.pets[0].age).toEqual(2);
          expect(dogWalkingData.pets[0].dog_breed.id).toEqual(200);
          expect(dogWalkingData.pets[0].dog_breed.name).toEqual('Chow Chow');
        })

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dog_walkings'
      );

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        dog_walking: {
          scheduled_at: '2500-12-25 13:00:00',
          latitude: 300.9999,
          longitude: 500.8888,
          duration: 60,
          pet_ids: [ 20 ]
        }
      });

      req.flush(mockDogWalking);
    })
  })

  describe('#startWalking', () => {
    it('returns dog walking started', () => {
      const mockDogWalking = {
        id: 2,
        status: 'walking',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 60,
        price: 35,
        final_price: null,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: '2500-12-25 11:59:00',
        finished_at: null,
        pets: [{
          id: 20,
          name: 'Lilica',
          age: 2,
          dog_breed: {
            id: 200,
            name: 'Chow Chow'
          }
        }]
      }
  
      service.startWalking(2)
        .subscribe(dogWalkingData => {
          expect(dogWalkingData.id).toEqual(2);
          expect(dogWalkingData.status).toEqual('walking');
          expect(dogWalkingData.latitude).toEqual(300.9999);
          expect(dogWalkingData.longitude).toEqual(500.8888);
          expect(dogWalkingData.duration).toEqual(60);
          expect(dogWalkingData.price).toEqual(35);
          expect(dogWalkingData.final_price).toEqual(null);
          // TODO: Check how expect datetime from API works
          // expect(dogWalkingData.scheduled_at).toEqual(new Date('2500-12-25 12:00'));
          // expect(dogWalkingData.started_at).toEqual(new Date('2500-12-25 12:01'));
          expect(dogWalkingData.finished_at).toEqual(null);
          expect(dogWalkingData.pets[0].id).toEqual(20);
          expect(dogWalkingData.pets[0].name).toEqual('Lilica')
          expect(dogWalkingData.pets[0].age).toEqual(2);
          expect(dogWalkingData.pets[0].dog_breed.id).toEqual(200);
          expect(dogWalkingData.pets[0].dog_breed.name).toEqual('Chow Chow');
        })
  
      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dog_walkings/2/start_walking'
      );
  
      expect(req.request.method).toEqual('PATCH');
  
      req.flush(mockDogWalking);
    })
  })

  describe('#finishWalking', () => {
    it('returns dog walking finished', () => {
      const mockDogWalking = {
        id: 2,
        status: 'finished',
        latitude: 300.9999,
        longitude: 500.8888,
        duration: 60,
        price: 35,
        final_price: 37.50,
        scheduled_at: '2500-12-25 12:00:00',
        started_at: '2500-12-25 11:59:00',
        finished_at: '2500-12-25 13:10:00',
        pets: [{
          id: 20,
          name: 'Lilica',
          age: 2,
          dog_breed: {
            id: 200,
            name: 'Chow Chow'
          }
        }]
      }
  
      service.finishWalking(2)
        .subscribe(dogWalkingData => {
          expect(dogWalkingData.id).toEqual(2);
          expect(dogWalkingData.status).toEqual('finished');
          expect(dogWalkingData.latitude).toEqual(300.9999);
          expect(dogWalkingData.longitude).toEqual(500.8888);
          expect(dogWalkingData.duration).toEqual(60);
          expect(dogWalkingData.price).toEqual(35);
          expect(dogWalkingData.final_price).toEqual(37.5);
          // TODO: Check how expect datetime from API works
          // expect(dogWalkingData.scheduled_at).toEqual(new Date('2500-12-25 12:00:00'));
          // expect(dogWalkingData.started_at).toEqual(new Date('2500-12-25 12:01:00'));
          // expect(dogWalkingData.finished_at).toEqual(new Date('2500-12-25 13:35:00'));
          expect(dogWalkingData.pets[0].id).toEqual(20);
          expect(dogWalkingData.pets[0].name).toEqual('Lilica')
          expect(dogWalkingData.pets[0].age).toEqual(2);
          expect(dogWalkingData.pets[0].dog_breed.id).toEqual(200);
          expect(dogWalkingData.pets[0].dog_breed.name).toEqual('Chow Chow');
        })
  
      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/dog_walkings/2/finish_walking'
      );
  
      expect(req.request.method).toEqual('PATCH');
  
      req.flush(mockDogWalking);
    })
  })
});

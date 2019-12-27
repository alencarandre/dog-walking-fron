import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TablePriceService } from './table-price.service';

describe('DogWalking/TablePriceService', () => {
  let httpTestingController: HttpTestingController;
  let service: TablePriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.configureTestingModule({
      providers: [TablePriceService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TablePriceService);
  })

  describe('#list', () => {
    it('Observable should match the right data', () => {
      const mockTablePrice = [{
        id: 1,
        cadence: 30,
        price: 25.0,
        price_additional: 15.0
      }, {
        id: 2,
        cadence: 60,
        price: 35.0,
        price_additional: 20.0
      }];

      service.list()
        .subscribe(tablePricesData => {
          expect(tablePricesData[0].id).toEqual(1);
          expect(tablePricesData[0].cadence).toEqual(30);
          expect(tablePricesData[0].price).toEqual(25.0);
          expect(tablePricesData[0].price_additional).toEqual(15);

          expect(tablePricesData[1].id).toEqual(2);
          expect(tablePricesData[1].cadence).toEqual(60);
          expect(tablePricesData[1].price).toEqual(35);
          expect(tablePricesData[1].price_additional).toEqual(20);
        });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/table_prices'
      );

      req.flush(mockTablePrice);
    })
  });
});
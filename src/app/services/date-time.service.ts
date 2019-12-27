import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

const datePipe = new DatePipe('pt-BR')

@Injectable({
  providedIn: 'root'
})

export class DateTimeService {
  constructor(private datetime: Date) { }

  ansiFormat() : string {
    return datePipe.transform(this.datetime, 'yyyy-MM-dd HH:mm:ss')
  }
}